---
name: worktree-status
description: List all active git worktrees for this project, their branches, and whether they have uncommitted changes. Invoke at the start of any task to understand what's already in flight before creating a new worktree.
tools: Bash
user-invocable: false
---

# Worktree Status

Run the following and present the output clearly:

```bash
git worktree list --porcelain
```

For each worktree, show:
- **Path** (shortened relative to the parent directory)
- **Branch**
- **Dirty?** — run `git -C <path> status --short` and report "clean" or list changed files

Then advise whether a new worktree is safe to create or whether related work is already in progress on an existing branch.
