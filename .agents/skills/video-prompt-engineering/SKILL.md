---
name: video-prompt-engineering
description: Converts an approved VideoBrief and time-coded shot plan into a provider-neutral text-to-video prompt package — temporal action, camera direction, cross-shot continuity, exact text handling, negative constraints, versioning, and model adapters only when a provider is named. Activates for authoring or revising a video prompt, translating a shot plan into model-readable language, adapting one concept to Veo, Kling, Runway, Sora, or Pika, splitting model motion from overlay motion, or fixing prompts that describe a still frame, cram competing actions into one shot, drift in style between shots, or ask the model to render text.
---

# Video Prompt Engineering

Turns an approved plan into a prompt a text-to-video model can execute.

## When to use

Load this after the shot plan exists. If there is no shot plan, the work belongs
to the video director role, not here.

## Inputs

- `VideoBrief` — objective, audience, platform, duration, ratio, exact copy.
- `video_composition` — target-specific framing, focal bounds, overlays, UI
  zones, and motion corridors.
- `shot_plan[]` — time ranges, actions, framing, camera, transitions.
- `brand_constraints` — palette tokens, type tokens, style lock, logo rules.
- `caption_plan`, `motion_plan`, `audio_plan` — if the post layer is in scope.
- Named provider/model, only if the user or host selected one.

## Core principle

**A video prompt is a sequence of ordered events, not a decorated still.**

Three failure modes account for most bad output:

1. **Still-frame prompt.** Describes composition and mood, never what changes.
   Fix: every shot gets an explicit subject action with a start state and an
   end state.
2. **Action pile-up.** Three things happen at once, so the model smears all
   three. Fix: one primary action per shot, max two concurrent moving elements.
3. **Text in the model.** The model renders mangled glyphs. Fix: text handling
   is assigned to the overlay layer, and the prompt explicitly forbids readable
   text.

## Procedure

### 1. Inherit, do not re-decide

Take message, copy, palette tokens, style lock, characters, wardrobe, and
setting as fixed. If the prompt needs a change to any of them, stop and route it
to the owner (campaign strategist for copy, brand guardian for palette/tone,
video director for story). Silent changes are the defect this skill exists to
prevent.

### 2. Verify the time arithmetic

Sum the shot durations and compare to `duration_seconds`. They must be equal.
A mismatch is a hard stop — do not "round" it into the prompt.

### 3. Split motion by renderer

Every moving element is assigned to exactly one renderer before writing:

| Element | Renderer | In the prompt? |
|---|---|---|
| Character and prop action, environment drift, camera move | model | yes |
| Camera move | model | yes |
| Captions, headline, CTA, lower third, callout, kinetic type | overlay | **no** — add a negative |
| Logo | supplied asset | **no** — add a negative |
| Music, SFX, ducking, loudness | deterministic mix | yes, as `audio_instructions` only |

### 4. Write the main prompt in six blocks

Provider-neutral order. Models weight early tokens most, so subject and action
lead.

```
1. SHOT CONTEXT   duration, ratio, style family, subject, setting
2. ACTION         what happens, in order, with start and end state per beat
3. CAMERA         framing and movement, one purposeful move per shot
4. STYLE LOCK     verbatim illustration language + palette token names
5. CONTINUITY     what must stay identical across shots
6. EXCLUSIONS     no readable text, no logo, no extra subjects or claims
```

Write in plain present-tense declarative sentences. No camera jargon the
model cannot act on ("dolly zoom with Dutch angle rack focus" in one clause =
noise). No claims, no prices, no dialogue the user did not supply.

### 5. Style lock is quoted, never paraphrased

Copy the canonical video style block from
`flat-vector-illustration/references/style-lock.md` verbatim into block 4.
Paraphrasing is where drift starts. Reference palette by **token name**
("warm orange, deep purple, soft lavender, charcoal, white"), never by hex —
hex lives in `brand/meelte-brand.json` and changes there.

### 6. Negatives

Separate list when the target model supports one. Otherwise append as a final
sentence. Minimum set for Meelte:

```
photorealism, 3D render, clay render, stock footage, live action,
readable text, captions, subtitles, watermark, logo, signature,
extra limbs, morphing faces, character redesign, palette shift,
fast cuts, handheld shake, lens flare, busy background
```

Add brief-specific negatives only for defects the brief actually risks.

### 7. Model adaptation only when named

No named model = no adapter notes. Do not guess a provider's syntax. When one
is named, record parse length, supported durations, audio support, and negative
prompt support as **claims to verify**, not facts. Keep adaptations in
`provider_model_notes` so the approved creative stays readable and portable.

### 8. Version, never overwrite

`prompt_version` increments on every revision (`v1`, `v2`, …). Keep the prior
version and the reason for the change. A targeted fix changes one block, not the
whole prompt.

## Output contract

```json
{
  "request_id": "…",
  "prompt_version": "v1",
  "main_prompt": "…",
  "negative_prompt": "…",
  "video_composition": { "platform": "…", "aspect_ratio": "…", "shot_compositions": [] },
  "shot_plan": [ { "id": "s1", "start": 0.0, "end": 4.0, "action": "…", "framing": "…", "camera": "…", "transition": "…" } ],
  "target_platform": "…",
  "target_duration_seconds": 15,
  "target_aspect_ratio": "9:16",
  "target_dimensions": "1080x1920",
  "audio_instructions": "…",
  "provider_model_notes": null,
  "created_at": "…",
  "status": "draft",
  "renderer_split": { "model": ["camera", "character_action"], "overlay": ["captions", "headline", "logo"] },
  "unresolved_assumptions": []
}
```

## Checklist

- [ ] Shot durations sum exactly to `duration_seconds`.
- [ ] Every shot has a start state, an action, and an end state.
- [ ] Max two concurrent moving elements per shot.
- [ ] No camera move that contradicts the subject action.
- [ ] Style lock quoted verbatim; palette referenced by token name.
- [ ] Continuity block names character, wardrobe, props, setting, screen direction.
- [ ] No readable text, captions, or logo requested from the model.
- [ ] Copy untouched; no invented claim, price, date, or statistic.
- [ ] Model notes present only with a named provider, marked unverified.
- [ ] Deliverable labelled `prompt_package`, never "video".

## Failure cases

- **No shot plan** → do not invent one here; return to the director role.
- **Durations do not sum** → stop, report the arithmetic, do not pad.
- **Copy not supplied but captions requested** → emit pre-timed caption slots
  with `text: null` and `copy_status: "pending"`. Never fill them with invented
  lines. Flag as a known limitation.
- **Style override requested** → require it recorded in the brief before writing
  the style lock; otherwise use the brand default.
- **Named model lacks audio** → move audio to `audio_instructions` as a post
  step and say so; do not silently drop it.
- **User asks for text rendered by the model** → explain glyph risk, offer the
  overlay path, and record whichever they choose.

## Sources

Structure follows `pipeline.md` and `req.txt` §7C; style-lock rules come from
`flat-vector-illustration/references/style-lock.md`.
