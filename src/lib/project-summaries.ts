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
