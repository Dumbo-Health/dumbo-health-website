# dev-theo — Claude Instructions

## Branch Rule

**Always work from the `dev-theo` branch.**

At the start of every session in this directory, verify the current branch is `dev-theo`. If it is not, switch to it before doing anything else:

```bash
git checkout dev-theo
```

All commits, edits, and pushes must target the `dev-theo` branch — never `dev`, `main`, or any other branch unless explicitly instructed.

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
