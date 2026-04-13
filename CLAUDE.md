# website — Claude Instructions

## Project

This directory (`/home/dumbo/DumboHealth/dev-sergio`) is a worktree of the **DumboHealth Website** repository (`dumbo-health-website`). It is **not** the app project.

- **Repo**: `Dumbo-Health/dumbo-health-website`
- **Stack**: Next.js 16 App Router, Tailwind CSS v4, Framer Motion, shadcn/ui, pnpm
- **Dev server**: http://localhost:3002

## Branch Rule

**Always work from the `dev` branch.**

At the start of every session in this directory, verify the current branch is `dev`. If it is not, switch to it before doing anything else:

```bash
git checkout dev
```

All commits, edits, and pushes must target the `dev` branch — never `main` or any other branch unless explicitly instructed.

## Merge Flow

```
dev-theo  ──┐
dev-sergio ─┼──► dev ──► main
dev-rohan  ──┘
```

- Each developer works on their own branch (`dev-theo`, `dev-sergio`, `dev-rohan`)
- Finished work is merged into `dev` first
- `dev` is merged into `main` for production deploys
- **Never merge directly to `main` from a personal branch**

## Folder → Branch Map

| Folder | Branch |
|--------|--------|
| `dev-theo/` | `dev-theo` |
| `dev-sergio/` | `dev-sergio` |
| `dev-rohan/` | `dev-rohan` |

Each Claude session must verify it is on the correct branch for its folder before doing any work.
