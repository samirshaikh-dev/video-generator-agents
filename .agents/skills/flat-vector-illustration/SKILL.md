---
name: flat-vector-illustration
description: Define meelTe's polished 2D flat-vector look for illustrated social videos. Use for character and prop design, animated poses, motion limits, visual continuity, scene depth, and style drift across shots or versions for LinkedIn and Instagram. Does not own story timing, framing, copy, or final video prompting.
---

# Flat Vector Illustration for Video

## Purpose

Define how characters, props, and environments look and move in an illustrated
video. Preserve meelTe's recognizable 2D commercial vector style from the first
frame to the last. This skill owns the visual treatment and continuity, not the
story, layout, or final text-to-video prompt.

Use it when:

- Planning an illustrated social video or a sequence of animated shots.
- Defining characters, expressions, poses, props, and environments.
- Preventing character or style drift between shots, generations, or formats.
- Fixing output that looks photographic, 3D, over-detailed, or visually noisy.

Not for: story beats and timing (`video director`), composition and platform
safe areas (`advertising-layout-composition`), message and copy
(`marketing-creative-strategy`), or prompt assembly
(`video-prompt-engineering`).

## Inputs

| Input | Required | Notes |
|---|---|---|
| Approved visual concept and shot plan | yes | Do not invent story beats |
| Brand constraints | yes | Read `brand/meelte-brand.json` |
| Target format | yes | LinkedIn or Instagram placement and aspect ratio |
| Character or style references | no | Use only supplied or approved assets |
| Existing campaign lock | no | Reuse its style-lock ID and character rules |
| Style override | no | Explicit user request, recorded in the brief |

## Procedure

1. **Set the visual treatment.** Default to polished 2D commercial vector
   illustration: flat shapes, subtle brand-token gradients, minimal outlines,
   restrained highlights, and soft single-direction shadows. Read the
   `flat-vector` style lock before writing a prompt.
2. **Choose a social-video detail budget.**
   - `simple`: one or two characters, one action, a small prop cluster, and a
     minimal background. Default for 9:16 and 4:5.
   - `standard`: up to three characters, a readable environment, and three to
     five purposeful props. Use for 16:9 or when the story needs the setting.
   - `rich`: layered detail only when the brief requires it; do not use as a
     default for feed or short-form video.
3. **Lock character identities.** For every recurring character, define role,
   age band, build, face vocabulary, skin/hair treatment, clothing, silhouette,
   and stable identifiers. Use `references/character-design.md`. Keep these
   details identical across shots unless a planned story change is approved.
4. **Design each pose for animation.** Define a clear start pose, one primary
   action, and a readable end pose. Use simple silhouettes and uncomplicated
   hands. Avoid rapid hand-object exchanges, interlocked fingers, and motion
   that hides the campaign's focal object.
5. **Layer the environment.** Use up to three readable depth planes:
   foreground, subject/midground, and background. Assign every prop a story
   job; do not add decorative filler.
6. **Set motion bounds.** State which elements move, how far, in which
   direction, and which remain fixed. Favor gentle, motivated movement,
   anticipation, and settle. Keep no more than two competing moving elements
   in a beat; avoid uncontrolled morphing, jitter, and unnecessary camera
   motion.
7. **Lock rendering and palette.** Fix outline logic, gradient direction,
   shadow direction, highlight restraint, edge quality, and palette tokens.
   Use `references/negative-constraints.md` for concise, video-relevant
   exclusions.
8. **Maintain one focal subject per beat.** Concentrate contrast and detail
   there; ensure the focal subject remains readable at mobile display size.
9. **Check temporal continuity.** Compare adjacent shots for character
   identity, props, wardrobe, environment, palette, screen direction, and
   lighting. Route story changes to the video director rather than hiding them
   as style changes.

## Output contract

