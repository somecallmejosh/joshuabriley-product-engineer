/** The beckit decision record, taken from Josh's write-up in notes/portfolio-writeup.md. */
export const vmsparkSummary = {
  problem: `Staffing operators spend their day in VMSpark fixing feeds that won't map. A heuristic audit scored the app 3.5 out of 10: failure reasons hid in hover popovers, 33 of 43 delete buttons ran without a confirmation, and nothing told an operator what to do next.`,
  decision: `I chose <strong class="text-ink font-semibold">a design system built from scratch</strong> over theming Bootstrap again, so every page could say its one job, show its state in words, and work the same in light, dark, and on a phone.`,
  evidence: `A re-score with the same rubric went from 3.5 to 7.5. Every delete now confirms, operators get one inbox for unmapped values, and lint and contrast checks keep all 318 views and 178 color pairings on the system.`,
};

/** The same decision record is shown in the case study and style guide. */
export const ivfcryoSummary = {
  problem: `Interviews with the owner, COO, and office manager showed that the hardest part was getting the patient, two clinics, a courier, and IVFCRYO confirmed and ready before a shipment could start.`,
  decision: `I chose <strong class="text-ink font-semibold">one shared record</strong> over two separate apps, so patients and staff always see the same status.`,
  evidence: `Support calls dropped 75% and shipping errors 55% once patients could see that both clinics had signed off.`,
};

/** The Logatot decision record, from notes/interview-notes/tldr.md. */
export const logatotSummary = {
  problem: `Three providers, interviewed separately, described the same problem. The job leaves no time for paperwork, so they filled it in from memory at night. Inspectors and auditors care most about those records.`,
  decision: `I chose <strong class="text-ink font-semibold">matching speech against a known list</strong>, with AI used only ahead of time, because compliance records can't contain guessed entries.`,
  evidence: `Attendance, meal, and safety records now come from entries logged during the day, so reviewing them takes minutes instead of an evening.`,
};
