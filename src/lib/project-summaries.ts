/** The beckit decision record, taken from Josh's write-up in notes/portfolio-writeup.md. */
export const beckitSummary = {
  problem: `Paper thought records work, but a stressful moment is the worst time to face a long form. My first version had the same problem: the new-entry form was nearly five phone screens tall, with Save 3,523 px down the page.`,
  decision: `I split the entry into <strong class="text-ink font-semibold">small steps that each need one answer</strong> and save as you go, so someone can write one sentence and finish later.`,
  evidence: `Starting an entry takes one required field, unfinished entries resume where you stopped, and every entry ends with the feeling rated before and after.`,
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
  problem: `The admin app had grown one feature at a time: Bootstrap 4 and 5 mixed together, five icon sets, and a dashboard chart that never loaded. Operators had learned their way around it, so the redesign had to protect their habits.`,
  decision: `I chose <strong class="text-ink font-semibold">a Jira-style layout</strong> over Linear- and Notion-style options, because operators already know it.`,
  evidence: `Nothing operators relied on moved, and the team now maintains one page header, modal pattern, and table toolkit instead of several.`,
};

/** The same decision record is shown in the case study and style guide. */
export const ivfcryoSummary = {
  problem: `Interviews with the owner, COO, and office manager showed the hard part wasn't the drive. It was getting the patient, two clinics, a courier, and IVFCRYO confirmed and ready before a shipment could start.`,
  decision: `I chose <strong class="text-ink font-semibold">one shared record</strong> over two separate apps, so patients and staff always see the same status.`,
  evidence: `Support calls dropped 75% and shipping errors 55% once patients could see that both clinics had signed off.`,
};
