# Video prompt workflow — design brief (rev 3)

Deliverable: a provider-neutral prompt package for Meelte short-form video, now
covering **shot action, captions, sound effects, animation and motion graphics**.
Status: **proposed, one decision open** (§6). Date: 2026-11-12. Owner: orchestrator.

## 1. Scope drift and the skill set

Revision 1 pruned caption/audio skills as out of scope. Captions, sound effects
and motion are now in scope, so those skills came back. **Nothing has been
deleted** — the script was never executed.

Current 20-folder split:

| Set | Count | Members |
|---|---|---|
| KEEP | 9 | `meelte-brand-system`, `marketing-creative-strategy`, `flat-vector-illustration`, `advertising-layout-composition`, `campaign-series-consistency`, `image-prompt-engineering`, `image-quality-review`, `image-asset-finishing`, `find-skills` |
| HOLD (post layer) | 7 | `auto-editor-transcribe`, `caption-animation`, `ffmpeg-captions-subtitles`, `remotion-motion-graphics`, `sound-design-film`, `audio-mixing-mastering`, `video-editing` |
| REMOVE | 4 | `ai-engineer`, `backend-engineer`, `auto-editor`, `ffmpeg-video-editor` |

`remotion-motion-graphics` moved from REMOVE to HOLD: it is the only skill that
covers kinetic type, lower thirds, callout pops and transition graphics.

`auto-editor` and `ffmpeg-video-editor` still go. `auto-editor` cuts silence out
of recorded footage; there is none. `ffmpeg-video-editor` duplicates
`video-editing` for concat/scale/extract.

## 2. The critical split: model motion vs overlay motion

This is the whole design. A text-to-video model can animate a character, a prop
and a camera. It **cannot** be trusted to render type. If you ask for "kinetic
typography spelling DOCUMENTS, NOT DRAMA", you get mangled glyphs.

So every moving element is assigned to exactly one renderer:

| Element | Renderer | Why |
|---|---|---|
| Character action, prop movement, environment drift, camera move | **model** | requires scene understanding |
| Captions, kinetic type, headlines, CTA, lower thirds, callout pops, logo | **deterministic overlay** (`remotion-motion-graphics`, `caption-animation`, `ffmpeg-captions-subtitles`) | exact copy, exact brand type, zero glyph risk |
| Transition graphics (wipes, shape sweeps) | **deterministic overlay** | brand palette control |
| Music bed, SFX, ducking, loudness master | **deterministic mix** (`sound-design-film`, `audio-mixing-mastering`) | models do not honour mix specs |