```json
{
  "illustration_spec": {
    "treatment": "polished 2D commercial vector illustration",
    "detail_budget": "simple",
    "style_lock_id": "meelte-flat-vector-v1",
    "palette_tokens": ["orange", "purple", "lavender", "charcoal", "white"],
    "characters": [
      {
        "id": "shopkeeper",
        "role": "local shopkeeper",
        "stable_identifiers": ["purple kurta", "rounded oval face", "short swept hair"],
        "pose_start": "standing behind the counter, hands beside a package",
        "action": "slides the package forward with both hands",
        "pose_end": "hands rest on the counter; warm smile",
        "expression": "warm, simplified, engaged",
        "motion_bounds": "small arm movement; face and proportions remain stable"
      }
    ],
    "environment": {
      "foreground": "counter edge and package",
      "midground": "shopkeeper and customer",
      "background": "lavender field with simplified shelf silhouettes",
      "depth_planes": 3
    },
    "props": [
      { "item": "package", "story_job": "the focal object passed to the customer" }
    ],
    "rendering": {
      "outlines": "minimal, consistent weight, darker related brand token",
      "gradients": "subtle, single direction, between approved brand tokens",
      "shadows": "soft and consistent in direction",
      "edges": "clean vector shapes; no texture or grain"
    },
    "motion_direction": {
      "moving_elements": ["shopkeeper's hands", "package"],
      "held_elements": ["character identity", "wardrobe", "counter", "shelves"],
      "motion_quality": "gentle, readable, motivated, settles at the end"
    },
    "focal_subject": "package passing between the shopkeeper and customer",
    "negative_constraints": [
      "photorealism", "3D render", "clay render", "stock footage",
      "character redesign", "morphing faces", "jitter", "extra limbs",
      "busy background", "competing focal points", "unapproved colours"
    ]
  }
}
```

## Quality checklist

- [ ] Style lock and brand tokens are applied consistently across the whole clip.
- [ ] Each character has stable identifiers and readable poses.
- [ ] Each beat has one clear primary action and a readable end state.
- [ ] Motion bounds distinguish moving elements from elements that must hold.
- [ ] Hands, faces, silhouettes, and focal props remain simple and legible.
- [ ] Environment and prop detail fit the social-video format.
- [ ] No character, prop, wardrobe, palette, or screen-direction drift between
      adjacent shots unless it is planned.
- [ ] Negative constraints target likely video artifacts without overwhelming
      the positive direction.

## meelTe example

Brief: 15-second illustrated Instagram Reel; a shopkeeper prepares an order and
hands it to a customer; no dialogue or offer.

- Use the `simple` detail budget and the approved 2D vector style lock.
- Keep the same shopkeeper, purple kurta, counter, package, and shelf shapes in
  every beat.
- Beat 1: the shopkeeper checks the package; beat 2: slides it forward; beat 3:
  the customer receives it. Give the package a clear start and end position.
- Allow the hands and package to move; hold facial proportions, clothing, and
  background geometry stable.
- Make the package handoff the focal action. Do not add a phone or signage
  unless the brief gives it a job.

## Constraints and failure cases

**Never:**

- Default to photorealism, 3D, clay, or unrelated illustration styles.
- Change a character's identity between shots.
- Add texture, grain, halftone, or uncontrolled gradients.
- Use complex hand choreography or several competing actions in one beat.
- Add props, dialogue, signage, or product capabilities not in the brief.
- Use style changes to disguise a story or continuity problem.

| Failure | Response |
|---|---|
| Character changes face, clothing, or proportions | Reassert the character lock and approved reference in every relevant shot |
| Limbs or props morph during movement | Simplify the pose and path; reduce simultaneous motion |
| Background drifts or flickers | Hold its geometry and palette; move only the story-relevant layer |
| Scene is too busy on mobile | Reduce the detail budget and remove props without a story job |
| Character reads as a stereotype | Redesign from the audience context; remove occupational shorthand |
| Style drifts between campaign videos | Restore the approved style-lock ID and compare references |

## Sources

Style-lock and drift-control concepts adapted from
`omer-metin/skills-for-antigravity@art-consistency`. Brand treatment derives
from `brand/meelte-brand.json` and `req.txt` §2.
