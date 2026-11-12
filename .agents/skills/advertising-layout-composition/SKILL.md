---
name: advertising-layout-composition
description: Plan the time-aware composition of illustrated meelTe social videos for LinkedIn and Instagram. Use for aspect-ratio adaptation, focal placement, subject-safe bounds, caption/logo zones, platform UI clearances, camera paths, and shot-to-shot layout continuity. Does not own campaign copy, illustration design, story timing, or video rendering.
---

# Advertising Layout & Composition for Video

## Purpose

Own where important elements sit and how the composition changes over time.
Turn an approved message, illustration spec, and shot plan into a composition
map that remains legible on LinkedIn and Instagram placements.

Use it when:

- Planning an illustrated social video for LinkedIn, Instagram Feed, Reels, or
  Stories.
- Adapting one video concept to landscape, square, portrait, or vertical.
- Defining subject bounds, caption-safe areas, logo placement, or UI clearance.
- A frame feels crowded, loses its focal point, or crops important action.

Not for: copy (`marketing-creative-strategy`), illustration appearance
(`flat-vector-illustration`), shot story/timing (`video director`), or prompt
assembly (`video-prompt-engineering`).

## Inputs

| Input | Required | Notes |
|---|---|---|
| VideoBrief and platform placement | yes | LinkedIn/Instagram placement matters |
| Aspect ratio and duration | yes | Use a target from the brief or ask once |
| Approved message and copy | yes | Preserve exact supplied strings |
| Shot plan and focal action | yes | Layout must serve each beat |
| Illustration spec | yes | Characters, props, and motion bounds |
| Logo asset | no | Reserve a zone if absent |
| Caption/overlay plan | no | Keep text out of generated video unless explicitly approved |

## Procedure

1. **Resolve the placement and target canvas.** Read
   `references/aspect-ratios.md` and `references/safe-areas.md`. Use the
   requested platform placement; treat dimensions as targets and verify
   platform upload requirements before delivery.
2. **Recompose for every ratio.** Do not stretch, letterbox, or center-crop a
   master layout when it removes a subject, gesture, caption zone, or logo.
   Use a separate composition map for each delivery format.
3. **Choose a skeleton for each shot.** Use stacked, split, full-frame with
   protected overlay zones, or a deliberate close-up. The same skeleton may
   evolve only when the story motivates the change.
4. **Set the focal subject and safe bounds.** Give its center and bounding box
   in percentages. Keep faces, hands, and key props inside the crop-safe area
   for the entire shot, including during camera movement.
5. **Define visual flow and motion corridors.** State where the eye travels,
   where the subject enters/exits, and which regions stay clear for captions,
   CTA, and logo. Do not let text or platform UI cover the focal action.
6. **Plan persistent overlays.** Give captions and branding stable zones across
   shots where practical. Quote only user-supplied copy. Reserve logo clear
   space for the approved asset; never ask the video model to render it.
7. **Protect UI and mobile readability.** Keep critical content away from
   Instagram Reel/Story controls and LinkedIn player/feed chrome. Platform UI
   can change, so use conservative margins and check the current placement.
8. **Check transitions and continuity.** Keep screen direction and subject
   scale coherent between adjacent shots. Preserve safe areas when cutting,
   reframing, or moving the camera.
9. **Emit one `video_composition` map per target format.**

## Output contract

