/**
 * Code for the Logatot case study's "htmx and Alpine instead of Hotwire"
 * section.
 *
 * - `real` snippets are copied verbatim from the Logatot repo
 *   (rails-apps/log_a_tot). `…` marks a trim; indentation is shifted left only.
 * - `hotwire` snippets are illustrative. Logatot never had a Hotwire version;
 *   they show what the same feature would take, and the page labels them so.
 */

import type { Snippet } from '~/lib/case-code';

export type { Snippet };

/** A Voiceboard panel that loads on page load and reloads on a Pusher event. */
export const panel: Snippet[] = [
  {
    file: 'app/views/voiceboard/index.html.erb',
    lang: 'erb',
    code: `<div id="shift_log_sections"
  hx-get="/voiceboard/shift_logs?date=<%= @date %>"
  hx-trigger="load, reloadShiftLogEvents from:body"></div>`,
  },
  {
    file: 'app/controllers/voiceboard_controller.rb',
    lang: 'ruby',
    code: `def shift_logs
  date = parsed_date(params[:date])
  …
  shift_logs = ShiftLog.where(
    account_id: current_account.id,
    started_at: date.beginning_of_day..date.end_of_day
  ).order('ended_at NULLS FIRST, started_at DESC')
  …
  return unless htmx_request?

  render partial: 'voiceboard/partials/employees/shift_logs',
         locals: { shift_logs:, date:, total_duration_in_minutes: 0 }, layout: false
end`,
  },
  {
    file: 'app/javascript/application.js',
    lang: 'js',
    code: `appChannel.bind("shiftloggy", (data) => {
  …
  document.body.dispatchEvent(new Event('reloadShiftLogEvents'));
});`,
  },
];

/** Saving a shift from a modal: close it, show a snackbar, refresh the panel. */
export const modal = {
  real: [
    {
      file: 'app/controllers/shift_logs_controller.rb',
      lang: 'ruby',
      code: `if @shift_log.save
  redirect_to shift_logs_path, notice: t('ux_pages.shift_logs.flash.created') and return unless htmx_request?

  close_modal_and_refresh(t('ux_pages.shift_logs.flash.created'))
  render partial: 'shared/blank', layout: false and return
else
  …
end

…

def close_modal_and_refresh(message = nil)
  data = { closeModalEvent: '', reloadShiftLogEvents: '' }
  data[:flashMessage] = message if message.present?
  response.set_header('HX-Trigger', data.to_json)
end`,
    },
    {
      file: 'app/views/layouts/partials/admin/_footer.html.erb',
      lang: 'js',
      code: `// These event listeners are fired on an HTMX response (HX-TRIGGER header).
document.body.addEventListener("closeModalEvent", function(evt){
  closeModal();
})`,
    },
  ] satisfies Snippet[],
  hotwire: [
    {
      file: 'shift_logs_controller.rb (Hotwire, illustrative)',
      lang: 'ruby',
      code: `if @shift_log.save
  # The save has to load the Voiceboard panel's data to re-render it.
  @date = @shift_log.started_at.to_date
  @shift_logs = ShiftLog.where(account_id: current_account.id,
                               started_at: @date.all_day)
                        .order('ended_at NULLS FIRST, started_at DESC')
  respond_to do |format|
    format.turbo_stream
    format.html { redirect_to shift_logs_path, notice: t('ux_pages.shift_logs.flash.created') }
  end
else
  …
end`,
    },
    {
      file: 'shift_logs/create.turbo_stream.erb (Hotwire, illustrative)',
      lang: 'erb',
      code: `<%= turbo_stream.update "modal-content", "" %>
<%= turbo_stream.update "shift_log_sections",
      partial: "voiceboard/partials/employees/shift_logs",
      locals: { shift_logs: @shift_logs, date: @date, total_duration_in_minutes: 0 } %>
<%= turbo_stream.append "snackbar", partial: "shared/snackbar",
      locals: { message: t("ux_pages.shift_logs.flash.created") } %>`,
    },
  ] satisfies Snippet[],
};

/** Expense filters that update as you type and keep the URL shareable. */
export const filters = {
  real: [
    {
      file: 'app/views/expenses/index.html.erb',
      lang: 'erb',
      code: `<form action="<%= expenses_path %>" method="get" role="search" id="expense-filters"
  hx-get="<%= expenses_path %>" hx-trigger="input delay:300ms, change, submit" hx-target="#expense-results" hx-push-url="true"
  hx-indicator="#expense-filters-busy">
  …
</form>

<div id="expense-results" aria-live="polite">
  <%= render 'expenses/results' %>
</div>`,
    },
    {
      file: 'app/controllers/expenses_controller.rb',
      lang: 'ruby',
      code: `format.html do
  @list_total_cents = @expenses.sum(:total_amount_cents)
  @pagy, @expenses = pagy(@expenses, items: PER_PAGE)
  render partial: 'expenses/results', layout: false if htmx_request?
end`,
    },
  ] satisfies Snippet[],
  hotwire: [
    {
      file: 'expenses/index.html.erb (Hotwire, illustrative)',
      lang: 'erb',
      code: `<%= form_with url: expenses_path, method: :get, id: "expense-filters",
      data: { turbo_frame: "expense-results", turbo_action: "advance",
              controller: "debounced-submit",
              action: "input->debounced-submit#submit change->debounced-submit#submit" } do |form| %>
  …
<% end %>

<%= turbo_frame_tag "expense-results" do %>
  <%= render "expenses/results" %>
<% end %>`,
    },
    {
      file: 'controllers/debounced_submit_controller.js (Hotwire, illustrative)',
      lang: 'js',
      code: `import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  submit() {
    clearTimeout(this.timeout)
    this.timeout = setTimeout(() => this.element.requestSubmit(), 300)
  }
}`,
    },
  ] satisfies Snippet[],
};

