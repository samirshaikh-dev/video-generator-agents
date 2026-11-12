# Social Video Aspect Ratios — Composition Reference

These are composition targets, not a promise that every platform placement
accepts every dimension. Check the current upload requirements before export.
The source of truth for Meelte's existing pixel presets remains
`brand/meelte-brand.json`.

## Platform targets

| Placement | Ratio | Target pixels | Composition notes |
|---|---:|---:|---|
| Instagram Reels / Stories | 9:16 | 1080×1920 | Vertical action; protect top and bottom UI zones |
| Instagram feed portrait | 4:5 | 1080×1350 | Tall central action; recompose from 9:16 |
| Instagram feed square | 1:1 | 1080×1080 | Compact action; preserve subject and captions |
| LinkedIn feed landscape | 16:9 | 1920×1080 | Wider environment or split composition |
| LinkedIn feed square | 1:1 | 1080×1080 | Compact feed composition when requested |
| LinkedIn portrait | 4:5 | 1080×1350 | Use only when the intended placement supports it |

Ratios and pixels are planning targets. Resolve the specific placement first;
do not assume a platform or player will preserve the full canvas.

## 9:16 — Instagram Reel or Story

- Make the action readable in a narrow frame; use a clear subject silhouette.
- Keep the main action in the middle area, clear of top profile controls and
  bottom actions/caption UI.
- Leave a stable caption zone; avoid placing important gestures behind it.
- Keep all critical elements inside the central crop-safe region.
- Do not reuse the 4:5 composition by simply extending the background.

## 4:5 — Instagram feed portrait or supported LinkedIn placement

- Use the height for one clear vertical action, not extra decorative content.
- Keep the face, hands, focal prop, and caption area inside conservative edge
  margins.
- Re-plan camera travel and subject scale for this crop; do not crop a Reel
  master.

## 1:1 — Instagram or LinkedIn feed

- Keep the main action compact and readable at thumbnail size.
- Avoid placing captions or a logo over the focal subject.
- Use a close, simple composition; do not squeeze a landscape scene into a
  square without rebuilding it.

## 16:9 — LinkedIn landscape

- Use the width for a clear subject/action plus a restrained negative-space
  area for optional copy or brand overlays.
- Do not make the subject too small in a wide environment.
- Keep key action away from lateral edges to support player cropping and
  future reframing.

## Cross-platform adaptation

When one concept ships to multiple placements:

1. Keep the approved message, illustration style, and character model.
2. Build a separate composition and safe-area map per ratio.
3. Reposition or reframe the action; do not rely on center-cropping.
4. Re-check captions, logo clear space, UI zones, and camera travel in each.
5. Record any target-specific compromise in the composition contract.

## Failure signals

- A vertical master is cropped into a square and loses a gesture.
- A wide shot makes the subject unreadable on a phone.
- Captions or important action sit under player controls.
- The camera path exits the safe crop even though the opening frame looked safe.
