/** The beckit decision record, taken from Josh's write-up in notes/portfolio-writeup.md. */
export const beckitSummary = {
  problem: `Paper thought records work, but a stressful moment is the worst time to face a long form. My first version had the same problem: the new-entry form was nearly five phone screens tall, with Save 3,523 px down the page.`,
  decision: `I split the entry into <strong class="text-ink font-semibold">small steps that each need one answer</strong> and save as you go, so someone can write one sentence and finish later.`,
  evidence: `Starting an entry takes one required field, unfinished entries resume where you stopped, and every entry ends with the feeling rated before and after.`,
};

/** The Clempo decision record, taken from the Clempo repo's tasks/heuristics-audit.md and tasks/todo.md, and notes/clempo.astro. */
export const clempoSummary = {
  problem: `Clempo has to feel trustworthy to people who range from very technical to barely online. A heuristic audit of every screen scored it 4.9 out of 10: “envelope” on one page and “category” on the next, deletes with no way back, and two places where one household could reach another’s data.`,
  decision: `I rebuilt the core task first: <strong class="text-ink font-semibold">logging a purchase in three taps</strong> from a sheet that opens in place, instead of a card button that loaded a form from the server. Then I fixed the rest of the audit through shared components rather than page by page.`,
  evidence: `Logging is now category, amount, Save, with an Undo. Both data leaks are closed with tests, and a re-score of every page with the same rubric went from 4.9 to 8.8 out of 10.`,
};

/** The Token Adventure decision record, taken from Josh's write-up in notes/token-galaga.md. */
export const tokenAdventureSummary = {
  problem: `The W3C Design Tokens spec is a precise reference but a poor teacher. You finish it knowing the vocabulary and still can't tell whether your own token file is correct.`,
  decision: `I made every rule <strong class="text-ink font-semibold">something you apply before you can move on</strong>: each sector clears only when your own <code>tokens.json</code> meets the spec.`,
  evidence: `Nothing is multiple choice. A passing check means your tokens are valid, and the final sector asks you to fix every fault in a broken token file.`,
};

/** The Rudiment UI decision record, taken from Josh's write-up in notes/rudiment-ui.md. */
export const rudimentSummary = {
  problem: `A component library can pass every story and accessibility check and still fall apart on a real screen. You only find those gaps by building real pages, usually after the API is already in use.`,
  decision: `I chose to <strong class="text-ink font-semibold">build four example apps in different domains and treat every workaround as a bug report against the library</strong>. A gap that shows up in all four belongs to the library, not to one design.`,
  evidence: `The audit found about 476 inline <code>style</code> attributes, mostly from typography, and a page shell rebuilt in every app. Version 0.3.0 shipped four of the six fixes: typography props, app chrome, leak-free third-party imports and nine new components.`,
};

// Copy from notes/vm-spark.md (Josh's write-up).
export const vmsparkSummary = {
  problem: `Staffing operators spend their day in VMSpark fixing feeds that won't map. A heuristic audit scored the app 3.5 out of 10: failure reasons hid in hover popovers, 33 of 43 delete buttons ran without a confirmation, and nothing told an operator what to do next.`,
  decision: `I chose <strong class="text-ink font-semibold">a design system built from scratch</strong> over theming Bootstrap again, so every page could say its one job, show its state in words, and work the same in light, dark, and on a phone.`,
  evidence: `A re-score with the same rubric went from 3.5 to 7.5. Every delete now confirms, operators get one inbox for unmapped values, and lint and contrast checks keep all 318 views and 178 color pairings on the system.`,
};

/** The same decision record is shown in the case study and style guide. */
export const ivfcryoSummary = {
  problem: `Interviews with the owner, COO, and office manager showed the hard part wasn't the drive. It was getting the patient, two clinics, a courier, and IVFCRYO confirmed and ready before a shipment could start.`,
  decision: `I chose <strong class="text-ink font-semibold">one shared record</strong> over two separate apps, so patients and staff always see the same status.`,
  evidence: `Support calls dropped 75% and shipping errors 55% once patients could see that both clinics had signed off.`,
};

/** The Logatot decision record, from notes/interview-notes/tldr.md. */
export const logatotSummary = {
  problem: `Three providers, interviewed separately, described the same problem: the job leaves no time for paperwork, so they filled it in from memory at night, and those were the records inspectors and auditors cared about most.`,
  decision: `I chose <strong class="text-ink font-semibold">matching speech against a known list</strong>, with AI used only ahead of time, because a compliance record can't afford a confident guess.`,
  evidence: `Attendance, meal, and safety records now come from entries logged during the day, so reviewing them takes minutes instead of an evening.`,
};
