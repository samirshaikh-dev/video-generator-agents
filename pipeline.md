# Meelte Video Prompt Pipeline

The portable workflow for turning a Meelte marketing request into a
brand-safe, time-aware prompt for a text-to-video model. Any agent or host with
file access can follow it. A video-generation tool is optional; the default
deliverable is the prompt package, not a rendered video.

```
rough brief → normalize → load brand → plan message and story → write prompt
            → self-check → return prompt package
            → optionally generate and review, only with an available tool
```

---

## 0. Non-negotiables

1. **Never invent campaign facts.** Do not add prices, discounts, deadlines,
   statistics, guarantees, testimonials, product capabilities, or claims the
   user did not supply.
2. **Never fabricate the Meelte logo.** Use only a supplied approved asset.
   Without one, reserve a clean zone and mark `logo pending`.
3. **Never change approved copy silently.** Preserve exact user-supplied text.
4. **Never claim a video exists unless it was actually generated.** A prompt
   package and a rendered asset are different deliverables.
5. **Read the brand file; never recall it.** Use `brand/meelte-brand.json` as
   the source of truth.
6. **Keep the prompt temporal.** Describe actions and their order over time;
   do not stop at a still-frame description.
7. **Keep every prompt version.** Do not overwrite approved prompts or raw
   generations.

---

## 1. Normalize the request

Create a `VideoBrief`. State defaults visibly; do not hide assumptions.

| Field | Default if missing |
|---|---|
| `objective` | infer from the prompt; if unclear, ask |
| `audience` | local small-business owners |
| `platform` | Instagram Reels / short-form social |
| `duration` | 15 seconds, subject to model limits |
| `aspect_ratio` | 9:16 vertical |
| `key_message` | infer only if supported by the request; otherwise ask or keep neutral |
| `copy` | none; use only supplied exact strings |
| `must_include` | the subject named in the prompt |
| `must_avoid` | none beyond the standard brand and safety constraints |
| `audio` | none unless requested |
| `reference_assets` | none |
| `logo_asset` | none → `logo pending` |
| `approval_mode` | automatic prompt review; rendering is not implied |

Ask at most one clarification question, and only if the answer changes the
creative materially: conflicting objectives, an essential missing asset,
required exact copy, or an incompatible requested format/duration. Otherwise
record reasonable defaults and continue.

Treat duration, dimensions, frame rate, audio support, and other technical
details as targets until a selected provider confirms its limits.

---

## 2. Load the brand system

Read `brand/meelte-brand.json`. If missing, stop; do not substitute remembered
brand values. Apply:

- `palette.tokens` and dominance rules.
- `typography` and `copy` limits.
- `illustration` treatment and `banned_treatments`.
- `logo` variants, placement, and integrity rule.
- `brand` name, tone, and claims policy.

Keep the default playful 2D vector style coherent across shots. Use purposeful,
readable motion; keep characters, props, wardrobe, setting, and palette
consistent unless the story explicitly changes them. A style override is
allowed only when the user explicitly requests it and the brief records it.

---

## 3. Route to relevant skills

Read only what the request needs. Skills live in `.agents/skills/<name>/SKILL.md`.

| If the request involves | Read |
|---|---|
| any Meelte video | `meelte-brand-system/SKILL.md` |
| visual characters or illustrated scenes | `flat-vector-illustration/SKILL.md` and its style-lock reference |
| headline, CTA, offer, or claim | `marketing-creative-strategy/SKILL.md` |
| framing, aspect ratio, text-safe areas | `advertising-layout-composition/SKILL.md` |
| a campaign series | `campaign-series-consistency/SKILL.md` |
| video prompt structure or model adaptation | `video-prompt-engineering/SKILL.md`, if present |
| reviewing a rendered video | `video-quality-review/SKILL.md`, if present |

If a video-specific skill is not present, follow this pipeline without
pretending the skill exists. Apply image-composition guidance only to framing
and safe areas; do not treat a video as a static image.

---