```json
{
  "video_composition": {
    "platform": "Instagram Reels",
    "format_id": "story-vertical",
    "aspect_ratio": "9:16",
    "canvas_target": { "width": 1080, "height": 1920 },
    "safe_margin_pct": { "top": 12, "right": 7, "bottom": 18, "left": 7 },
    "platform_ui_zones": [
      { "id": "top_controls", "edge": "top", "reserved_pct": 12 },
      { "id": "bottom_controls", "edge": "bottom", "reserved_pct": 15 }
    ],
    "persistent_zones": {
      "caption_safe_area": { "x_pct": 8, "y_pct": 66, "w_pct": 84, "h_pct": 12 },
      "logo_box": { "x_pct": 8, "y_pct": 54, "w_pct": 22, "h_pct": 8 }
    },
    "shot_compositions": [
      {
        "shot_id": "s1",
        "layout": "full-frame-protected",
        "focal_subject": "shopkeeper preparing the package",
        "subject_bounds_pct": { "x": 20, "y": 24, "w": 60, "h": 46 },
        "camera_path": "gentle push-in; stop before entering caption zone",
        "entry_exit": "no critical action near the crop edges",
        "transition_continuity": "hold screen direction into s2"
      }
    ],
    "visual_flow": "shopkeeper → package → customer",
    "crop_protection": "faces, hands, and package remain inside the central safe area"
  }
}
```

Values in the example are starting points, not universal platform guarantees.
Recalculate for the actual placement, current UI, and creative.

## Platform and format guidance

- **Instagram Reels / Stories:** use 9:16 as the default vertical target; keep
  key action, captions, CTA, and logo clear of top and bottom controls.
- **Instagram Feed video:** use 4:5 or 1:1 when selected; recompose the action
  for the feed crop rather than cropping a Reel master.
- **LinkedIn feed video:** use 16:9 landscape for a wide scene or 1:1 when the
  brief calls for a compact feed composition. Use 4:5 only when the selected
  LinkedIn placement supports it.
- If a video ships to both platforms, create platform-specific composition
  maps and verify each in its target player.

## Quality checklist

- [ ] Platform, placement, ratio, and canvas target are explicit.
- [ ] Every shot has a focal subject and crop-safe bounds.
- [ ] Important action remains visible throughout camera and subject motion.
- [ ] Caption, CTA, logo, and UI zones do not overlap one another or the focal
      action.
- [ ] Logo placement honors the supplied asset and brand clear space.
- [ ] Compositions are rebuilt for each aspect ratio, not simply cropped.
- [ ] Subject scale, screen direction, and safe zones remain coherent between
      adjacent shots.
- [ ] Critical content is legible on a phone at feed size.

## meelTe example

Brief: 15-second illustrated video for LinkedIn and Instagram: a local
shopkeeper prepares an order and hands it to a customer.

- **Instagram Reels, 9:16:** frame the shopkeeper and customer in the middle
  65% of the image; keep the handoff above the caption zone and clear of top
  and bottom controls.
- **LinkedIn feed, 16:9:** use a wider shop environment with the handoff near
  the center; reserve a quiet side panel for a short overlay if copy is
  supplied.
- Keep the package handoff visible in every crop. Produce distinct framing and
  camera paths for the two outputs; do not center-crop the vertical version.

## Constraints and failure cases

**Never:**

- Reuse a still-image band layout without planning the timeline.
- Scale or crop one platform master if it hides a face, gesture, caption, or
  logo.
- Put captions, CTA, logo, or a focal action inside platform UI zones.
- Move important content through text-safe zones without a planned overlay
  change.
- Let a camera move push a face, hand, or prop out of frame.
- Add decorative icons to fill empty space.

| Situation | Response |
|---|---|
| Subject is cropped during motion | Tighten subject bounds or reduce camera travel |
| Caption covers the action | Move the caption to its persistent safe zone or revise framing |
| LinkedIn and Instagram crops conflict | Build separate compositions, not one compromise crop |
| Video feels static | Improve subject action or camera path with the video director |
| Copy does not fit | Shorten or reflow approved copy through the strategist; do not shrink it silently |
| Platform UI changed | Verify the current player and update the placement map |

## References

- `references/aspect-ratios.md` — social-video target formats and re-composition.
- `references/safe-areas.md` — platform UI zones, captions, logo, and crop safety.

## Sources

Safe-zone and multi-format practice adapted from
`nextlevelbuilder/ui-ux-pro-max-skill@banner-design`. Brand constraints derive
from `brand/meelte-brand.json` and `req.txt` §2–3.
