# meelTe Video Prompt Generation — Gemini CLI Guide

Read this file before working on the meelTe video-prompt workflow.

## Project goal

Turn a meelTe marketing request into a structured video concept, time-coded
shot plan, and brand-safe, provider-neutral text-to-video prompt package. The
default deliverable is the prompt package, not a rendered video.

Canonical workflow: [`pipeline.md`](./pipeline.md). Full requirements:
[`req.txt`](./req.txt). OpenCode-specific guidance:
[`AGENTS.md`](./AGENTS.md).

## Repository map

```
pipeline.md               canonical host-agnostic video prompt workflow
req.txt                   project scope, contracts, and acceptance criteria
AGENTS.md                 OpenCode-specific video workflow and agent status
GEMINI.md                 this Gemini CLI guide
opencode.jsonc            OpenCode project configuration
brand/meelte-brand.json   single source of truth for meelTe brand rules
.agents/skills/           reusable creative, video prompt, and QA skills
.opencode/agents/         existing OpenCode agents; currently image-specific
outputs/<request_id>/     prompt packages and, only if actually generated, video assets
```

## Brand rules

Read `brand/meelte-brand.json` for every request. It is the only source of
truth for palette, typography, logo, copy limits, and visual direction. Do not
rely on copied values or memory.

- Keep orange and purple as the dominant brand pair.
- Preserve the approved playful 2D vector style by default, with clear,
  purposeful motion and visual continuity across shots.
- Use only exact user-supplied campaign copy. Prefer deterministic overlays
  for exact text; never ask a video model to invent or approximate the logo.
- Use a supplied approved logo asset, or reserve its zone and mark it
  `logo pending`.
- Do not add unsupported prices, offers, dates, statistics, guarantees,
  testimonials, or product capabilities.

## Workflow

Follow [`pipeline.md`](./pipeline.md) top to bottom:

1. Normalize the request into a `VideoBrief`; state defaults.
2. Read the brand source and flag conflicts.
3. Develop the campaign message, unless approved copy was supplied.
4. Plan the story as time-coded shots with actions, camera, and continuity.
5. Write the provider-neutral video prompt package.
6. Run prompt QA, then route any issues to their owner.
7. Return or save the prompt package with its version and assumptions.
8. Generate and review a video only when the user requested it and an
   authorized video tool is actually available.

The pipeline defaults to short-form vertical social, 15 seconds, and 9:16
when the user does not specify otherwise. Treat duration, resolution, frame
rate, audio support, and other model limits as targets until a selected
provider confirms them. Ask at most one clarification question, and only when
the answer materially changes the creative.

Every prompt must describe ordered actions over time. Ensure shot durations
sum to the requested duration, keep each shot's action and camera direction
coherent, and preserve character, wardrobe, props, setting, and screen
direction across cuts.

## Skills

Load only the skills needed for the request.

| Skill | Use for |
|---|---|
| `meelte-brand-system` | Palette, typography, logo, tone, brand constraints |
| `marketing-creative-strategy` | Audience insight, message, copy, claims |
| `flat-vector-illustration` | meelTe illustration style and character direction |
| `advertising-layout-composition` | Framing, aspect ratio, safe areas |
| `video-prompt-engineering` | Time-coded video prompt, motion, continuity, model adaptation |
| `video-quality-review` | Prompt review; rendered-video review only with a real asset |
| `campaign-series-consistency` | Visual continuity across campaign videos |

Use post-production skills such as Remotion, caption animation, audio design,
and FFmpeg only when the user asks for post-production or provides an actual
rendered asset. They are not required to author a prompt package.

## OpenCode status

The current files in `.opencode/agents/` still contain image-specific
instructions. The `image-generator` is not a video provider, and those agents
must not be described as a working video-generation implementation. For a
video request, follow `pipeline.md` and use the video-specific skills; do not
route the request through image-only generation or finishing steps.

The image-only `image-prompt-engineering`, `image-quality-review`, and
`image-asset-finishing` skills were removed. Some legacy OpenCode agent files
still reference them; do not use those image agents until their prompts and
handoffs have been migrated.

No video provider adapter is configured. If no authorized video tool is
available, return the prompt package and state plainly that no video was
rendered. Never fabricate a generation result, asset path, or QA pass.

## Hard rules

- Never invent campaign facts or alter approved copy silently.
- Never fabricate, trace, or generate the meelTe logo.
- Never describe a prompt package as a rendered or brand-approved video.
- Keep provider-specific assumptions separate from the approved creative.
- Preserve prompt versions and revisions; do not overwrite prior outputs.
- Keep credentials in secure environment configuration. Never hardcode or log
  secrets.

## Revision routing

| Issue | Owner |
|---|---|
| Message, headline, CTA, or claim | Campaign strategist |
| Palette, logo, tone, or brand constraint | Brand guardian |
| Story, timing, action, camera, or continuity | Video director |
| Prompt wording, negatives, or model notes | Video prompt engineer |
| Rendered artefact, captions, audio, or export | Video QA / post-production owner |

These are workflow responsibilities; do not assume a matching OpenCode agent
exists until its implementation and handoffs are updated.
