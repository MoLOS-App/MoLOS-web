---
title: Module Management TUI
sidebar_position: 1
---

# Module Management TUI

The Module Management TUI is a terminal dashboard for running module workflows without bouncing between scripts, editors, and terminals. It lives in `MoLOS/module-management/tui/`.

## Launch

Run it from the MoLOS repo root:

```bash
npm run module:tui
```

## What You See

- **Submodules**: merged view of modules from the filesystem and the database, with status tags.
- **General Scripts**: common workflows and any `package.json` scripts in the MoLOS repo.
- **Module Actions**: actions scoped to the selected module.
- **Logs / Output**: command output, diagnostics, and workflow hints.
- **DB Explorer**: table list with row counts, plus a quick SQL prompt.

## Screenshots

### Overview layout

The full TUI layout with modules, actions, logs, and DB explorer in view.

![Module TUI overview](/img/tui/layout.png)

### Module list and status

Submodules list with status tags and source badges.

![Module list and manager](/img/tui/module_manager.png)

### Module actions

Actions available for the MoLOS app.

![Module actions panel](/img/tui/actions.png)

### DB explorer

Table list with row counts and quick SQL access.

![DB explorer and SQL prompt](/img/tui/database.png)

### Logs

Command output and diagnostics in the log panel.

![Logs fullscreen view](/img/tui/logs.png)

## Key Features

- **New module wizard**: scaffold a module from the sample without leaving the TUI.
- **Repo cloning**: clone a module repo straight into `external_modules/`.
- **One-tap workflows**: sync modules, run the dev server, or fire any npm script.
- **Module controls**: open the module in your editor, toggle enable/disable, validate, test, or mark it for deletion.
- **DB insights**: scan table counts and run ad-hoc SQL queries for quick sanity checks.
- **Live logs**: see command output in one place, with a fullscreen toggle for deep dives.

## Benefits

- **Faster module loops**: create, validate, and test without context switching.
- **Safer ops**: toggle or delete modules with visibility into status and structure.
- **Clearer diagnosis**: logs, workflow hints, and DB checks live together.
- **Less manual wiring**: scripts and module actions are wired into a single interface.

## Shortcuts

- `tab` / `shift+tab`: cycle focus between panels
- `enter`: run the selected action
- `r`: re-run the selected action in the focused list
- `n`: new module wizard
- `c`: clone module repo
- `y`: sync modules
- `d`: run dev server
- `v`: validate selected module
- `t`: test selected module
- `o`: open selected module in editor
- `m`: open MoLOS root in editor
- `k`: stop the running process
- `f`: toggle logs fullscreen
- `x`: delete selected module (in Submodules panel)
- `s`: SQL prompt (in DB Explorer)
- `q`: quit

## Notes

- Editor commands use `VISUAL` or `EDITOR` when set; otherwise the TUI will prompt.
- SQL results are shown in the logs, with large result sets truncated for readability.