## 4. Plan the story and motion

Before writing the final prompt, make a compact, time-coded shot plan:

- Define one clear message and one primary subject.
- Give the video a beginning, progression, and ending or deliberate loop point.
- Split the requested duration into a small number of readable shots/beats.
- Specify each shot's time range, subject action, framing, camera movement,
  transition, lighting, and continuity requirements.
- Ensure shot durations add up to the requested total duration.
- Keep each shot's action and camera instruction physically coherent. Avoid
  contradictory directions or several competing actions at once.
- Specify dialogue, voiceover, music, sound effects, and ambience only when
  requested or supplied. Do not invent spoken claims.
- Identify exact text and logo handling separately from generated imagery.

### Video prompt package

Produce:

1. **Brief summary** — objective, audience, platform, target duration, and
   aspect ratio.
2. **Creative concept** — the key visual idea and emotional tone.
3. **Shot plan** — time-coded actions and camera directions, with continuity
   notes.
4. **Main prompt** — a clear, provider-neutral description of subject,
   setting, temporal progression, motion, camera, visual style, lighting,
   framing, and continuity.
5. **Audio instructions** — only if relevant and supported by the brief.
6. **Text/logo instructions** — quote only exact supplied copy; otherwise
   request no generated text and reserve clean areas for deterministic
   overlays. Use only supplied logo files.
7. **Negative constraints** — brief-specific exclusions; separate them from
   the main prompt when the target model supports a negative prompt.
8. **Target specs and assumptions** — duration, ratio, dimensions if supplied,
   model target if named, and any unresolved provider limitations.

Do not include provider parameters as facts unless a provider/model has been
selected and its current requirements are known. Keep model-specific
adaptations separate from the approved creative concept.

---

## 5. Self-check before handoff or generation

Do not hand off the prompt until every applicable check passes:

- [ ] Objective, audience, platform, duration, and aspect ratio are recorded.
- [ ] The prompt describes an ordered action over time, not only a still image.
- [ ] The shot plan has a clear progression and ending or loop point.
- [ ] Shot timings add up to the requested duration.
- [ ] Camera movement and subject action are clear and non-contradictory.
- [ ] Characters, props, wardrobe, environment, and style remain continuous.
- [ ] Orange and purple remain the dominant brand pair.
- [ ] No unsupported claim, price, offer, deadline, statistic, or capability.
- [ ] Every quoted text string came from the user and is spelled exactly.
- [ ] No instruction to generate or approximate the Meelte logo.
- [ ] Audio is included only when requested or supplied.
- [ ] Provider-specific behavior is not promised without a named, verified model.
- [ ] The deliverable is labeled as a prompt package unless a video was
  actually generated.

---

## 6. Optional video generation

The workflow does not require a provider. If no video-generation tool is
available or configured:

- Return the complete prompt package in a fenced block with the target model
  noted if the user selected one.
- State the target duration and aspect ratio.
- State plainly that no video was rendered.
- Stop; do not describe the planned video as though it exists.

If a host has an authorized video tool and the user requested generation:

- Use the approved prompt and only the supplied or consented reference assets.
- Respect the provider's actual duration, ratio, resolution, audio, and input
  limitations; disclose any adaptation before changing approved creative.
- Record provider, model, parameters, prompt version, result status, and errors.
- Never report success when the provider failed or returned no usable asset.

No provider adapter is required by this prompt workflow.

---

## 7. Review

### Prompt review (always required)

- Objective and audience are recognizable from the plan.
- The story is understandable without relying on unsupported text.
- Actions, timing, camera, and transitions are specific enough to guide a
  video model without overloading a shot.
- Characters and visual details remain consistent across the timeline.
- Meelte palette, tone, and default 2D style are respected.
- Exact supplied copy is accurate; invented copy and claims are absent.
- Text and logo are assigned to a reliable overlay/asset path or marked
  pending.
- Technical assumptions and provider-specific limitations are disclosed.

### Rendered-video review (only when an actual asset exists)

