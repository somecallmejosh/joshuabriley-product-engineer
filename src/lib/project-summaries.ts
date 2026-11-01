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

/** The Token Adventure decision record, taken from Josh's write-up in notes/token-galaga.md. */
export const tokenAdventureSummary = {
  problem: `Design tokens are now a normal part of any serious design system, but the W3C spec that defines them is hard to learn from. It's precise because it has to be: <code>$value</code>, <code>$type</code>, group inheritance, alias references, composite types and exact value shapes. That makes it a good reference and a poor teacher. You finish reading it with the vocabulary, but you still can't tell whether your own file is correct.`,
  alternativeA: {
    name: 'A written tutorial',
    body: `Pages of explanation with code samples. Easy to build and easy to skim, which is the problem: you can read every page without ever writing a token that has to work.`,
  },
  alternativeB: {
    name: 'Quizzes',
    body: `Multiple-choice questions after each section. They check whether you recognize the right answer, not whether you can produce one. A quiz can't tell you that your alias points at a misspelled path.`,
  },
  alternativeC: {
    name: 'Code that runs and gets graded',
    body: `Each sector gives you an editor, a live preview and a list of checks. You pass by making the checks go green. This was the hardest to build, and the only option where the lesson is the act of writing valid tokens.`,
  },
  decision: `I chose to make every rule in the spec <strong class="text-ink font-semibold">something you have to apply before you can move on</strong>, instead of something you read about. Each sector is a small coding exercise. You write a real <code>tokens.json</code> (plus CSS or HTML where the lesson needs it), and the sector only clears when your code actually meets the spec.`,
  implementation: `Every check is a plain data object, so it can be sent into the sandboxed preview, run against your live page and parsed tokens, and sent back as a result. The same checks define what each sector teaches and when it's cleared.`,
  evidence: `Nothing is multiple choice. The preview is your code running, and a passing check means your tokens are valid, not that you picked the right answer. The final sector hands you a broken token file and asks you to find and fix every fault, which is the closest the game gets to the real job.`,
  reflection: `Everything I know about how people play comes from my own playthroughs, not from watching anyone else. Five moderated sessions with designers who have never written a token file would be the first thing I'd run.`,
};

/** The Rudiment UI decision record, taken from Josh's write-up in notes/rudiment-ui.md. */
export const rudimentSummary = {
  problem: `A component library can look finished in Storybook and still fall apart on a real screen. Each component has its own story, every story passes its accessibility checks, and none of that tells you whether a developer can build a dashboard without reaching for inline styles. You only find those gaps by building real pages, and by then the API is usually already in use.`,
  alternativeA: {
    name: 'Component stories only',
    body: `One story per component, with controls for each prop. This is how most libraries are documented and it's still the reference, but a story only shows a component working by itself. It can't show that a heading needs <code>style={{ margin: 0 }}</code> every time it sits in a card header.`,
  },
  alternativeB: {
    name: 'Small page compositions',
    body: `Earlier versions had ten short compositions: a sign-in form, a settings page, a marketing hero. They were better than isolated stories, but they were small enough to avoid the hard parts, like tables, app navigation and dense dashboards. I removed them in 0.3.0.`,
  },
  alternativeC: {
    name: 'Four full example apps, audited',
    body: `Twenty-six pages across biotech, CRM, ecommerce and project management, each with its own <code>shared.tsx</code> of data and helpers. This took the most work, and it was the only option that produced evidence about the API instead of opinions about it.`,
  },
  decision: `I chose to <strong class="text-ink font-semibold">build four complete example apps in different domains and treat every workaround as a bug report against the library</strong>, instead of judging the library by its component stories. Each app has its own data, layout and brand, so a gap that shows up in all four is a problem with the library, not with one design.`,
  implementation: `The audit looked for the same things in every app: raw HTML where a component should exist, inline styles, class overrides, hardcoded colors, custom helpers in <code>shared.tsx</code>, and imports from the libraries Rudiment wraps. Each gap was ranked by how many of the four apps hit it, and the results went into <code>DEPARTURES.md</code>, which now works as the backlog.`,
  evidence: `The audit found that the examples had about 476 inline <code>style</code> attributes and no <code>className</code> overrides at all, that the typography components were the biggest single cause, and that every app had rebuilt its own header, footer and page shell. Version 0.3.0 closed four of the six steps in the fix list: typography props, app chrome, the leaky third-party imports, and nine new components.`,
  reflection: `I wrote the library and the examples, so the audit only finds the gaps I run into. No outside team has built with Rudiment yet. The most-needed component, a data table, is still missing.`,
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
