# IVFCRYO — Research Notes & Synthesis

Stakeholder research for the IVFCRYO shipment-management case study. Three
interviews across three vantage points, plus three analytical passes over them.
This README is the front door: it indexes the material and **clusters the
insights** so the findings can be acted on without re-reading every transcript.

---

## Contents

### Primary research (interview transcripts)

| File | Interviewee | Vantage point |
|---|---|---|
| [`don-fish.md`](./don-fish.md) | **Don**, Owner | Whole-business responsibility; the promise to patients |
| [`daryl-bestoff.md`](./daryl-bestoff.md) | **Daryl**, COO | Operations, risk, systems, scaling |
| [`sasha-jenkins.md`](./sasha-jenkins.md) | **Sasha**, Office Manager | Daily coordination; patient contact |

### Analysis (secondary passes)

| File | Lens | What it answers |
|---|---|---|
| [`theme-analysis.md`](./theme-analysis.md) | **Thematic** | What ideas recur across all three, and where roles diverge |
| [`descrepances.md`](./descrepances.md) | **Consistency** | Where the interviews conflict (they largely don't) + single-sourced facts |
| [`sentiment-analysis.md`](./sentiment-analysis.md) | **Sentiment** | Emotional tone by speaker and by topic |

---

## How to read this research

The three interviews were designed to **triangulate**: three roles describing one
operation. The signal to trust most is **convergence** — where an Owner, a COO,
and an Office Manager independently land on the same point despite different daily
concerns. The consistency review confirms the transcripts are mutually
non-contradictory, so convergence here is corroboration, not coincidence.

---

## Insight clusters

Six clusters organize everything the research produced. Each notes **how strongly
the sources converge** and the **design implication** that falls out of it.

### Cluster 1 — The problem is coordination, not transportation
> Convergence: **all three (strong).** Sentiment: negative toward the status quo.

A shipment "looks like one transaction to the patient, but it is actually a chain
of separate responsibilities" across five independent parties — patient, sending
clinic, receiving clinic, courier, IVFCRYO. The visible truck is the easy part;
the coordination *before* it moves is the hard part and the source of most
failure. *The container is not the service.*

**Design implication:** model the five-party workflow explicitly; make the
administrative chain as legible as the physical one.

### Cluster 2 — Readiness must be a formal, gated state ⭐
> Convergence: **all three, independently, as the #1 fix (strongest signal in the corpus).**

Asked what they'd change first, Don, Daryl, and Sasha each named the same thing: a
shared readiness workflow both facilities confirm **before** a courier is
scheduled. Today, "scheduling first and hoping" is the worst pattern; the system
can't distinguish a *requested* date from a *provisional* plan from a *confirmed*
shipment.

**Design implication:** a readiness gate with per-party checkpoints; scheduling is
blocked until every party has acknowledged. This is the highest-leverage change
the research surfaced.

### Cluster 3 — Trust is built (or lost) at the handoffs
> Convergence: **all three (strong).**

"'Sent' is not the same thing as 'received and approved.'" — "'Someone said it was
handled' is not a reliable status." — chain of custody "should not end with a
delivery scan at the front desk." Failure concentrates at the seams, where the
next person doesn't know they're now responsible.

**Design implication:** named contacts (not front desks) and explicit
acknowledgment events at every handoff; "delivered" and "accepted into storage"
are distinct states.

### Cluster 4 — Safety is layered visibility + signal discipline
> Convergence: **Daryl (deep), Don & Sasha (corroborating).**

No single control is trusted absolutely; safety is redundancy plus *continuous*
monitoring over a snapshot. And the signal plumbing matters as much as the
sensors: alerts must be **tiered** (normal / warning / critical) to avoid alert
fatigue, escalation ownership must be assigned **before** the shipment, and
documentation is a **safety system** — "the claims process begins long before a
claim exists."

**Design implication:** severity-tiered alerting with pre-assigned escalation; a
unified exception/incident workflow that assembles context automatically;
capture-as-proof at receiving (calibrated temp + photos).

### Cluster 5 — Communication calibrated to audience and emotion
> Convergence: **Don & Sasha (strong).** Sentiment: highest emotional intensity in the corpus.

More data is not more clarity. A reading that "reassures an operator" can "alarm
someone waiting on a specimen." Patients aren't only asking where the courier is —
they're "asking whether their chance to have a child is safe." Vague reassurance
("being processed") is as unhelpful as raw telemetry is frightening.

**Design implication:** plain-language status with context (normal vs. warning vs.
emergency); withhold raw telemetry from the public view; specificity over generic
status; a staffed human path.

### Cluster 6 — Design the organization out of heroics
> Convergence: **Daryl (deep), all three (agreeing).**

Durability means not depending on the best person being in the room. Turn tacit
expertise into "a repeatable organizational capability"; "growth should make the
operation more mature, not more dependent on heroic employees." Automate the
routine (reminders, validation, routing); **never** automate judgment (specimen
ID, release, acceptance, sensitive communication).

**Design implication:** one shared case record with per-role views and a full
audit trail; a live "command center" on shipping day; measure with four lenses
(safety / reliability / efficiency / experience), eliminating *preventable* delays
rather than all delays.

---

## Confidence & evidence quality

From [`descrepances.md`](./descrepances.md):

- **No hard contradictions** between the interviews. Shared facts match exactly
  (CRYO Shield tiers $25k/$50k; −130 °C claim threshold; IVFCRYO-Sense fields).
- **Single-sourced facts to flag** before citing in the case study:
  - *Daryl/Don only:* million-shipment scale, −196 °C storage, −150 °C IVFCRYO-One
    vapor spec.
  - *Sasha only:* the **30-day** claim window.
- **Watch item:** keep the −196 / −150 / −130 °C figures distinct — they measure
  three different things and are the likeliest source of a *manufactured*
  discrepancy.

---

## Emotional context

From [`sentiment-analysis.md`](./sentiment-analysis.md):

- Net tone is **measured-but-caring** (≈ +0.17 polarity) — professional gravity,
  with emotional weight concentrated on patients and irreplaceable material.
- The negativity is **diagnostic, not defeatist**: it targets the manual status
  quo, while affect brightens toward the proposed system. Every interview rises at
  the end.
- Per speaker: **Don** = reassuring gravity; **Daryl** = analytical sobriety;
  **Sasha** = empathetic realism (widest emotional range).

---

## The throughline (what the research is really saying)

> **The safety of an irreplaceable specimen is decided by the invisible chain
> around it, not by the visible truck carrying it.**

Trust is manufactured *before* the box moves. The consistent design mandate across
themes, consistency, and sentiment: **make readiness and chain of custody as
legible and enforceable as the tracking already is** — and do it in a way that
respects the human stakes the whole team feels acutely.

---

## Where this feeds

These findings drive the case-study revision (`ivfcryo-updated.astro`), which
recenters the narrative on readiness-before-scheduling, corrects the product
ecosystem (IVFCRYO-Sense / IVFCRYO-One), and adds the exception-management and
service-guarantee threads the interviews surfaced.
