# Discrepancy Review — IVFCRYO interviews

**Sources cross-referenced**

- `src/assets/projects/logatot/wires-and-flows/_src/08-calendar.html` (Logatot — calendar & drills wireframe)
- `src/pages/projects/interview-notes/ivfcryo/don-fish.md` (Don, Owner)
- `src/pages/projects/interview-notes/ivfcryo/sasha-jenkins.md` (Sasha, Office Manager)

**Purpose:** flag anywhere the interviews conflict with one another.

---

## 0. Read this first — the Logatot file is a different project

The requested cross-reference file, `08-calendar.html`, belongs to **Logatot**, a
home-daycare management product. It is a month calendar with fire-drill and
shelter-in-place logging, tuition dates, and licensing visits. It shares **no
domain facts** with the IVFCRYO fertility-shipment interviews — no couriers, no
cryogenics, no specimens, no service guarantee.

Because the two describe unrelated systems, the Logatot sheet **cannot be in
factual conflict** with the interviews. There is nothing to reconcile between
"time to full exit: 2:14" on a fire-drill record and "−130 °C at specimen storage
level" on a shipment. I have not invented conflicts to fill the section.

> If the intent was to compare the interviews against an **IVFCRYO** wireframe
> (e.g. one of `src/assets/projects/ivfcryo/wires-and-flows/`), say so and I will
> re-run this against the correct sheet. The section below does the real work the
> request implies: **conflicts between the two interviews.**

_(A legitimate, non-conflicting relationship to Logatot is noted in §4.)_

---

## 1. Hard contradictions between the interviews — **none found**

Every quantitative or named fact that appears in **both** interviews is
consistent. The two accounts were evidently reconciled on the specifics:

| Fact                                                   | Don (Owner)                                                                       | Sasha (Office Manager)                                                                                          | Status   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| CRYO Shield protection tiers                           | "$25,000 or $50,000 per client and tissue type" (L151)                            | "$25,000 or $50,000 per client and tissue type" (L167)                                                          | ✅ Match |
| "Per client / per tissue type" scoping                 | Stated (L151)                                                                     | Restated + emphasized for multi-tissue orders (L185)                                                            | ✅ Match |
| Claim temperature threshold                            | "warmer than minus 130 °C at specimen storage level… calibrated equipment" (L155) | "warmer than minus 130 °C at the specimen storage level, measured with appropriate calibrated equipment" (L175) | ✅ Match |
| IVFCRYO-Sense telemetry fields                         | GPS, internal temp, outside/ambient temp, humidity, atmospheric pressure (L79)    | GPS, internal shipper temp, outside temp, humidity, atmospheric pressure (L213)                                 | ✅ Match |
| Customer-experience contact model                      | "we assign someone from our customer experience team to the case" (L17-ish)       | "A customer experience agent is assigned… the patient's primary contact" (L17)                                  | ✅ Match |
| Dedicated medical courier (direct, no unrelated stops) | Described at length                                                               | Described, plus the patient misconception it doesn't remove prep                                                | ✅ Match |
| Update channels                                        | phone, email, text, website tracking                                              | phone, email, text, online tracking                                                                             | ✅ Match |

**Bottom line:** there is no instance where Don and Sasha state incompatible
values for the same fact.

---

## 2. Asymmetries — facts stated by only one interviewee

These are **omissions, not contradictions.** Each is a claim one person makes and
the other simply never addresses. Worth logging because a reader cross-checking
the two could mistake an omission for a disagreement, and because a case study
that cites only one source for a number should know it is single-sourced.

