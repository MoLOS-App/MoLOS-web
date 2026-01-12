---
title: AI Module Guidelines
sidebar_position: 9
---

# AI Module Guidelines

Use this when an AI (or you) is generating a new MoLOS module.

## Required Inputs

- Module ID (repo folder name, manifest `id`, config `id`).
- Module name, description, and Lucide icon.
- Entities + required routes.
- AI tools needed (yes/no).

## Rules

- **ID consistency**: repo folder name = manifest `id` = config `id` = DB prefix.
- **Routes**: `/ui/<ModuleId>` and `/api/<ModuleId>`.
- **Tables**: prefix every table with `<ModuleId>_`.
- **Auth**: use `locals.user?.id` in API handlers.
- **User isolation**: scope every query by `userId`.
- **Imports**: use `$lib/.../external_modules/<ModuleId>` for module-local imports.

## Output Checklist

- `manifest.yaml` (semver, icon, author).
- `config.ts` (exports `moduleConfig` + `default`).
- `lib/server/db/schema/tables.ts` + migrations.
- `lib/models/index.ts`.
- `lib/repositories/*`.
- `routes/api/*` with zod validation.
- `routes/ui/*` Svelte pages.
- Optional: `lib/server/ai/ai-tools.ts`.
