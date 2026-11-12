# Style Lock — meelte-flat-vector-v1

The style lock is reused **verbatim** across shots and versions of a campaign
video. Changing a locked visual rule is a style change; record it as a new
lock version and get approval before using it.

## Canonical block

```
Polished 2D commercial vector animation for a modern retail brand.
Flat vector shapes with subtle gradients for depth.
Smooth clean edges, minimal outlines in a darker shade of each shape's fill.
Friendly characters with expressive simplified faces and rounded,
slightly exaggerated proportions (head-to-body 1:5.5).
Simplified recognisable objects and environments, three depth planes only.
Soft single-direction shadows at low opacity, restrained highlights.
Limited intentional palette: warm orange, deep purple, soft lavender,
dark charcoal, white.
Clear single focal subject, uncluttered background, generous negative space.
Bold editorial advertising composition, playful and approachable.
Keep character identity, wardrobe, prop design, line weight, palette, and
lighting consistent across every shot.
No readable text, no captions, no lettering, no signage copy, no logo.
```

## What is locked

| Element | Locked value |
|---|---|
| Treatment | flat vector, 2D, commercial animation |
| Gradients | subtle, single direction |
| Outlines | minimal, same-hue darker |
| Character ratio | 1:5.5 |
| Depth planes | three |
| Shadow model | one soft direction, low opacity |
| Highlights | restrained, one per major shape |
| Palette | five meelTe brand tokens |
| Detail level | controlled, one focal subject per beat |
| Continuity | character, wardrobe, props, lighting, and geometry stay stable |
| Text | none from the video model |

## What may vary per shot

- Character pose and expression, within the character model.
- The planned action and its start/end state.
- Prop position when moved by the approved action.
- Camera framing and movement when the shot plan calls for it.
- The scene's focal area, while preserving the approved visual hierarchy.

Do not vary character identity, clothing, line weight, light direction, palette,
or environment geometry to make an individual shot easier.

## Drift detection

Compare adjacent shots and rendered keyframes. A mismatch is drift unless
explicitly planned:

1. Character face, proportions, clothing, or hairstyle changed.
2. Outline weight, gradient direction, or shadow direction shifted.
3. Props or background geometry appeared, disappeared, or morphed.
4. Palette gained a non-brand dominant hue.
5. One shot gained photographic depth, texture, or 3D rendering.
6. Screen direction or character position changed without a cut that explains it.

## Versioning

| Lock | Change | Reason |
|---|---|---|
| `meelte-flat-vector-v1` | initial | baseline |
| `meelte-flat-vector-v2` | deliberate approved evolution only | record reason and date |

Existing campaign assets keep their original lock ID. Never mix two locks in
one campaign video unless the creative explicitly calls for a transition.

## Reuse pattern

For each shot in a video:

1. Paste the canonical block unchanged.
2. Add the shot's subject action, start/end state, and camera instruction.
3. Add only continuity details that differ from the prior shot by design.
4. Add the target format and safe-area constraints from
   `advertising-layout-composition`.
5. Add concise video-specific negatives.
6. Record the lock ID in the prompt package.

## Failure signals

- Character identity changes between cuts.
- Background or props flicker or morph.
- A character moves without a clear action or end state.
- Texture, grain, or photorealistic lighting creeps in.
- A shot's palette or silhouette no longer matches the rest of the video.
