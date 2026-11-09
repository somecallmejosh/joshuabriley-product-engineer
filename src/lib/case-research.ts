/**
 * Personas and journey maps for the client case studies. Sources: the interview
 * notes in notes/interview-notes/, notes/ivfcryo/portfolio.md, notes/vm-spark.md
 * and Josh's own accounts. Quotes are word for word from the transcripts. Persona
 * names are fictional, so needs are never attributed to a real participant; `basis`
 * names the real source. Don't reuse a participant's name for a persona.
 */
export interface Persona {
  id: string;
  name: string;
  role: string;
  context: string;
  quote?: string;
  quoteBy?: string;
  needs: string[];
  frustrations: string[];
  /** Where this persona came from. Required, so working personas stay labeled. */
  basis: string;
}

export interface JourneyStage {
  id: string;
  stage: string;
  /** The section of the case study that answers this stage. */
  href: string;
  doing: string;
  problem: string;
  design: string;
}

export const logatotPersonas: Persona[] = [
  {
    id: 'renee',
    name: 'Renee Walsh',
    role: 'The solo provider',
    context: 'About 11 years running a licensed home program, with six children and a few hours of help a week.',
    quote: 'We choose the children, and then we pay for that choice with our evenings and our sleep.',
    quoteBy: 'Angie, home-based provider',
    needs: ['Log a moment without looking away from the children', 'Finish the day’s records before dinner', 'Proof of good faith if a record is questioned'],
    frustrations: ['Records rebuilt from memory at night', 'Fear that an honest error will look like fraud', 'Tools built for centers with desks and office staff'],
    basis: 'Based on the interview with Angie.',
  },
  {
    id: 'tanya',
    name: 'Tanya Brooks',
    role: 'The provider running a business',
    context: 'About 14 years in home care, with six children and an assistant three days a week.',
    quote: 'The technology has to fit the work. The work should not have to change to fit the technology.',
    quoteBy: 'Deborah, home-based provider',
    needs: ['One attendance record for billing, subsidy, meals, and licensing', 'Enter information once', 'A tool that saves more time than it takes'],
    frustrations: ['The same details typed into several systems', 'Reimbursement lost to mismatched records', 'Apps that took more managing than they saved'],
    basis: 'Based on the interview with Deborah.',
  },
  {
    id: 'marisol',
    name: 'Marisol Vega',
    role: 'The Spanish-speaking provider',
    context: 'About eight years in home care, with five or six children and occasional help from family.',
    quote: 'When everything is working, I already know what to do. When there is a problem, the explanation is in English.',
    quoteBy: 'Yari, home-based provider',
    needs: ['Voice entry in Spanish', 'Errors, warnings, and support in plain Spanish', 'A chance to review what the system heard'],
    frustrations: ['English on the screens that matter most', 'Tools that translate poorly', 'Systems that can’t share basic information'],
    basis: 'Based on the interview with Yari.',
  },
];

export const logatotJourney: JourneyStage[] = [
  {
    id: 'arrive',
    stage: 'Children arrive',
    href: '#decision-kiosk',
    doing: 'The provider greets families and records who is here.',
    problem: 'Attendance feeds billing, subsidy, meals, and licensing, but each system wants it entered separately.',
    design: 'A PIN and signature at the kiosk, with attendance calculated from check-in history.',
  },
  {
    id: 'day',
    stage: 'Care through the day',
    href: '#decisions',
    doing: 'One person supervises the children while meals, naps, and diapers all need recording.',
    problem: 'Supervision and paperwork both need full attention, so notes end up on paper scraps and in texts.',
    design: 'Hands-free voice logging, lined up by child on the Voiceboard.',
  },
  {
    id: 'evening',
    stage: 'Evening paperwork',
    href: '#decision-review',
    doing: 'After the children leave, the provider rebuilds the day’s records.',
    problem: 'Records written from memory are less accurate, and the work takes evenings and weekends.',
    design: 'Entries are already logged, so only misheard ones wait in Needs review.',
  },
  {
    id: 'claim',
    stage: 'Month-end claim',
    href: '#decision-menus',
    doing: 'The provider claims meal reimbursement from CACFP.',
    problem: 'A lunch missing a vegetable is found at month end, when it can’t be fixed.',
    design: 'Menus are checked against CACFP rules while they’re planned.',
  },
  {
    id: 'audit',
    stage: 'Inspection or audit',
    href: '#process',
    doing: 'A licensor or auditor asks to see the records.',
    problem: 'Mismatched records make providers afraid an honest error will look dishonest.',
    design: 'Reports come from entries logged during the day, and deleted records are kept.',
  },
];

