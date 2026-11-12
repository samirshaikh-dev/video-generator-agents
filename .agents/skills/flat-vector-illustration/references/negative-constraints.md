# Video Negative Constraints — Meelte Illustration

Select a short, brief-specific subset. Do not send the whole list blindly:
overlong negatives can drown out the positive motion and style instructions.

## Style negatives

```
photorealism, live action, 3D render, CGI, clay render, plastic sheen,
stock footage, generic corporate stock, isometric tech illustration,
anime, manga, sketch, pencil drawing, watercolour, low-poly, voxel,
collage, unrelated illustration style
```

## Temporal and continuity negatives

```
character redesign, face morphing, wardrobe changes, prop morphing,
background flicker, palette shift, inconsistent outline weight,
unmotivated movement, jitter, strobing, ghosting, duplicate subjects,
teleporting objects, broken screen direction, unplanned camera shake,
unmotivated cuts, conflicting actions
```

## Rendering negatives

```
texture, grain, noise, halftone, brush strokes, heavy black outlines,
hard-edged shadows, lens flare, bokeh, depth of field, vignette,
chromatic aberration, glow, bloom, bevel, plastic gradients
```

## Character negatives

```
detailed anatomy, individual finger detail, realistic hands, teeth, tongue,
individual eyelashes, skin texture, wrinkles, uncanny face, deformed hands,
extra fingers, merged or floating limbs, duplicate person, distorted proportions
```

## Composition and text negatives

```
cluttered background, too many props, multiple focal points, cramped edges,
cropped head or hands, unwanted text, captions, subtitles, signage copy,
watermark, signature, generated logo
```

Use the no-text and no-logo constraints by default. Exact captions, CTAs, and
the supplied Meelte logo belong in a deterministic overlay or finishing step,
not in the video model prompt.

## Palette negatives

```
teal, cyan, turquoise, mint, red, crimson, neon, fluorescent,
pastel orange, navy, pure black, rainbow gradient, iridescent
```

Only add exclusions that follow from the brief or the brand system.

## Model adaptation

Keep exclusions in a separate negative field only when the selected video
model supports one. Otherwise, state a concise final sentence in the prompt.
Provider syntax and supported controls must be verified for the named model.

## Failure signals

- The clip is static or lifeless: reduce negatives that suppress motion and
  state the intended action positively.
- Characters drift: strengthen the continuity lock and use approved reference
  assets when available.
- The scene flickers: simplify simultaneous movement and background detail.
- Text appears: state no readable text/captions and move copy to overlays.
