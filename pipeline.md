# meelTe Video Prompt & Illustrated Video Pipeline

The canonical workflow for turning a meelTe marketing brief into a brand-safe, time-aware video concept, time-coded shot plan, bespoke 2D vector scene keyframes, and model-ready prompt package. 

```
rough brief → normalize → load brand rules → plan message & story 
            → generate bespoke 9:16 scene illustrations (outputs/<id>/scenes/)
            → author provider-neutral / image-to-video prompt package
            → self-check & prompt QA
            → deliver prompt package & illustrated storyboard
            → optionally render via Remotion / cloud video provider
```

---

## 0. Non-negotiables

1. **Never invent campaign facts.** Do not add prices, discounts, deadlines, statistics, guarantees, testimonials, product capabilities, or claims the user did not supply.
2. **Never fabricate the meelTe logo.** Use only an approved supplied asset. Without one, reserve a clean zone and mark `logo pending`.
3. **Never change approved copy silently.** Preserve exact user-supplied text.
4. **Never claim a video was rendered unless it was actually generated.** A prompt package, scene storyboard, and rendered video file are distinct deliverables. State status truthfully.
5. **Read the brand source of truth; never recall it.** Always use `brand/meelte-brand.json`.
6. **Keep prompts temporal.** Describe actions, camera movements, and their order over time; do not stop at static image descriptions.
7. **Preserve visual continuity.** Character design (clothing, hair, beard), props, environment, and brand color palette (`#FEA711` orange & `#743BAA` purple) must remain strictly locked across all shots.
8. **Keep every version.** Do not overwrite approved prompts or scene assets; version them (`v1`, `v2`).

---

## 1. Normalize the Request (VideoBrief)

Normalize each user request into a structured `VideoBrief`:

| Field | Default if missing |
|---|---|
| `objective` | Infer from the prompt; if unclear, ask |
| `audience` | Local small-business owners / shoppers |
| `platform` | Instagram Reels / YouTube Shorts / TikTok |
| `duration` | 25 seconds for tutorial reels; 15 seconds for flash announcements |
| `aspect_ratio` | 9:16 vertical (1080×1920) |
| `key_message` | Derived from brief; keep factual and supportive of local owners |
| `copy` | None; use only supplied exact strings |
| `visual_reference` | `Warm Bakery Bag Exchange.png`, `image.png` |
| `logo_asset` | `brand/assets/logo/primary-full-colour` or `reverse-white` |
| `approval_mode` | Automatic prompt review; rendering is not implied |

Ask at most one clarification question, and only if a missing detail materially changes the creative.

---

## 2. Load Brand System & Continuity Locks

Read `brand/meelte-brand.json`. Apply:
- **Palette Tokens:** Dominant pair: **meelTe Orange (`#FEA711`)** and **meelTe Purple (`#743BAA`)**, supported by Lavender (`#F4EFFD`), Charcoal (`#171923`), and White (`#FFFFFF`).
- **Art Direction:** Polished **2D commercial vector illustration** with smooth shading and clean contours (as seen in `Warm Bakery Bag Exchange.png` and `image.png`).
- **Banned Styles:** Photorealism, 3D/clay render, AI plastic sheen, generic stock photography, and wireframe emoji placeholders.
- **Character Continuity:** When recurring characters appear (e.g., the bearded Indian bakery shopkeeper in purple apron, or the customer in mustard top), their wardrobe, skin tone, hair, and facial features must remain locked across all shots.

---

## 3. Plan the Story, Timing & Audio Architecture

1. **Duration Arithmetic:** Split the target duration into a small number of readable shots whose durations sum **exactly** to the requested total duration (e.g., 4s + 5s + 7s + 5s + 4s = 25.0s / 750 frames at 30 fps).
2. **Audio & Voiceover Pacing:**
   - Spoken rate: 130–145 words per minute (~2.3 words/sec).
   - Word count target for 25s: 50–60 words total.
   - Music ducking: Duck background music by -10dB to -14dB during voiceover lines.
3. **Sound Design (SFX):** Plan motivated sound effects at exact timecodes (e.g., camera shutter click on photo snap, bouncy pop on discount badge, cash chime on publish).
4. **Captions & Safe Areas:**
   - 9:16 Safe Area: Keep captions inside the vertical band (Y: 1200px – 1360px), clear of social platform headers (top 220px) and bottom engagement buttons (bottom 340px).
   - Word-level karaoke timing: Active word highlights in brand orange (`#FEA711`).

---

## 4. Bespoke Illustrated Keyframe Generation

For high-production illustrated reels, generate bespoke 9:16 vertical keyframe images for each narrative beat to serve as the visual anchor:

1. **Storage Location:** Save scene assets under `outputs/<request_id>/scenes/scene-<N>.jpg`.
2. **Prompting the Image Generator:**
   - Reference the canonical style images (`Warm Bakery Bag Exchange.png`, `image.png`).
   - Specify character wardrobe, facial features, bakery/shop environment, and brand color tokens.
   - Generate in vertical 9:16 format (1080×1920).
3. **Scene Continuity:** Each scene must reuse the exact setting, characters, and props from previous scenes.

---

## 5. Author the Video Prompt Package

Produce the comprehensive `prompt-v<version>.md`:
1. **Brief Summary:** Objective, audience, platform, duration, aspect ratio.
2. **Visual Reference Anchors:** Explicit paths to reference images and generated scene assets.
3. **Shot Plan:** Time-coded actions, camera directions, transitions, VO lines, and SFX cues.
4. **Master Prompt (Text-to-Video & Image-to-Video):** Clear, ordered prompt ready for AI video generators (Runway, Kling, Luma, Sora) referencing the keyframes.
5. **Exact Text & Overlays:** Deterministic text instructions, font weights, and logo variant rules.
6. **Negative Constraints:** Specific exclusions (no 3D, no photorealism, no distorted anatomy).

---

## 6. Self-Check & Prompt QA Gate

Verify all checks before delivery:
- [ ] Shot timings sum exactly to requested duration.
- [ ] Visual style strictly follows 2D commercial vector illustration (no wireframes or raw emojis).
- [ ] Orange (`#FEA711`) and Purple (`#743BAA`) remain dominant.
- [ ] Characters and environments remain continuous across all scenes.
- [ ] No invented prices, offers, or unsubstantiated claims.
- [ ] Voiceover pacing fits comfortably within shot time windows.
- [ ] Captions adhere to 9:16 platform safe zones.
- [ ] Deliverable status states plainly whether a video file was rendered or delivered as a prompt package + illustrated storyboard.

---

## 7. Delivery & Post-Production Options

Save all outputs under `outputs/<request_id>/`:
```
outputs/
  MEE-2026-0001/
    brief.json
    video-plan.json
    prompt-v1.md
    reviews/
      prompt-v1.review.json
    scenes/
      scene-1.jpg
      scene-2.jpg
      scene-3.jpg
      scene-4.jpg
    RemotionReel1.tsx
```

### Rendering Paths:
* **Path A (Remotion / Motion Graphics):** Combine the bespoke scene illustrations with smooth Ken Burns camera movement, kinetic karaoke captions, audio ducking, and SFX using `RemotionReel1.tsx`.
* **Path B (AI Video Generation):** Feed `scene-1.jpg` through `scene-4.jpg` into an image-to-video AI generator (Kling, Runway, Luma) using the master prompt from `prompt-v1.md`.
* **Honest Delivery:** If no video rendering engine or external GPU provider is active, deliver the prompt package and illustrated storyboard and state clearly that no video file was rendered.
