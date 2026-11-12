# Meelte Video and Creative Skills

Reusable skill modules for the Meelte video-prompt workflow in
[`pipeline.md`](../../pipeline.md). Each skill is discovered by its folder and
contains its own procedure, output contract, checklist, and failure cases.

## Core workflow skills

| Skill | Owns | Output |
|---|---|---|
| [`meelte-brand-system`](meelte-brand-system/SKILL.md) | Brand palette, typography, tone, logo, and constraints | `brand_constraints` |
| [`marketing-creative-strategy`](marketing-creative-strategy/SKILL.md) | Audience insight, message, copy, and claims | `campaign_message` |
| [`advertising-layout-composition`](advertising-layout-composition/SKILL.md) | Video framing, social ratios, safe areas, shot composition | `video_composition` |
| [`flat-vector-illustration`](flat-vector-illustration/SKILL.md) | Illustrated character/prop design, motion bounds, continuity | `illustration_spec` |
| [`video-prompt-engineering`](video-prompt-engineering/SKILL.md) | Time-aware provider-neutral prompt, negatives, model notes | `VideoPromptPackage` |
| [`video-quality-review`](video-quality-review/SKILL.md) | Prompt QA; rendered-video QA only when a real asset exists | `QualityReview` |
| [`campaign-series-consistency`](campaign-series-consistency/SKILL.md) | Shared style and controlled variation across a video series | `series` |

Image-only prompt authoring, image quality review, and image asset finishing
skills have been removed. Do not treat the legacy image-specific OpenCode agent
files as video-capable.

## Optional post-production skills

Use only when a rendered asset exists or the user explicitly requests
post-production. They are not required to create a prompt package.

| Skill | Owns |
|---|---|
| [`remotion-motion-graphics`](remotion-motion-graphics/SKILL.md) | Programmatic motion graphics and composition |
| [`caption-animation`](caption-animation/SKILL.md) | Word-level animated captions and safe placement |
| [`ffmpeg-captions-subtitles`](ffmpeg-captions-subtitles/SKILL.md) | Subtitle conversion and burn-in |
| [`sound-design-film`](sound-design-film/SKILL.md) | SFX, music, voice, and audio layering |
| [`video-editing`](video-editing/SKILL.md) | Assembly, cuts, reframing, and muxing |

`find-skills` is a general discovery helper, not part of the Meelte workflow.

## Shared configuration

`brand/meelte-brand.json` is the source of truth for brand rules and existing
format targets. Skills read it; do not copy palette values into prompt
templates. Provider constraints belong in a named model adapter or documented
assumption, never in the provider-neutral creative contract.

## Workflow

```
VideoBrief
  -> meelte-brand-system             (constraints and conflicts)
  -> marketing-creative-strategy     (message and approved copy)
  -> video director / shot plan      (timing, action, camera, continuity)
  -> advertising-layout-composition  (platform-specific video composition)
  -> flat-vector-illustration        (visual and motion continuity)
  -> video-prompt-engineering        (provider-neutral prompt)
  -> video-quality-review            (prompt gate)
  -> optional provider generation    (only when configured and requested)
  -> optional post-production        (only with a rendered asset)
```

Video director and provider roles are workflow responsibilities; an
OpenCode agent is not implemented merely because the role appears in this map.

## Adding a skill

1. Create `.agents/skills/<kebab-case-name>/SKILL.md`.
2. Add frontmatter with `name` and a trigger-oriented `description`.
3. Include purpose, inputs, procedure, output contract, checklist, examples,
   constraints, and failure cases.
4. Put detailed references in `references/` and deterministic tooling in
   `scripts/`.
5. Add the skill to the appropriate table above.

Do not create empty skill folders or claim a skill exists before its files are
present.