Review the actual video, not only its prompt, for brief alignment, brand
consistency, motion artifacts, continuity, legibility, audio, and technical
delivery. Do not mark a rendered asset approved without this review.

**Severity:** any critical factual, brand-name, or logo failure must be fixed
before approval. Major continuity or message failures require a targeted
revision. Minor issues may be listed with the deliverable.

**Revision rule:** change the prompt clause owned by the issue; do not rewrite
the approved campaign message. Use a bounded retry budget (default: two video
regenerations if rendering is enabled). Prompt-only revisions do not consume a
video-generation retry. On exhaustion, stop and report unresolved issues.

---

## 8. Save the prompt package

When the host can write files, save each request under `outputs/<request_id>/`.
The prompt package is a deliverable even when no provider is available.

Suggested layout:

```
outputs/
  MEE-2026-0001/
    brief.json
    video-plan.json
    prompt-v1.md
    reviews/
      prompt-v1.review.json
    generated/
      raw-v1.mp4
    final/
      MEE-2026-0001_v1_final.mp4
```

Rules:
- Use the project's request ID convention and preserve all versions.
- Save a generated video only when a real provider returned it.
- Never create placeholder video files or report unverified paths.
- Keep reference assets in `brand/`, separate from generated outputs.
- If the host cannot write files, return the prompt package and metadata in
  chat and state that no video asset was saved or rendered.

What to report:
- Prompt package path or prompt text and version.
- Target platform, duration, aspect ratio, and model if specified.
- Whether a video was actually rendered; include provider and verified asset
  details only when applicable.
- Known assumptions, provider limitations, and unresolved QA issues.

---

## Worked example

**Request:**

> Make a 15-second vertical Meelte Reel for local shopkeepers. Show a shop owner
> preparing an order and handing it to a customer. Use our friendly illustrated
> brand style. No dialogue or offer.

**Plan:**

```
Target: 15 seconds · 9:16 · short-form social
Style: playful, polished 2D commercial vector; stable character and palette
Audio: none; no dialogue or music

0–4s: Medium-wide view of a neighborhood shop. The shop owner checks a small
order on the counter; gentle camera push-in.
4–10s: The owner packs the order and turns toward the customer. Keep the same
wardrobe, counter, and prop positions; use a simple lateral camera move.
10–15s: The owner hands the package to the customer; both smile. Settle into a
clean closing frame with a reserved logo area; do not generate logo or copy.
```

**Provider-neutral prompt:**

```
Create a 15-second vertical 9:16 animated marketing video in a polished,
playful 2D commercial vector style. In a welcoming neighborhood shop, the
same friendly shop owner prepares a small customer order, turns, and hands it
to a waiting customer. Show the actions in this order: checking the order,
packing it, then handing it over. Use smooth, simple character motion and
purposeful gentle camera movement. Keep the characters, clothing, counter,
props, and environment visually consistent throughout. Use warm orange and
deep purple as the dominant brand colors, with soft lavender, charcoal, and
white as supporting colors. Keep the background uncluttered and reserve a
clean logo area in the closing frame. No dialogue, no offer, no generated
logo, no readable text, no extra claims.
```

If no video tool is available, return the plan and prompt and state that no
video was rendered. Do not claim a video file exists.

---

## Copy-paste template

```
Brief: [objective] · [audience] · [platform] · [duration] · [aspect ratio]

Concept: [one key message and one visual idea]

Shot plan:
[start–end] [subject action] · [framing/camera] · [transition/continuity]
[start–end] [subject action] · [framing/camera] · [transition/continuity]
[start–end] [subject action] · [framing/camera] · [transition/continuity]

Prompt:
[subject and setting] + [ordered action over time] + [camera and motion] +
[brand style and palette] + [continuity] + [exact text/logo instructions]

Audio: [only if requested]
Negative: [specific exclusions; if supported]
Targets: [platform] · [duration] · [ratio] · [dimensions if supplied] · [model if selected]
Assumptions/limitations: [explicit]
```