export const ivfcryoPersonas: Persona[] = [
  {
    id: 'priya',
    name: 'Priya Nair',
    role: 'The patient',
    context: 'Moving embryos between clinics, often already carrying anxiety from the IVF process.',
    quote: 'When patients call, they may not only be asking where the courier is. They may be asking whether their chance to have a child is safe.',
    quoteBy: 'Sasha, office manager',
    needs: ['Know both clinics are ready without calling', 'Plain-language status instead of raw readings', 'A real person to reach when something looks wrong'],
    frustrations: ['Hearing different answers from the clinic and IVFCRYO', 'Vague updates like “being processed”'],
    basis: 'Based on interviews with IVFCRYO’s owner and office manager, who speak with patients every day.',
  },
  {
    id: 'lauren',
    name: 'Lauren Cho',
    role: 'The clinic contact',
    context: 'Creates and manages shipments, and needs to release or receive specimens correctly.',
    quote: '‘Sent’ is not the same thing as ‘received and approved.’',
    quoteBy: 'Don, owner',
    needs: ['A fast, repeatable way to create shipments', 'Specimen details that stay accurate', 'Saved instructions for each facility'],
    frustrations: ['Upfront default settings that had to be undone', 'Technical questions landing at the front desk'],
    basis: 'Based on the interviews and on prototype sessions with customers.',
  },
  {
    id: 'tessa',
    name: 'Tessa Morgan',
    role: 'The IVFCRYO coordinator',
    context: 'Keeps patients, clinics, cryobanks, couriers, and the internal team moving on every shipment.',
    quote: 'My job is often to make sure the right person has the right information at the right time.',
    quoteBy: 'Sasha, office manager',
    needs: ['One case instead of email, fax, and phone notes', 'A clear owner at every handoff', 'Every shipment visible by readiness'],
    frustrations: ['Couriers scheduled before everyone is ready', 'Being told something was handled, with no record of it'],
    basis: 'Based on the interviews with the office manager and COO.',
  },
  {
    id: 'martin',
    name: 'Martin Reyes',
    role: 'The customer using a screen reader',
    context: 'A legally blind customer who had trouble with the older shipping form on IVFCRYO’s website.',
    needs: ['Complete a shipment without help', 'Hear errors next to the fields they belong to', 'Hear status changes as they happen'],
    frustrations: ['Form errors not tied to their fields', 'Parts of the form that didn’t work by keyboard', 'Updates that were never announced'],
    basis: 'Based on testing sessions with this customer.',
  },
];

export const ivfcryoJourney: JourneyStage[] = [
  {
    id: 'request',
    stage: 'Request',
    href: '#decision-shipment-choices',
    doing: 'A patient places an order and names who they’ve been talking to at each clinic.',
    problem: 'That person may not be responsible for specimen transfers, and details arrive incomplete.',
    design: 'Structured specimen fields, checked addresses, and reusable contacts.',
  },
  {
    id: 'readiness',
    stage: 'Confirm readiness',
    href: '#decisions',
    doing: 'Both clinics confirm records, approval, and laboratory contacts.',
    problem: 'Couriers get scheduled first, with everyone hoping the rest is finished before pickup.',
    design: 'Each party clears a checkpoint before a courier can be scheduled.',
  },
  {
    id: 'pickup',
    stage: 'Release and pickup',
    href: '#decision-shared-record',
    doing: 'The sending lab loads the tracked unit and hands it to the courier.',
    problem: 'Responsibility changes hands without the next person knowing it’s now theirs.',
    design: 'A named contact acknowledges every handoff.',
  },
  {
    id: 'transit',
    stage: 'In transit',
    href: '#decision-interface',
    doing: 'Staff watch the readings while the patient waits for news.',
    problem: 'A reading that reassures an operator can alarm someone waiting on a specimen.',
    design: 'Public tracking with no personal details, a plain-language verdict, and alerts with an assigned responder.',
  },
  {
    id: 'delivery',
    stage: 'Delivery and acceptance',
    href: '#decision-forms',
    doing: 'The receiving lab takes the specimen into storage.',
    problem: 'A delivery scan at the front desk doesn’t prove the lab accepted it.',
    design: 'Receiving captures a temperature reading and photos, and the finished shipment locks as the record of custody.',
  },
];

