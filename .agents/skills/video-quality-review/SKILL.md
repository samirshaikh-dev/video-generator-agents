---
name: video-quality-review
description: Reviews a video prompt package, or an actual rendered video when one exists, against the brief and brand rules — returning pass/fail, scored dimensions, severity-tagged issues, and revision instructions routed to the owning role. Activates for checking a video prompt before delivery, verifying shot timings sum to the duration, catching continuity drift across shots, auditing captions and audio feasibility, judging a rendered clip, or deciding whether a failure needs a prompt revision, a plan revision, or a deterministic overlay fix.
---

# Video Quality Review

The gate. Two modes, and they are not interchangeable.

## Modes

| Mode | Trigger | What is judged |
|---|---|---|
| `prompt_review` | always, before delivery | the package's plan, prompt, and contracts |
| `rendered_review` | **only** when a real video asset exists | the asset itself, plus the prompt that produced it |

Never run `rendered_review` on a prompt. Never describe a prompt as "the video".
If no asset exists, say `deliverable_type: "prompt_package"` and stop at
`prompt_review`.

## Inputs

`VideoBrief` · `VideoPlan` · `VideoPromptPackage` · `brand_constraints` ·
`caption_plan` · `motion_plan` · `audio_plan` · the asset, if any.

## Scored dimensions

Score each `pass` / `pass_with_notes` / `fail`.

| Dimension | Fails when |
|---|---|
| `brief_alignment` | objective, audience, or platform is unserved; the story answers a different question |
| `temporal_coherence` | no progression, no ending or loop point, or the action is unordered |
| `motion_and_camera_clarity` | contradictory directions, competing actions, unreadable motion |
| `continuity` | character, wardrobe, prop, setting, or screen direction drifts without a planned change |
| `brand_compliance` | palette pair broken, banned treatment, invented logo, off-tone |
| `copy_and_claim_accuracy` | any string not supplied verbatim; any invented price, offer, date, statistic, capability |
| `caption_legibility` | captions in the platform UI zone, over the logo, over a busy area, or above the line/character cap |
| `audio_feasibility` | SFX or dialogue asserted that the brief did not request, or mix spec promised by a video model |
| `technical_quality` | **rendered only** — artefacts, morphing, frame drops, sync, loudness |

## Hard blockers

Any one of these overrides a high score and forces `fail`:

1. Invented campaign fact — price, discount, deadline, statistic, testimonial,
   capability.
2. Logo generated, traced, or approximated instead of using the supplied asset.
3. Deliverable described as a rendered video when none was generated.
4. Shot timings that do not sum to the requested duration.
5. Copy altered without the strategist's approval.

## Severity

| Level | Meaning | Action |
|---|---|---|
| `critical` | hard blocker | fix before delivery, no exceptions |
| `major` | breaks the message, continuity, or legibility | targeted revision, one retry |
| `minor` | visible but tolerable | list with the deliverable |

## Verdict rules

- `pass` — every dimension passes, no open items.
- `pass_with_notes` — no critical or major; minors listed and accepted.
- `revise` — one or more major; route each to its owner.
- `fail` — any critical or hard blocker.

## Routing

Send each issue to the owner of the fix, not to regeneration.

| Issue | Owner | Fix type |
|---|---|---|
| Timing arithmetic, shot action, camera, continuity | video director | plan revision |
| Prompt wording, negatives, model notes | prompt engineer | prompt revision |
| Caption text, headline, CTA, claims | campaign strategist | copy revision |
| Palette, type, logo, tone, motion bounds | brand guardian | constraint fix |
| Caption burn-in, overlay position, export, loudness | finalizer / post layer | deterministic fix |
| Rendered artefacts, morphing, sync | video director, then regenerate | asset revision |

Deterministic fixes (overlay, reposition, re-export, re-mix) do not consume a
regeneration budget. Default budget: two regenerations. On exhaustion, stop and
report the failing shot with the unresolved issue list.

## Output contract

```json
{
  "request_id": "…",
  "reviewed_artifact": "prompt_package | generated_video",
  "prompt_version": "v1",
  "overall_status": "pass | pass_with_notes | revise | fail",
  "deliverable_type": "prompt_package | generated_video",
  "dimensions": {
    "brief_alignment": "pass",
    "temporal_coherence": "pass",
    "motion_and_camera_clarity": "pass",
    "continuity": "pass",
    "brand_compliance": "pass",
    "copy_and_claim_accuracy": "pass",
    "caption_legibility": "pass",
    "audio_feasibility": "pass",
    "technical_quality": null
  },
  "issues": [
    { "id": "iss_01", "severity": "major", "dimension": "caption_legibility", "detail": "…", "owner": "campaign_strategist", "instruction": "…" }
  ],
  "revision_instructions": [],
  "budget": { "regenerations_used": 0, "regenerations_allowed": 2 },
  "created_at": "…"
}
```

## Checklist

- [ ] Objective, audience, platform, duration, ratio explicit.
- [ ] Shot timings sum to the duration.
- [ ] Each shot: one readable action, purposeful camera.
- [ ] Continuity named, not assumed.
- [ ] Orange and purple still the dominant pair.
- [ ] Every text string traceable to the user.
- [ ] No unsupported offer, price, date, statistic, capability.
- [ ] Logo supplied or marked pending.
- [ ] Captions inside the safe area, never over logo or platform UI.
- [ ] Audio only what the brief asked for; mix target not promised by the model.
- [ ] Label says prompt package or generated video, truthfully.

## Failure cases

- **No plan available** → review cannot proceed; return to the director role.
- **Prompt describes a still frame** → `temporal_coherence: fail`, major.
- **Captions requested but copy pending** → pass the prompt, flag
  `copy_and_claim_accuracy` as `pass_with_notes` with a major open item routed
  to the strategist. Do not invent caption text to close the gap.
- **User pressures a pass** → the hard blockers are not negotiable; re-state
  them once, then deliver with the honest verdict.
- **Rendered clip is "mostly fine"** → "mostly fine" is a major, not a minor,
  when it touches continuity or the message.

## Sources

Scoring and severity model adapted from `image-quality-review`; checks from
`req.txt` §10 and `pipeline.md` §5/§7.
