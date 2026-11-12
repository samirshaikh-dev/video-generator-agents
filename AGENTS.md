# meelTe Video Prompt Workflow

This file provides OpenCode-specific guidance for the meelTe video-prompt
workflow. The host-agnostic source of truth is [`pipeline.md`](pipeline.md);
the full project requirements are in [`req.txt`](req.txt). If this file and
`pipeline.md` disagree, `pipeline.md` wins.

## Project goal

Turn a meelTe marketing brief into a structured video concept, time-coded shot
plan, and brand-safe text-to-video prompt package. The default deliverable is
the prompt package. Do not imply that a video was rendered unless a real video
provider returned an asset.

## Read first

1. `pipeline.md` — canonical workflow, gates, prompt format, and delivery.
2. `req.txt` — project scope, contracts, roles, and acceptance criteria.
3. `brand/meelte-brand.json` — canonical brand source. Read it; do not rely on
   remembered palette, typography, logo, or claim rules.

## Video workflow

```
request
  → orchestrator normalizes VideoBrief
  → brand and message constraints
  → time-coded story and motion plan
  → provider-neutral video prompt package
  → prompt QA
  → deliver prompt package
  → optional provider generation/review, only when configured and requested
```

For each shot, preserve time arithmetic, one readable primary action, clear
camera direction, and continuity across characters, props, setting, and style.
Use exact user-supplied copy only. Do not ask a video model to invent or
approximate the meelTe logo; reserve a clean area for the supplied asset or
mark it `logo pending`.

## Skills

Load the skills needed for the request; do not read every skill by default.

| Need | Skill |
|---|---|
| Brand, palette, logo, or tone | `.agents/skills/meelte-brand-system/SKILL.md` |
| Campaign message, copy, or claims | `.agents/skills/marketing-creative-strategy/SKILL.md` |
| Illustration style or character continuity | `.agents/skills/flat-vector-illustration/SKILL.md` |
| Framing, aspect ratio, or safe areas | `.agents/skills/advertising-layout-composition/SKILL.md` |
| Time-coded prompt writing or model adaptation | `.agents/skills/video-prompt-engineering/SKILL.md` |
| Prompt or rendered-video review | `.agents/skills/video-quality-review/SKILL.md` |
| Campaign series consistency | `.agents/skills/campaign-series-consistency/SKILL.md` |

Use post-production skills such as Remotion, captions, audio finishing, and
FFmpeg only when the request includes a real rendered asset or explicitly
asks for post-production. They are not required to author a prompt package.

## OpenCode agent roster

The video-specific agents are discovered from `.opencode/agents/`. The
orchestrator coordinates these roles; reusable procedures and detailed output
contracts remain in `.agents/skills/`.

| Role | Owns |
|---|---|
| `orchestrator` | VideoBrief, sequence, consistency, revision routing, delivery |
| `brand-guardian` | Palette, typography, logo, tone, brand conflicts |
| `campaign-strategist` | Audience insight, message, exact copy, claim audit |
| `video-director` | Story, timed shots, composition, camera, continuity |
| `video-prompt-engineer` | Provider-neutral prompt, negatives, model notes, versions |
| `video-prompt-qa` | Prompt review; rendered review only with a real asset |
| `video-generator` | Optional configured provider call; fails honestly when unavailable |
| `finalizer` | QA-gated prompt-package delivery and metadata |

No video provider adapter is configured. The `video-generator` agent must
return an explicit failure if no authorized provider is available; it must
never fabricate a result. The default complete workflow delivers a prompt
package and states that no video was rendered.

## Non-negotiables

- Never invent campaign facts, prices, offers, statistics, deadlines,
  guarantees, testimonials, product capabilities, or dialogue.
- Never silently change approved copy or brand constraints.
- Never fabricate, redraw, or generate the meelTe logo.
- Never present a prompt package as a rendered or brand-approved video.
- Keep provider-specific behavior separate from the approved creative plan.
- Preserve prompt versions and make revisions targeted and bounded.
- Keep secrets in environment variables or secure secret storage; never log
  credentials.

## Revision routing

| Issue | Owner |
|---|---|
| Message, headline, CTA, or claim | `campaign-strategist` |
| Palette, logo, tone, or brand constraint | `brand-guardian` |
| Shot timing, action, camera, or continuity | `video-director` |
| Prompt wording, negatives, or named-model notes | `video-prompt-engineer` |
| Rendered artefact or sync issue | Video generation/post-production owner |

Use these owners for the corresponding specialist handoffs. Rendering and
post-production remain optional and unavailable until an authorized provider
or tool is configured.

## Adding or migrating an OpenCode agent

1. Add or update `.opencode/agents/<kebab-case>.md`.
2. Set its description, mode, permissions, role, inputs, output contract, and
   failure behavior.
3. Load reusable detail from `.agents/skills/`; do not duplicate skill content.
4. Update the orchestrator's allowed subagents and the roster here.
5. Test the handoff against `pipeline.md` and `req.txt` before calling the
   agent video-capable.