export const vmsparkPersonas: Persona[] = [
  {
    id: 'graham',
    name: 'Graham Whitlock',
    role: 'The investor',
    context: 'A venture capitalist or angel investor deciding whether VMSpark is a finished business worth backing. The main audience for this work.',
    needs: ['A product that looks as reliable as the pipeline is', 'An app and marketing site that feel like one company', 'Evidence that problems are visible and under control'],
    frustrations: ['A dashboard copied from an example page, with a chart that never loaded', 'Mixed styles and five icon sets', 'An interface that needs an apology before the demo'],
    basis: 'A working persona based on the client’s goal. No investors were interviewed.',
  },
  {
    id: 'nadia',
    name: 'Nadia Hassan',
    role: 'The operator',
    context: 'Works at a staffing agency and spends the day making sure every hospital job maps correctly and reaches the applicant tracking system.',
    needs: ['Know what needs fixing without hunting', 'See why a job failed, in words', 'A screen that’s comfortable to read all day'],
    frustrations: ['Failure reasons hidden in hover popovers', 'Delete buttons that ran without a confirmation', 'Nothing saying what to do next'],
    basis: 'A working persona based on the heuristic audit and stakeholder reviews. No operators were interviewed.',
  },
];

export const vmsparkJourney: JourneyStage[] = [
  {
    id: 'marketing',
    stage: 'Reads the marketing site',
    href: '#decisions',
    doing: 'The investor forms a first impression of the company.',
    problem: 'The app and the marketing site had drifted apart.',
    design: 'The app borrows the site’s navy, blue, Spark bolt, and line drawings.',
  },
  {
    id: 'signin',
    stage: 'Signs in to the demo',
    href: '#decision-themes',
    doing: 'The investor moves from the pitch to the product.',
    problem: 'The app mixed Bootstrap 4 and 5 and used five icon sets.',
    design: 'One design system behind sign-in and every screen, in light and dark.',
  },
  {
    id: 'tour',
    stage: 'Looks around the app',
    href: '#decisions',
    doing: 'The investor checks whether this looks like a finished product.',
    problem: 'The dashboard came from a Bootstrap example, and its chart never loaded.',
    design: 'Every page says its one job and shows its state in words.',
  },
  {
    id: 'failure',
    stage: 'Asks what happens when a job fails',
    href: '#decision-inbox',
    doing: 'The investor wants to know the pipeline’s problems are visible.',
    problem: 'Failure reasons were hidden on hover, and nothing said what to do next.',
    design: 'One inbox for unmapped values, which are the jobs that can’t reach a customer’s ATS.',
  },
  {
    id: 'risk',
    stage: 'Weighs the risk',
    href: '#decision-safety',
    doing: 'The investor considers what could go wrong in daily use.',
    problem: '33 of 43 delete buttons ran without a confirmation.',
    design: 'Confirmations say what will happen before it happens.',
  },
];

export const caseResearch = {
  logatot: { personas: logatotPersonas, journey: logatotJourney },
  ivfcryo: { personas: ivfcryoPersonas, journey: ivfcryoJourney },
  vmspark: { personas: vmsparkPersonas, journey: vmsparkJourney },
};

export type CaseProject = keyof typeof caseResearch;
