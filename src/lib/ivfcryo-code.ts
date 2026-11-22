/**
 * Code for the IVFCRYO case study's Engineering section.
 *
 * - `real` snippets are copied verbatim from the IVFCRYO repo
 *   (rails-apps/shipping). `…` marks a trim; indentation is shifted left only.
 * - `stimulus` snippets are illustrative. IVFCRYO never had a Stimulus
 *   version; they show what the same widget would take, and the page labels them so.
 */
import type { Snippet } from '~/lib/case-code';

export type { Snippet };

/** The custody timeline: one helper decides each stage's state, and RSpec pins the rules. */
export const custody: Snippet[] = [
  {
    file: 'app/helpers/shipment_helper.rb',
    lang: 'ruby',
    code: `def custody_stages(shipment, courier: {})
  …
  stages = [
    CustodyStage.new(key: :created, label: 'Created', at: shipment.created_at, time_zone: pickup_tz),
    CustodyStage.new(key: :picked_up, label: 'Picked up', at: started_at, time_zone: pickup_tz),
    CustodyStage.new(key: :in_transit, label: 'In transit', at: nil, time_zone: pickup_tz),
    CustodyStage.new(key: :delivered, label: 'Delivered', at: (shipment.tracking_ended_at if complete), time_zone: delivery_tz)
  ]
  current_assigned = removed
  stages.each do |stage|
    if done[stage.key]
      stage.state = :done
    elsif !current_assigned
      stage.state = :current
      current_assigned = true
    else
      stage.state = :upcoming
    end
    stage.at = nil unless stage.state == :done
  end
  stages
end`,
  },
  {
    file: 'spec/helpers/shipment_helper_spec.rb',
    lang: 'ruby',
    code: `it 'marks pickup as the current stage for a pending shipment' do
  stages = helper.custody_stages(shipment(status: 'Pending'))
  expect(states(stages)).to eq(%i[done current upcoming upcoming])
  expect(stages[1].at).to be_nil # planned times are never presented as actuals
end

it 'marks in transit as current for an active shipment, with the actual pickup time' do
  started = Time.zone.parse('2026-11-02 10:00')
  stages = helper.custody_stages(shipment(status: 'Active', started_at: started))
  expect(states(stages)).to eq(%i[done done current upcoming])
  expect(stages[1].at).to eq(started)
end`,
  },
  {
    file: 'app/views/shipments/show.html.erb',
    lang: 'erb',
    code: `<%= render 'shipments/shared/custody_timeline', shipment: @shipment, stages: custody_stages(@shipment, courier: courier_flags) %>`,
  },
];

/** The account menu: open, close on Escape or an outside click, return focus. */
export const menu = {
  real: [
    {
      file: 'app/views/layouts/static.html.erb',
      lang: 'erb',
      code: `<div x-data="{ open: false }" @keydown.escape.stop="open = false; $refs.trigger.focus()" @click.outside="open = false" class="relative">
  <button type="button" x-ref="trigger" @click="open = !open" :aria-expanded="open.toString()" aria-haspopup="true" aria-controls="account-menu"
    …>
    …
  </button>

  <div id="account-menu" x-show="open" x-cloak
    …>`,
    },
  ] satisfies Snippet[],
  stimulus: [
    {
      file: 'layouts/static.html.erb (Stimulus, illustrative)',
      lang: 'erb',
      code: `<div data-controller="menu" class="relative"
  data-action="keydown.esc->menu#close click@window->menu#closeOutside">
  <button type="button" data-menu-target="trigger" data-action="menu#toggle"
    aria-expanded="false" aria-haspopup="true" aria-controls="account-menu" …>
    …
  </button>

  <div id="account-menu" data-menu-target="panel" hidden …>`,
    },
    {
      file: 'controllers/menu_controller.js (Stimulus, illustrative)',
      lang: 'js',
      code: `import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["trigger", "panel"]

  toggle() {
    this.panelTarget.hidden ? this.open() : this.close()
  }

  open() {
    this.panelTarget.hidden = false
    this.triggerTarget.setAttribute("aria-expanded", "true")
  }

  close() {
    if (this.panelTarget.hidden) return
    this.panelTarget.hidden = true
    this.triggerTarget.setAttribute("aria-expanded", "false")
    this.triggerTarget.focus()
  }

  closeOutside(event) {
    if (!this.element.contains(event.target)) this.close()
  }
}`,
    },
  ] satisfies Snippet[],
};

