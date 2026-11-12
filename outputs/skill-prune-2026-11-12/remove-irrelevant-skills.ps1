<#
    remove-irrelevant-skills.ps1   (revision 5 — FINAL — 2026-11-12)

    State: 22 skill folders, 10 inert agent files.
    Target: 16 skill folders, 0 inert agent files.

    Sets:
      KEEP  (11) documented + video workflow backing
      POST   (5) captions / motion / audio / assembly — needed, not yet wired
      REMOVE (6) no role in a prompt-to-video workflow

    Agents: .agents/agents/ is Antigravity-format, inert for OpenCode, and holds
    only stale duplicates (.opencode/agents/ is the live roster). Removed whole.

    Default is a DRY RUN. Pass -Execute to delete.
    Every deletion is `git rm`, reversible with:
        git checkout HEAD -- <path>

    Usage:
        .\remove-irrelevant-skills.ps1
        .\remove-irrelevant-skills.ps1 -Execute
#>
[CmdletBinding()]
param(
    [switch]$Execute
)

$ErrorActionPreference = 'Stop'

# outputs/skill-prune-2026-11-12/remove-irrelevant-skills.ps1 -> repo root
$repoRoot   = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
$skillsRoot = Join-Path $repoRoot '.agents\skills'

$removeSkills = @(
    'ai-engineer'             # LLM/RAG/embeddings — wrong discipline
    'backend-engineer'        # server/API logic — not in the video workflow
    'auto-editor'             # cuts silence from recorded footage; none exists
    'auto-editor-transcribe'  # redundant: caption-animation covers Whisper word timings
    'ffmpeg-video-editor'     # concat/scale/trim — covered by video-editing
    'audio-mixing-mastering'  # mastering stage does not exist until audio is rendered
)

$postSkills = @(
    'caption-animation'
    'ffmpeg-captions-subtitles'
    'remotion-motion-graphics'
    'sound-design-film'
    'video-editing'
)

$keepSkills = @(
    'meelte-brand-system'
    'marketing-creative-strategy'
    'flat-vector-illustration'
    'advertising-layout-composition'
    'campaign-series-consistency'
    'video-prompt-engineering'
    'video-quality-review'
    'image-prompt-engineering'
    'image-quality-review'
    'image-asset-finishing'
    'find-skills'
)

$removeAgentDirs = @('.agents/agents')

$all = @($removeSkills + $postSkills + $keepSkills)
if (($all | Select-Object -Unique).Count -ne $all.Count) {
    throw 'Skill sets overlap.'
}

Write-Host "Repo: $repoRoot"
Write-Host ("Mode: {0}" -f ($(if ($Execute) { 'EXECUTE (deleting)' } else { 'DRY RUN' })))
Write-Host ''

$gitAvailable = $null -ne (Get-Command git -ErrorAction SilentlyContinue)
if (-not $gitAvailable) { throw 'git is required so removals stay reversible.' }

foreach ($n in $postSkills) { Write-Host "  [post]  $n" }
foreach ($n in $keepSkills) { Write-Host "  [keep]  $n" }
Write-Host ''

$targets = @()
foreach ($n in $removeSkills) { $targets += ".agents/skills/$n" }
foreach ($d in $removeAgentDirs) { $targets += $d }

$failed = @()

foreach ($t in $targets) {
    $full = Join-Path $repoRoot ($t -replace '/', '\')
    if (-not (Test-Path -LiteralPath $full)) {
        Write-Host "  [skip]  $t (already absent)"
        continue
    }

    if (-not $Execute) {
        Write-Host "  [would] $t"
        continue
    }

    git -C $repoRoot rm -r -q -- $t 2>&1 | Out-Null
    if ($LASTEXITCODE -ne 0) {
        Write-Warning "git rm failed: $t"
        $failed += $t
    }
    else {
        Write-Host "  [gone]  $t"
    }
}

Write-Host ''
Write-Host '-- verification ------------------------------------------------'

$present = @(Get-ChildItem -LiteralPath $skillsRoot -Directory | Select-Object -ExpandProperty Name)
Write-Host ("Skill folders remaining : {0}  (expected {1})" -f $present.Count, ($keepSkills.Count + $postSkills.Count))

$leftover = @($present | Where-Object { $removeSkills -contains $_ })
if ($leftover.Count -gt 0) { Write-Warning ("Still present: {0}" -f ($leftover -join ', ')) }

$missing = @(@($keepSkills + $postSkills) | Where-Object { $present -notcontains $_ })
if ($missing.Count -gt 0) { Write-Warning ("Unexpectedly missing: {0}" -f ($missing -join ', ')) }

if (Test-Path -LiteralPath (Join-Path $repoRoot '.agents\agents')) {
    if ($Execute) { Write-Warning '.agents/agents still exists.' }
}
else {
    Write-Host 'Inert agent dir        : removed'
}

if ($failed.Count -gt 0) { Write-Warning ("Failed targets: {0}" -f ($failed -join ', ')) }

if (-not $Execute) { Write-Host ''; Write-Host 'Dry run only. Re-run with -Execute.' }
else { Write-Host ''; Write-Host 'Next: git status --short' }
