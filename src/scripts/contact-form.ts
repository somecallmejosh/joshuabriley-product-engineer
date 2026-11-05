interface HubspotFieldError {
  errorType?: string;
  message?: string;
}

interface HubspotContext {
  pageUri: string;
  pageName: string;
  hutk?: string;
}

const fieldLabels: Record<string, string> = {
  firstname: 'first name',
  lastname: 'last name',
  email: 'email',
  phone_number: 'phone number',
  i_am_interested_in: 'service selection',
  description: 'message',
};

const form = document.getElementById('contact-form') as HTMLFormElement | null;

if (form) {
  const portalId = form.dataset.portalId!;
  const formGuid = form.dataset.formGuid!;
  const fallbackEmail = form.dataset.fallbackEmail!;
  const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;

  const successAlert = document.getElementById('form-alert-success')!;
  const errorAlert = document.getElementById('form-alert-error')!;
  const errorReason = document.getElementById('form-alert-error-reason')!;
  const submitBtn = form.querySelector<HTMLButtonElement>('button[type="submit"]')!;

  const hideAlerts = () => {
    successAlert.hidden = true;
    errorAlert.hidden = true;
  };

  const showSuccess = () => {
    successAlert.hidden = false;
    successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    successAlert.focus({ preventScroll: true });
  };

  const showError = (reason: string) => {
    errorReason.textContent = reason;
    errorAlert.hidden = false;
    errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
    errorAlert.focus();
  };

  const setLoading = (loading: boolean) => {
    submitBtn.disabled = loading;
    submitBtn.setAttribute('aria-busy', loading ? 'true' : 'false');
  };

  const getHubspotCookie = (): string | undefined => {
    const m = document.cookie.match(/(?:^|;\s*)hubspotutk=([^;]+)/);
    return m ? m[1] : undefined;
  };

  const getValue = (name: string): string => {
    const f = form.elements.namedItem(name);
    if (!f) return '';
    if (f instanceof HTMLInputElement || f instanceof HTMLTextAreaElement || f instanceof HTMLSelectElement) {
      return f.value.trim();
    }
    return '';
  };

  const humanize = (err: HubspotFieldError): string | null => {
    const raw = (err.message ?? '').toString();
    const fieldMatch = raw.match(/fields\.([a-zA-Z_]+)/);
    const fieldName = fieldMatch ? fieldLabels[fieldMatch[1]] ?? fieldMatch[1] : null;
    switch (err.errorType) {
      case 'INVALID_EMAIL': return 'That email address doesn’t look right.';
      case 'BLOCKED_EMAIL': return 'That email address can’t be accepted.';
      case 'REQUIRED_FIELD': return fieldName ? `Please fill in your ${fieldName}.` : 'A required field is missing.';
      case 'INVALID_NUMBER': return 'The phone number looks invalid.';
      case 'INPUT_TOO_LARGE': return fieldName ? `Your ${fieldName} is too long.` : 'A field is too long.';
      case 'TOO_MANY_ERRORS': return 'Several fields need attention.';
      default: return raw || null;
    }
  };

  const parseError = async (resp: Response): Promise<string> => {
    try {
      const data = await resp.json();
      if (Array.isArray(data?.errors) && data.errors.length) {
        const messages = data.errors.map(humanize).filter(Boolean);
        if (messages.length) return messages.join(' ');
      }
      if (data?.message) return data.message;
    } catch { /* fall through */ }
    if (resp.status === 429) return 'Too many submissions in a short time. Please wait a moment.';
    if (resp.status >= 500) return `The form service is temporarily unavailable (error ${resp.status}).`;
    return `The submission failed (error ${resp.status}).`;
  };

  const networkErrorMessage = `Check your connection or email ${fallbackEmail} directly.`;

  // Inline field errors: the same pattern the style guide documents. Each
  // Field pre-renders a hidden error line; this fills and reveals it.
  type Control = HTMLInputElement | HTMLTextAreaElement;
  const controls = Array.from(form.querySelectorAll<Control>('input, textarea'));

  const messageFor = (control: Control): string => {
    const v = control.validity;
    if (v.valid && (!control.required || control.value.trim())) return '';
    switch (control.name) {
      case 'first-name': return 'Enter your first name.';
      case 'last-name': return 'Enter your last name.';
      case 'email':
        return control.value.trim() ? 'Enter a complete email address, like you@example.com.' : 'Enter your email address.';
      case 'message': return 'Add a short message.';
      default: return 'Check this field.';
    }
  };

  const showFieldError = (control: Control, message: string) => {
    const line = document.getElementById(`${control.id}-error`);
    const text = line?.querySelector('[data-field-error-text]');
    if (text) text.textContent = message;
    if (line) line.hidden = !message;
    if (message) control.setAttribute('aria-invalid', 'true');
    else control.removeAttribute('aria-invalid');
  };

  /** Mark every invalid field and return the first, or null when all pass. */
  const validateAll = (): Control | null => {
    let first: Control | null = null;
    for (const control of controls) {
      const message = messageFor(control);
      showFieldError(control, message);
      if (message && !first) first = control;
    }
    return first;
  };

  // Once a field is flagged, re-check it as the visitor fixes it.
  for (const control of controls) {
    control.addEventListener('input', () => {
      if (control.getAttribute('aria-invalid') === 'true') showFieldError(control, messageFor(control));
    });
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    hideAlerts();

    const firstInvalid = validateAll();
    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const context: HubspotContext = {
      pageUri: window.location.href,
      pageName: document.title || 'Contact',
    };
    const hutk = getHubspotCookie();
    if (hutk) context.hutk = hutk;

    const payload = {
      fields: [
        { name: 'firstname', value: getValue('first-name') },
        { name: 'lastname', value: getValue('last-name') },
        { name: 'email', value: getValue('email') },
        { name: 'phone_number', value: getValue('phone') },
        { name: 'i_am_interested_in', value: getValue('service') },
        { name: 'description', value: getValue('message') },
      ],
      context,
    };

    setLoading(true);
    try {
      const resp = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!resp.ok) {
        const reason = await parseError(resp);
        showError(`${reason} If it keeps happening, email ${fallbackEmail} directly.`);
        return;
      }
      form.reset();
      showSuccess();
    } catch {
      showError(networkErrorMessage);
    } finally {
      setLoading(false);
    }
  });
}