/** The booking summary: six rows and a "what's missing" line that follow the form. */
export const summary = {
  real: [
    {
      file: 'app/views/shipments/_form.html.erb',
      lang: 'erb',
      code: `<div x-data="ShipmentForm.form(<%= config.to_json %>)" @route-change="setRoute($event.detail)">
…
<% [['Pickup', 'pickupAt', 'pickupReadout()', 'readout'],
    ['Package', 'selectedPackage', 'packageName()', 'font-medium text-right'],
    ['Service', 'selectedService', 'serviceLabel()', 'font-medium text-right'],
    …].each do |label, done, text, css| %>
  <div class="flex items-center gap-3 px-5 py-3">
    <span aria-hidden="true" class="flex-shrink-0 block w-2 h-2 rounded-full" :class="(<%= done %>) ? 'bg-action' : 'ring-1 ring-inset ring-line-strong'"></span>
    <dt class="flex-1 text-sm text-ink-muted"><%= label %></dt>
    <dd class="text-sm min-w-0 truncate <%= css %>" :class="(<%= done %>) ? 'text-ink' : 'text-ink-faint'" x-text="<%= text %>"></dd>
  </div>
<% end %>
…
<p x-show="missingText()" x-text="missingText()" class="mt-3 text-xs text-center text-ink-faint" aria-live="polite"></p>`,
    },
    {
      file: 'app/javascript/src/shipment_form.js',
      lang: 'js',
      code: `missingText () {
  const needs = []
  if (!this.selectedPackage) needs.push('a package')
  if (!this.selectedService) needs.push('a service')
  const choose = needs.length ? 'choose ' + needs.join(' and ') : ''
  const agree = this.terms ? '' : 'agree to the terms'
  const parts = [choose, agree].filter(Boolean)
  return parts.length ? 'To submit, ' + parts.join(', then ') + '.' : ''
},`,
    },
  ] satisfies Snippet[],
  stimulus: [
    {
      file: 'shipments/_form.html.erb (Stimulus, illustrative)',
      lang: 'erb',
      code: `<div data-controller="booking-summary"
  data-action="change->booking-summary#update input->booking-summary#update">
…
<% [['Pickup', '#shipment_pickup_at'],
    ['Package', '#shipment_package_definition_id'],
    ['Service', '#shipment_service'],
    …].each do |label, field| %>
  <div class="flex items-center gap-3 px-5 py-3"
    data-booking-summary-target="row" data-field="<%= field %>">
    <span aria-hidden="true" data-dot class="flex-shrink-0 block w-2 h-2 rounded-full ring-1 ring-inset ring-line-strong"></span>
    <dt class="flex-1 text-sm text-ink-muted"><%= label %></dt>
    <dd class="text-sm min-w-0 truncate text-ink-faint">Not chosen</dd>
  </div>
<% end %>
…
<p data-booking-summary-target="missing" class="mt-3 text-xs text-center text-ink-faint" aria-live="polite"></p>`,
    },
    {
      file: 'controllers/booking_summary_controller.js (Stimulus, illustrative)',
      lang: 'js',
      code: `import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["row", "missing"]

  connect() { this.update() }

  update() {
    this.rowTargets.forEach((row) => {
      const field = this.element.querySelector(row.dataset.field)
      const done = Boolean(field && field.value)
      const dot = row.querySelector("[data-dot]")
      const value = row.querySelector("dd")
      dot.classList.toggle("bg-action", done)
      dot.classList.toggle("ring-1", !done)
      value.classList.toggle("text-ink", done)
      value.classList.toggle("text-ink-faint", !done)
      value.textContent = done ? this.label(field) : "Not chosen"
    })
    this.missingTarget.textContent = this.missingText()
    this.missingTarget.hidden = this.missingTarget.textContent === ""
  }

  …
}`,
    },
  ] satisfies Snippet[],
};