| Fact                                                                           | Only in          | Note                                                                                                                                                     |
| ------------------------------------------------------------------------------ | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| "More than one million reproductive tissue shipments"; "decades of experience" | **Don** (L9)     | Company scale/credibility claim. Single-sourced.                                                                                                         |
| Long-term storage "near minus 196 °C"                                          | **Don** (L69)    | Sasha cites only the −130 °C claim threshold, never −196 °C. Not a conflict — different figures for different things (storage temp vs. claim threshold). |
| IVFCRYO-One: "below minus 150 °C for vapor storage," liquid-submersion + vapor | **Don** (L117)   | Equipment spec. Sasha discusses IVFCRYO-One's monitoring but not the −150 °C vapor figure.                                                               |
| CRYO Shield "**30-day** claim submission period"                               | **Sasha** (L177) | Don lists claim evidence requirements but never states the 30-day window. If the write-up asserts 30 days, Sasha is the only source.                     |
| Phrase "primary contact throughout the process"                                | **Sasha** (L17)  | Don describes the same role/behavior without that label.                                                                                                 |

⚠️ **Watch item:** the −196 °C / −150 °C / −130 °C figures are three _different_
measurements (long-term storage / IVFCRYO-One vapor spec / claim threshold).
They are easy to conflate into a false contradiction. They are not in conflict —
but any downstream copy must keep them distinct.

---

## 3. Framing / emphasis differences (not factual conflict)

The interviews diverge in **perspective**, which is expected given the roles, and
they do not contradict:

- **Vantage point.** Don speaks from ownership and whole-process responsibility
  ("maintaining control across organizational boundaries"). Sasha speaks from
  day-to-day coordination (chasing forms across email/fax/portal, finding the
  right lab contact). Different altitude, same system.
- **The "one thing to fix first."** They **agree**, which is notable: both name a
  shared readiness workflow that both facilities confirm before a courier is
  scheduled (Don L321-ish "a truly shared readiness workflow"; Sasha L377 "a
  shared readiness checklist that both facilities must confirm"). This is
  corroboration, not conflict.
- **CRYO Shield emphasis.** Don frames it as a declared-value/legal mechanism;
  Sasha frames it as something patients _misunderstand_ ("guarantee/insurance"
  vs. the specific terms). Complementary, not contradictory.

---

## 4. The only legitimate Logatot cross-reference: shared design principles

Since a direct factual comparison is impossible (§0), the honest link between the
Logatot calendar sheet and the IVFCRYO interviews is that **the same design
convictions surface in both** — as parallels, not conflicts:

| Principle                               | Logatot `08-calendar.html`                                                                                                                                          | IVFCRYO interviews                                                                                                                                              |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Encode by shape, never color alone**  | Event type carried by border style — solid/dashed/dotted — so a B&W print still distinguishes drill from outing (note 2, L313)                                      | Don & Sasha both stress transparency without alarm; the case study's "text, icon, and shape, never color alone" rule. Same accessibility conviction.            |
| **Structured records over free text**   | Participants are a ticked roster, not a typed list, because "a year later… whether one specific child was in the building" needs a structured record (note 4, L315) | Both interviewees stress accurate, structured order/facility data; "sent is not approved," documentation as a safety system.                                    |
| **Capture = proof**                     | "Logging the drill and proving the drill are the same action" (L117, note 5)                                                                                        | CRYO Shield: "the claims process begins long before a claim exists" — capture the calibrated temp and photos at receiving, or the event can't be reconstructed. |
| **Print/handoff is a designed surface** | Compliance report assembled from records; print styles neutralise theme (note 6, L317)                                                                              | Documentation must survive an investigation across multiple orgs; records "protect the patient, the facilities, the courier, and us."                           |

These are **thematic agreements**, and they belong in a "design system / recurring
principles" note — not in a conflict log.

---

## Summary

1. **No hard contradictions** exist between the Don and Sasha interviews. Shared
   numbers ($25k/$50k, −130 °C, IVFCRYO-Sense fields) match exactly.
2. The only differences are **one-sided omissions** (§2) — most importantly the
   **30-day claim window (Sasha only)** and **the million-shipments / −196 °C /
   −150 °C figures (Don only)** — and **role-based framing** (§3).
3. Keep the **−196 / −150 / −130 °C** figures distinct; they are the likeliest
   source of a _manufactured_ discrepancy.
4. The **Logatot file is a different project** and cannot conflict with the
   interviews; its only real relationship is shared design principles (§4).
