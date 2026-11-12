# Social Video Safe Areas — Reference

Platform UI and safe zones vary by placement, device, and product updates.
These are conservative composition guides, not official platform guarantees.
Check the current player before final delivery.

## Definitions

| Term | Meaning |
|---|---|
| **Canvas edge** | The boundary of the encoded frame |
| **Action-safe area** | Region where faces, hands, and key props remain visible |
| **Caption-safe area** | Stable region reserved for subtitles or supplied copy |
| **Logo box** | Reserved region including the supplied asset's clear space |
| **Platform UI zone** | Region that may be covered by player controls or feed chrome |
| **Motion corridor** | Path a character, prop, or camera may travel without crossing protected zones |

## Conservative UI clearances

| Placement | Keep clear |
|---|---|
| Instagram Reels / Stories (9:16) | Top 12% and bottom 15% for player UI; keep critical action and overlays clear |
| Instagram feed (1:1, 4:5) | Keep critical copy and CTA away from the bottom edge and controls |
| LinkedIn feed video | Keep critical copy and CTA away from player controls and the bottom edge |

Do not treat these percentages as fixed platform specifications. Verify the
target player and device. Place important elements inside conservative margins
even when the preview appears unobstructed.

## Video-safe composition rules

1. Keep faces, hands, focal props, captions, CTAs, and logo inside the
   action-safe region for the full shot, not just its first frame.
2. Define caption and logo areas once, then preserve them across shots where
   practical.
3. Do not route a character, prop, or camera move through a caption area unless
   the overlay intentionally moves or is hidden for that beat.
4. Leave enough contrast behind captions; use a solid brand-token panel or a
   restrained scrim when needed.
5. Keep logo clear space around the supplied asset; omit or mark `logo pending`
   when no approved logo file is supplied.
6. Re-check every target aspect ratio independently; a safe 16:9 layout may
   become unsafe in 9:16 or 1:1.
7. Check text size at phone/feed scale, not only at full resolution.

## Suggested placement strategy

- **9:16:** reserve the top and bottom UI bands; place the primary action and
  any overlay in the central area.
- **4:5:** preserve room below the action for captions while keeping the main
  subject centered vertically.
- **1:1:** keep the focal subject and captions compact, with margins on all
  four sides.
- **16:9:** reserve side negative space for optional copy; keep the focal
  action away from lateral crop edges.

## Review

1. Overlay a guide for UI zones, caption area, logo box, and subject bounds.
2. Inspect keyframes during motion, including entry, peak action, and exit.
3. Confirm no face, hand, prop, caption, or logo enters a covered area.
4. Repeat for each platform and aspect ratio.

## Failure signals

- The CTA or captions are hidden by player controls.
- A subject begins in frame but exits the crop during camera movement.
- Captions cover a face, handoff, or other key action.
- The logo lacks clear space or competes with the focal subject.
- A layout is checked only as a still and misses unsafe motion between frames.
