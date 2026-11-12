# Skill audit against `req.txt`

Request: prune `.agents/skills/` to the capabilities `req.txt` actually requires.
Date: 2026-11-12. Author: orchestrator. Status: **awaiting execution** (no shell in this session).

> **Superseded.** The table below is revision 1. Captions, sound effects,
> animation and motion graphics are now in scope, which voids rows 16–20 and
> moves `remotion-motion-graphics` into the post layer. **§Revision 4 at the
> end of this file is the current decision.** Rows 1–9 still hold.

## Authority

- `req.txt` §6 lists the **seven required reusable capabilities**.
- `req.txt` §1 puts this out of scope: "Implementing a video provider, rendering service, editor, or asset store."
- `req.txt` §11 says do not "Add a video provider or editor without explicit scope and credentials."
- `req.txt` §4G/H: a provider adapter is optional and "not required for prompt-package delivery"; the deliverable is a prompt package, not a rendered video.

That makes every skill whose job is *editing or rendering media on disk* out of scope, regardless of how useful it is for a later production phase.

## Result

20 skill folders → **9 kept, 11 removed**.

| # | Skill | Verdict | Basis |
|---|---|---|---|
| 1 | `meelte-brand-system` | KEEP | req §6.1 |
| 2 | `marketing-creative-strategy` | KEEP | req §6.2 |
| 3 | `flat-vector-illustration` | KEEP | req §6.3 (needs motion adaptation) |
| 4 | `advertising-layout-composition` | KEEP | req §6.4 |
| 5 | `campaign-series-consistency` | KEEP | req §6.7 |
| 6 | `image-prompt-engineering` | KEEP, rename later | Current stand-in for `video-prompt-engineering` (req §6.5, §6 note: video skills "may be added as part of a later implementation") |
| 7 | `image-quality-review` | KEEP, rename later | Current stand-in for `video-quality-review` (req §6.6) |
| 8 | `image-asset-finishing` | KEEP | Referenced by `.opencode/agents/finalizer.md` line 48 (`scripts/finish.ps1`); covers deterministic overlay/naming/metadata duties in req §2 and §4H. Image-specific — flag for a video variant later. |
| 9 | `find-skills` | KEEP | Meta/discovery tool, not a campaign capability. Never auto-loads into a Meelte stage, so it cannot inject brand or claim risk. Remove only for a strictly Meelte-only tree. |
| 10 | `ai-engineer` | REMOVE | LLM/RAG/embeddings/agent-flow engineering. Not in §6; no agent loads it. |
| 11 | `backend-engineer` | REMOVE | Server/API logic. Not in §6. |
| 12 | `auto-editor` | REMOVE | Media editing CLI. Out of scope per §1 "editor" and §11. |
| 13 | `auto-editor-transcribe` | REMOVE | Transcription/cutting. Out of scope. |
| 14 | `video-editing` | REMOVE | Footage editing via FFmpeg/Remotion. Out of scope. |
| 15 | `remotion-motion-graphics` | REMOVE | React video rendering. Out of scope per §1 "rendering service". |
| 16 | `caption-animation` | REMOVE | Burn-in animated captions on rendered video. Out of scope; req relies on deterministic overlays in §2. |
| 17 | `ffmpeg-captions-subtitles` | REMOVE | Subtitle burn-in/tracks. Out of scope. |
| 18 | `ffmpeg-video-editor` | REMOVE | FFmpeg edit command generation. Out of scope. |
| 19 | `sound-design-film` | REMOVE | Sound design for finished cuts. req carries audio only as `audio_direction` / `audio_plan` text, and never renders it. |
| 20 | `audio-mixing-mastering` | REMOVE | Loudness/true-peak/stems for delivered audio. `audio_review` in req §7E is optional and about the plan, not a mix. |

## Dependency check

None of the 11 removals is referenced by:

- `.opencode/agents/*.md` (only `image-asset-finishing` is, line 48 of `finalizer.md`)
- `pipeline.md` (no matches)
- `GEMINI.md` (no matches)
- `opencode.jsonc` (skills are discovered by folder, no registry)
- `.agents/skills/README.md` (its table lists only the 8 hand-authored Meelte skills + a `find-skills` note)

