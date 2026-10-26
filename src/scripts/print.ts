/** Expand paper-only content without changing the reader's screen state. */
if (document.body.dataset.printLayout === 'site') {
  const printMedia = window.matchMedia('print');
  let active = false;
  let closedDetails: HTMLDetailsElement[] = [];
  let imageLoading: { image: HTMLImageElement; loading: string | null }[] = [];
  const sourceLine = document.querySelector<HTMLElement>('[data-print-source]');
  const originalSource = sourceLine?.textContent ?? '';

  function preparePrint() {
    if (active) return;
    active = true;
    document.body.dataset.printing = 'true';
    document.querySelectorAll<HTMLElement>('[data-print-value]').forEach(element => {
      element.textContent = element.dataset.printValue ?? '';
    });
    closedDetails = [...document.querySelectorAll<HTMLDetailsElement>('#main details:not([open]):not(.sg-markup)')];
    closedDetails.forEach(details => { details.open = true; });
    imageLoading = [...document.querySelectorAll<HTMLImageElement>('#main img[loading="lazy"]')].map(image => ({ image, loading: image.getAttribute('loading') }));
    imageLoading.forEach(({ image }) => { image.loading = 'eager'; });

    const destinations = new Map<string, number>();
    const notes = document.querySelector<HTMLElement>('[data-print-references]');
    const list = document.createElement('ol');
    const canonical = new URL(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href ?? location.href);
    if (sourceLine && location.pathname.startsWith('/tools/') && location.search) {
      sourceLine.textContent = `Source: ${new URL(location.pathname + location.search, canonical.origin).href}`;
    }
    document.querySelectorAll<HTMLAnchorElement>('#main a[href]').forEach(link => {
      // References belong to content, not navigation, hidden examples or share actions.
      if (link.closest('nav, .hero-actions, .project-actions, .article-share, .tool-share, .article-pager, .project-next, .related-tools, .sg-markup')) return;
      // The résumé's two short course-provider URLs are printed inline instead.
      if (link.closest('.resume-page .education-courses')) return;
      if (!link.getClientRects().length) return;
      const url = new URL(link.getAttribute('href')!, canonical);
      if (!['http:', 'https:'].includes(url.protocol) || url.origin === canonical.origin) return;
      let number = destinations.get(url.href);
      if (!number) {
        number = destinations.size + 1;
        destinations.set(url.href, number);
        const item = document.createElement('li');
        const source = document.createElement('a');
        source.href = url.href;
        source.textContent = url.href;
        item.append(source);
        list.append(item);
      }
      const marker = document.createElement('sup');
      marker.className = 'print-only print-link-marker';
      marker.textContent = `[${number}]`;
      marker.setAttribute('aria-hidden', 'true');
      link.append(marker);
    });
    if (notes && destinations.size) {
      const heading = document.createElement('h2');
      heading.textContent = 'Link references';
      notes.replaceChildren(heading, list);
    }
  }

  function restoreScreen() {
    if (!active) return;
    closedDetails.forEach(details => { details.open = false; });
    imageLoading.forEach(({ image, loading }) => {
      if (loading === null) image.removeAttribute('loading');
      else image.setAttribute('loading', loading);
    });
    document.querySelectorAll('.print-link-marker').forEach(marker => marker.remove());
    document.querySelector('[data-print-references]')?.replaceChildren();
    if (sourceLine) sourceLine.textContent = originalSource;
    delete document.body.dataset.printing;
    closedDetails = [];
    imageLoading = [];
    active = false;
  }

  window.addEventListener('beforeprint', preparePrint);
  window.addEventListener('afterprint', restoreScreen);
  printMedia.addEventListener('change', event => event.matches ? preparePrint() : restoreScreen());
  if (printMedia.matches) preparePrint();
}
