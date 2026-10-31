/** The beckit decision record, taken from Josh's write-up in notes/portfolio-writeup.md. */
export const beckitSummary = {
  problem: `Paper thought records work, but they're easy to put off. The worksheet asks for a lot at once, and a stressful moment is the worst time to face a form. My first version of beckit had the same problem: a walkthrough with sixty test entries found that the new-entry form was nearly five phone screens tall, and the Save button sat 3,523 px down the page.`,
  alternativeA: {
    name: 'One long form',
    body: `One page, one Save button. Simple to build, and fine for editing, but it front-loaded the title, date, place and person before anyone had written what they were feeling.`,
  },
  alternativeB: {
    name: 'Small steps that save as you go',
    body: `Five pages: what's on your mind, what happened, name the pattern, weigh it up, move forward. Each saves on its own, so an unfinished entry is still a saved entry.`,
  },
  decision: `I chose to break the entry into <strong class="text-ink font-semibold">small steps that each need only one answer</strong> and save as you go, instead of one long form that saves at the end. Someone can write a single sentence, close the app, and pick up where they left off later.`,
  implementation: `Each step lists the answer it needs before it saves. The same list decides which steps you can open, which step a "Continue this entry" link goes to, and when an entry counts as finished.`,
  evidence: `Starting an entry now takes one required field. Every later step remembers where you stopped, and finishing an entry ends with the thing that keeps people going: the feeling rated before and after, side by side.`,
  reflection: `Everything I know about how people use beckit comes from my own walkthroughs and code review, not from watching anyone else use it. Five moderated sessions would be the first thing I'd run.`,
};

/** The same decision record is shown in the case study and style guide. */
export const ivfcryoSummary = {
  problem: `Interviews with the owner, the COO, and the office manager showed the hard part wasn't the drive. It was getting five people, the patient, two clinics, a courier, and IVFCRYO, all confirmed and ready before a shipment could start.`,
  alternativeA: {
    name: 'Two separate apps',
    body: `One app for patients, one for staff. Simpler to build, but each would keep its own copy of a shipment's status, and the two could disagree.`,
  },
  alternativeB: {
    name: 'One shared record, two views',
    body: `Patients and staff look at the same shipment record, plus a plain tracking page for anyone else involved.`,
  },
  decision: `I chose <strong class="text-ink font-semibold">one shared record</strong> instead of two separate apps, so a shipment could never show one status to the patient and a different one to staff.`,
  implementation: `The shipment moves through clear stages, from draft to delivered, and can't be scheduled until everyone involved has confirmed they're ready. Alerts are sorted by how serious they are, so a small temperature change doesn't trigger the same alarm as a real problem.`,
  evidence: `Support calls dropped 75%, and shipping errors dropped 55%, once patients could see for themselves that both clinics had signed off.`,
  reflection: `A blind customer testing with a screen reader found two issues I'd fix first: status updates read aloud too fast, and when a shipment uses two couriers, the screen reader can't tell them apart.`,
};