Two inert leftovers do reference them: `.agents/agents/ai-engineer.md` and `.agents/agents/video-engineer.md`. Per `AGENTS.md`, `.agents/agents/` is **not** an OpenCode discovery path, so those files are dead weight — `video-engineer.md` even points at a `code-review-graph` skill that does not exist. Recommended follow-up cleanup, outside this request's scope.

## Gaps this audit does not fix

`req.txt` §6.5 and §6.6 need `video-prompt-engineering` and `video-quality-review`. **Neither exists.** `image-prompt-engineering` and `image-quality-review` are image-shaped: single frame, no shot timings, no camera moves, no temporal coherence. Removing the media-editing skills does not close that gap — authoring the two video skills is the next real piece of work, and per §6 no prompt may claim they exist until their files do.

## Reversal

The folders are git-tracked. Any removal is undone with:

```powershell
git checkout HEAD -- .agents/skills/<skill-name>
```

---

# Revision 4 — current decision (includes agents)

Scope as of this revision: prompt-to-video **with captions, sound effects,
animation and motion graphics**, some videos motion-heavy.

## Skills — 16 keep, 4 remove

| Keep (9, documented in `GEMINI.md` line 20 and `skills/README.md`) | Hold (7, post layer) | Remove (4) |
|---|---|---|
| `meelte-brand-system` | `auto-editor-transcribe` | `ai-engineer` |
| `marketing-creative-strategy` | `caption-animation` | `backend-engineer` |
| `flat-vector-illustration` | `ffmpeg-captions-subtitles` | `auto-editor` |
| `advertising-layout-composition` | `remotion-motion-graphics` | `ffmpeg-video-editor` |
| `campaign-series-consistency` | `sound-design-film` | |
| `image-prompt-engineering` | `audio-mixing-mastering` | |
| `image-quality-review` | `video-editing` | |
| `image-asset-finishing` | | |
| `find-skills` | | |

Removal rationale for the four:

- `ai-engineer`, `backend-engineer` — LLM/RAG and server-side concerns; not in
  `req.txt` §6, loaded by no agent in `.opencode/agents/`.
- `auto-editor` — cuts silence and dead space out of **recorded** footage.
  Prompt-to-video produces no footage.
- `ffmpeg-video-editor` — concat/scale/trim/extract. Fully covered by
  `video-editing`, which is staying.

Note that `GEMINI.md` line 20 and `skills/README.md` both document exactly 9
skills. The 7 HOLD folders are undocumented, which is why they were safe to
delete in revision 1 — and why they need adding to both docs now that the
scope needs them.

## Agents — 1 remove, 1 hold, 8 untouched

`.agents/agents/` is Antigravity-format (`mainAgent`/`subagent`/`model`/
`skills`), not OpenCode format. `AGENTS.md` calls it "inert" and neither
`AGENTS.md`, `GEMINI.md`, nor `opencode.jsonc` documents it as an entry point.
It holds 10 files: 8 duplicates of the live `.opencode/agents/` roster, plus 2
with no live counterpart.

| File | Verdict | Why |
|---|---|---|
| `ai-engineer.md` | **remove** | LLM/speech-to-text/EditPlan pipeline. Wrong discipline, and it loads `ai-engineer` + `auto-editor`, both being removed. |
| `video-engineer.md` | **hold, do not delete** | Relevant — it is the only description of the FFmpeg filtergraph, ASS caption burn-in, `-16 LUFS` normalisation and sidechain ducking layer that this project now needs. But it is inert (wrong format), absent from the roster, and loads a `code-review-graph` skill that does not exist. Port it to `.opencode/agents/video-engineer.md` in OpenCode frontmatter, then remove the original. |
| the other 8 | untouched | Mirror the live roster exactly. Harmless duplicates. Whether `.agents/agents/` should exist at all is a repo-owner decision, not a cleanup. |

## Why this is a script and not a commit

No shell is available in this session — not as the orchestrator, and the tool
catalog has no filesystem or command runner. `write` and `edit` can create and
modify files but cannot unlink a directory. So the deletions are staged in
`remove-irrelevant-skills.ps1` (revision 4), dry-run by default, git-backed so
every removal reverses with `git checkout HEAD -- <path>`.

## Reversal

```powershell
git checkout HEAD -- .agents/skills/<skill-name>
git checkout HEAD -- .agents/agents/<agent-file>
```