Consequence for the prompt: the model prompt describes **plate motion only**.
It never asks for text. `req.txt` §2 already requires this ("do not rely on
video models to render the logo, small text, prices, dates, or legal copy") —
this brief extends it to captions and titles.

## 3. Motion is per-video, not global

"Some videos" means motion level is a **per-asset field**, and the rest of the
campaign stays locked so the set still reads as one campaign
(`campaign-series-consistency`).

| Profile | Use | Model motion | Overlay motion |
|---|---|---|---|
| `calm` | price/offer posts, trust frames | one action per shot, no camera move | caption fade only |
| `animated` | feature explainers | one character action + slow push-in | kinetic captions, 1 callout pop |
| `expressive` | launches, festival posts | two motivated actions, one camera move | kinetic type + lower third + transition sweep |

Hard bounds at every level, from `req.txt` §2: no more than two concurrent
moving elements, no rapid cutting, no complex camera moves, palette tokens only.

## 4. Contracts added on top of `req.txt` §7

### `motion_plan`

```json
{
  "profile": "calm | animated | expressive",
  "model_motion": [
    { "shot": "s1", "subject_motion": "owner slides the ledger across the counter", "camera": "static", "dialogue_safe": true }
  ],
  "overlay_motion": [
    { "id": "ov_01", "kind": "kinetic_caption | headline | cta | lower_third | callout_pop | transition_sweep",
      "text": "needs a shop licence?", "start": 0.4, "end": 2.2,
      "easing": "standard", "stagger_ms": 40, "emphasis_word": "licence",
      "anchor": "lower-third-safe", "renderer": "remotion" }
  ],
  "concurrency_check": { "max_simultaneous": 2, "observed": 2, "ok": true },
  "brand_bounds": { "palette_tokens_only": true, "type_tokens_only": true, "no_beats_of_noise": true }
}
```

### `caption_plan`

```json
{
  "mode": "burned_in | sidecar_srt | none",
  "timing_source": "whisper_word_level | script_beats",
  "typography": { "family": "brand token", "weight": "brand token", "size_band": "brand token" },
  "safe_area": { "bottom_pct": 18, "max_lines": 2, "chars_per_line": 24 },
  "segments": [ { "text": "verbatim supplied copy only", "start": 0.0, "end": 2.3, "emphasis_word": null } ],
  "invariants": [
    "never model-rendered",
    "exact supplied copy or omitted",
    "never over the logo zone or platform UI"
  ]
}
```

### `audio_plan`

```json
{
  "music": { "bed": null, "enter": 0.0, "exit": 15.0, "duck_db": -12 },
  "vo": [ { "line": "verbatim or null", "start": 0.0, "end": 0.0 } ],
  "sfx_cues": [
    { "id": "sfx_01", "tc": 1.2, "sound": "soft whoosh", "layer": "transition", "gain_db": -14, "rationale": "masks the cut from s1 to s2" }
  ],
  "mix_target": { "integrated_lufs": -14, "true_peak_dbtp": -1.0, "note": "short-form convention; confirm per platform" },
  "exclusions": []
}
```

`mix_target` is a planning target. A video model will not honour it; it is met
downstream at mix, not at generation.

## 5. Stages

| # | Stage | Owner | Artifact |
|---|---|---|---|
| S0 | Normalize brief, state defaults, set `motion_profile` + `deliverable_type` | orchestrator | `VideoBrief` |
| S1 | Palette/type/logo/tone constraints, motion bounds, compliance checklist | brand-guardian | `brand_constraints`, `conflicts[]` |
| S2 | Objective, insight, one message, exact copy | campaign-strategist | `campaign_message` |
| S3 | Concept, time-coded shot plan summing to duration, camera, continuity | video-director | `shot_plan[]` |
| S4 | `caption_plan` + `motion_plan` overlay half; concurrency check | video-director + brand-guardian | `caption_plan`, `motion_plan` |
| S5 | `audio_plan` — music bed, SFX cue sheet, ducking, mix target | video-director | `audio_plan` |
| S6 | **Plate-only** provider-neutral prompt + negatives; model notes only if named | video-prompt-engineer | `VideoPromptPackage` |
| S7 | QA: timing arithmetic, continuity, copy accuracy, caption legibility, motion concurrency, audio feasibility | video-prompt-qa | `QualityReview` |
| S8 | Deliver package + metadata | finalizer | `FinalDeliverable` |
| S8b | *Only if scope override B*: render plate, composite overlays, mix audio | render adapter | `VideoGenerationResult` |

## 6. Open decision

- **A (default, recommended): plan-and-package.** Produces the prompt plus the
  three plans. Overlay layer is specified but not rendered. Consistent with
  `req.txt` §1/§11, needs no credentials, works today.
- **B: render the whole thing.** Adds provider adapter, TTS, SFX library,
  Remotion composition, FFmpeg burn-in, loudness master. Contradicts
  `req.txt` §1 out-of-scope — needs a recorded scope override.

Also needed: **which videos get `animated` or `expressive`**. Per-asset answer
is enough; a rule ("feature posts animated, offer posts calm") is better.

## 7. Still missing

`video-prompt-engineering` and `video-quality-review` do not exist, and no
existing skill enforces the §10 gate that shot timings sum to the total
duration. S6 and S7 are unbacked procedures until those two skills are written.