/** Select rows, then delete them with a confirm that counts the selection. */
export const bulk = {
  real: [
    {
      file: 'app/views/shared/_bulk_select.html.erb',
      lang: 'erb',
      code: `<div id="<%= bulk_id %>" class="space-y-3"
  x-data="{
    selected: [],
    all: <%= ids.map(&:to_s).to_json %>,
    one: <%= confirm[:one].to_json %>,
    other: <%= confirm[:other].to_json %>,
    …
    get allSelected() { return this.all.length > 0 && this.selected.length === this.all.length },
    countText(single, many) { return this.selected.length === 1 ? single : many.replace('%{count}', this.selected.length) },
  }">
  …
  <input type="checkbox" class="<%= form_checkbox %> rounded"
    :checked="allSelected" :indeterminate="selected.length > 0 && !allSelected"
    @change="selected = $event.target.checked ? [...all] : []">
  …
  <button type="button" class="<%= button_danger_small %>"
    hx-delete="<%= delete_url %>" hx-include="<%= include_rows %>" hx-swap="none"
    :hx-confirm="countText(one, other)" data-confirm-button="<%= delete_label %>">`,
    },
    {
      file: 'app/views/expenses/_table_row.html.erb',
      lang: 'erb',
      code: `<input type="checkbox" name="ids[]" value="<%= expense.id %>" x-model="selected"
  …>`,
    },
  ] satisfies Snippet[],
  hotwire: [
    {
      file: 'shared/_bulk_select.html.erb (Stimulus, illustrative)',
      lang: 'erb',
      code: `<div id="<%= bulk_id %>" class="space-y-3"
  data-controller="bulk-select"
  data-bulk-select-one-value="<%= confirm[:one] %>"
  data-bulk-select-other-value="<%= confirm[:other] %>">
  …
  <input type="checkbox" class="<%= form_checkbox %> rounded"
    data-bulk-select-target="all" data-action="change->bulk-select#toggleAll">
  …
  <button type="button" class="<%= button_danger_small %>"
    data-bulk-select-target="delete" …>

<%# expenses/_table_row.html.erb %>
<input type="checkbox" name="ids[]" value="<%= expense.id %>"
  data-bulk-select-target="row" data-action="change->bulk-select#update" …>`,
    },
    {
      file: 'controllers/bulk_select_controller.js (Stimulus, illustrative)',
      lang: 'js',
      code: `import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["all", "row", "delete"]
  static values = { one: String, other: String }

  toggleAll() {
    this.rowTargets.forEach((row) => { row.checked = this.allTarget.checked })
    this.update()
  }

  update() {
    const count = this.rowTargets.filter((row) => row.checked).length
    this.allTarget.checked = count > 0 && count === this.rowTargets.length
    this.allTarget.indeterminate = count > 0 && count < this.rowTargets.length
    this.deleteTarget.dataset.turboConfirm =
      count === 1 ? this.oneValue : this.otherValue.replace("%{count}", count)
  }
}`,
    },
  ] satisfies Snippet[],
};

/** Alpine owns which attendance pill is open; htmx loads that pill's roster. */
export const pills: Snippet[] = [
  {
    file: 'app/views/voiceboard/index.html.erb',
    lang: 'erb',
    code: `<section
  …
  x-data="{
    showAbsent: false,
    showExpected: false,
    showPresent: false,
    showCheckedOut: false,
    showOnly(name, url, target) {
      const next = !this[name];
      this.showAbsent = this.showExpected = this.showPresent = this.showCheckedOut = false;
      this[name] = next;
      if (next) htmx.ajax('GET', url, { target, swap: 'innerHTML' });
    },
    toggleAbsent() { this.showOnly('showAbsent', '/children/absent?date=<%= @date %>', '#watch-item-absent-detail') },
    …
  }">`,
  },
  {
    file: 'app/controllers/children_controller.rb',
    lang: 'ruby',
    code: `# present/absent/checked_out/expected are htmx fragments for the Voiceboard's attendance pills.
before_action :watch_list_fragment_only, only: %i[present absent checked_out expected]

def absent
  currently_absent_ids = Child.currently_absent_ids(current_account, get_datetime)
  @children = Child.where(id: currently_absent_ids)

  render partial: 'voiceboard/partials/watch_item_list', locals: { children: @children, title: 'Absent' },
         layout: false
end

…

def watch_list_fragment_only
  redirect_to voiceboard_path(date: params[:date].presence) unless htmx_request?
end`,
  },
];
