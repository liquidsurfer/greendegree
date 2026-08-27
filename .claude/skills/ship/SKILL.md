---
name: ship
description: Take a finished feature branch from committed to live — build check, push, PR, merge gate, Cloudflare Pages deploy verification, and worktree cleanup. Invoke when work on a branch is done and ready to go out.
tools: Bash, Read, AskUserQuestion
---

# Ship

Drives a finished branch through the last mile. Runs in phases; **stop and report at the first failure** rather than pushing past it.

The user may name a worktree/branch. If not, use the current one.

## Phase 1 — Preflight

```bash
git branch --show-current          # must NOT be main
git status --short                 # must be clean
```

- **On `main`** → stop. `CLAUDE.md` forbids working there; there is nothing to ship.
- **Dirty tree** → stop and show the files. Never commit on the user's behalf here; they may be mid-thought.
  - Exception: an untracked `node_modules` **symlink** in a worktree is expected (see Phase 5) — ignore it.
- **Build must pass:**
  ```bash
  bun run build
  ```
  Astro fails on missing/orphaned image imports, so this is the real gate. If it fails, stop and show the error.

## Phase 2 — Push

```bash
git log origin/<branch>..HEAD --oneline    # anything unpushed?
git push -u origin <branch>
```

Skip the push if already up to date. Report the commits going out.

## Phase 3 — Open the PR

```bash
gh pr list --state all --head <branch>     # don't double-open
gh pr create --fill
```

If a PR already exists, report its URL and state instead of creating one.

Prefer `--fill` — the commit messages in this repo are written to carry the
reasoning. Only hand-write a body when a branch has many small commits whose
messages don't add up to a coherent summary.

Report the PR URL.

## Phase 4 — Checks, then the merge gate

```bash
gh pr checks <url> --watch
```

The relevant check is **`Cloudflare Pages`** — a preview deploy built by
Cloudflare's GitHub integration. There are no GitHub Actions workflows in this
repo, so that check-run is the whole signal.

Then **stop and ask** with AskUserQuestion before merging.

`CLAUDE.md` says the user merges. Do not merge unprompted, even with green
checks — the branch may be waiting on their review, on a stakeholder, or on
copy they still want to change. Present: PR URL, check status, commits, and
ask whether to merge or hold.

If — and only if — they authorise it, match the repo's existing style: history
shows merge commits (`Merge feature/donate-fail-state`), so use `--merge` rather
than `--squash` unless the user asks otherwise.

```bash
gh pr merge <url> --merge --delete-branch
```

## Phase 5 — Deploy verification

Only after a merge. A merged PR is **not** a live site.

```bash
git fetch origin main
gh api repos/liquidsurfer/greendegree/commits/main/check-runs \
  --jq '.check_runs[] | "\(.name) — \(.status) \(.conclusion // "")"'
```

Poll until `Cloudflare Pages` reaches a conclusion. Report `success` before
calling anything live; on `failure`, surface it and stop.

**Do not reach for the Cloudflare MCP or `wrangler`.** Wrangler credentials are
expired and the MCP is Workers-only — this site is Pages. `gh` check-runs are
the working path.

Optionally confirm the real thing responds:

```bash
curl -s -o /dev/null -w "%{http_code}" https://greendegree.org/
```

## Phase 6 — Housekeeping

Only once the work is merged **or** the user says they're done with the worktree.
Never tear down a worktree holding unpushed commits.

```bash
pkill -f "astro dev"                       # stop any dev server
rm -f <worktree>/node_modules              # the symlink from Phase 1
git worktree remove <worktree>
git worktree list                          # confirm only the main checkout
```

- `git worktree remove` **without** `--force`. If it refuses, something is
  unsaved — report it, don't force past it.
- Verify `git log origin/<branch>..HEAD` is empty before removing.

## Report

State plainly, and don't overstate:

- Commits pushed (hashes + paths)
- PR URL and whether *you* opened it
- Merge state — **merged, or waiting on the user**
- Deploy state — **live and verified, or not yet deployed**
- Cleanup done

A pushed branch is not a PR; a merged PR is not a deploy. Say which step the
work actually reached.

## Known wrinkle

`.gitignore` has `node_modules/` with a trailing slash, which matches
directories but not symlinks — so a worktree's `node_modules` symlink shows as
untracked. Harmless, but never `git add -A` in a worktree. Dropping the slash
would fix it permanently; alternatively run `bun install` in the worktree
instead of symlinking.
