---
title: LLM Instructions
sidebar_position: 8
---

# LLM Instructions (External Modules)

This page mirrors the exact `llm.txt` that AI agents must follow. [Download the file here](/llm.txt).

```
MoLOS External Module LLM Instructions (No Ambiguity)

Scope: Create a NEW external module or EXTEND an existing external module that works inside MoLOS.
Target workspace: Your local MoLOS workspace root
MoLOS main repo: <workspace>/MoLOS

Available Technologies (use only these):
- Language: TypeScript
- UI: Svelte + SvelteKit
- DB: SQLite
- ORM: Drizzle ORM
- Validation: Zod
- Icons: lucide-svelte
- Runtime: Node.js 20+
- Build tooling: Vite (via SvelteKit)

Required Workflow (do not reorder):
1) Create a new git repository for the module.
2) Clone the MoLOS main repo.
3) Clone the new module into: MoLOS/external_modules/<ModuleId>
4) Open editor at MoLOS repo root.
5) Use MoLOS-Sample-Module or another working module as boilerplate.
6) Copy the boilerplate code into the new module git path.
7) Run: npm run dev (from MoLOS root).
8) Start developing the module.

Alternate Workflow (extending an existing module):
1) Clone the MoLOS main repo.
2) Ensure the existing module repo is under: MoLOS/external_modules/<ModuleId>
3) Open editor at MoLOS repo root.
4) Run: npm run dev (from MoLOS root).
5) Modify the existing module in place.

Absolute Rules (non-negotiable):
- Module ID must be identical in ALL locations:
  - Repo folder name
  - manifest.yaml id
  - config.ts id
  - DB table prefixes
- All tables are prefixed with <ModuleId>_ (example: MoLOS-Tasks_tasks).
- API routes must use locals.user?.id for auth.
- All database queries must be scoped by userId.
- All module-local imports inside MoLOS use:
  $lib/.../external_modules/<ModuleId>
- UI base path: /ui/<ModuleId>
- API base path: /api/<ModuleId>
- Timestamps are unix seconds (number).
- No cross-module writes or schema edits.
- Do not use absolute filesystem paths in code or docs.
- Do not bypass repositories from routes or UI.
- All UI/server pages (+page.svelte, +page.server.ts, +layout.server.ts) must call the module API and never call repositories directly.
- When extending a module, never rename module ID or existing table prefixes.
- When extending a module, add new migrations instead of editing old ones.

Required Files and Paths (in the module repo):
1) manifest.yaml
2) config.ts
3) package.json
4) lib/models/index.ts
5) lib/repositories/*.ts
6) lib/server/db/schema/tables.ts
7) routes/api/+server.ts (and subroutes as needed)
8) routes/ui/+page.svelte (and subroutes as needed)
9) drizzle/<migration>.sql (must match schema)
10) README.md (short, direct)

Module Skeleton (expected layout):
<ModuleId>/
  manifest.yaml
  config.ts
  package.json
  README.md
  lib/
    models/
      index.ts
    repositories/
      base-repository.ts
      <entity>-repository.ts
    stores/
      index.ts
    components/
      <component>.svelte
    server/
      ai/
        ai-tools.ts           (optional)
      db/
        schema/
          tables.ts
  routes/
    api/
      +server.ts
      <entity>/
        +server.ts
    ui/
      +layout.svelte
      +layout.server.ts
      +page.svelte
      dashboard/
        +page.svelte
  drizzle/
    0001_init.sql

Exact manifest.yaml template (replace values):
id: "<ModuleId>"
name: "<Module Name>"
version: "0.1.0"
description: "<Short description>"
author: "<Author>"
icon: "<LucideIconName>"

Exact config.ts template (replace values):
import { LayoutDashboard } from "lucide-svelte";
import type { ModuleConfig } from "$lib/config/types";

export const moduleConfig: ModuleConfig = {
  id: "<ModuleId>",
  name: "<Module Name>",
  href: "/ui/<ModuleId>",
  icon: LayoutDashboard,
  description: "<Short description>",
  navigation: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/ui/<ModuleId>/dashboard",
    },
  ],
};

export default moduleConfig;

DB Schema Rules (lib/server/db/schema/tables.ts):
- Use sqliteTable from drizzle-orm/sqlite-core.
- Table names MUST be "<ModuleId>_<entity>".
- Include createdAt and updatedAt.
- Include userId where data is user-specific.
- Use $lib/server/db/utils textEnum for enums.
- Keep schema in sync with drizzle SQL migrations.
- Do not use camelCase in DB column names (use snake_case).

Minimal DB schema example:
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const myEntity = sqliteTable("<ModuleId>_items", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  createdAt: integer("created_at").notNull().default(sql`(strftime('%s','now'))`),
  updatedAt: integer("updated_at").notNull().default(sql`(strftime('%s','now'))`),
});

Models (lib/models/index.ts):
- Define interfaces mirroring DB schema.
- Include Create/Update types with Omit/Partial.
- Export enums or string unions used by repositories/routes.

Repository Rules (lib/repositories):
- All reads and writes require userId filtering.
- Use BaseRepository pattern like MoLOS-Tasks.
- No direct database use in routes or UI.
- Repository methods must accept userId for any user-scoped entity.

Repository skeleton:
import { and, eq } from "drizzle-orm";
import { myEntity } from "$lib/server/db/schema/external_modules/<ModuleId>/tables";
import type { MyEntity, CreateMyEntityInput } from "$lib/models/external_modules/<ModuleId>";
import { BaseRepository } from "./base-repository";

export class MyEntityRepository extends BaseRepository {
  async getByUserId(userId: string): Promise<MyEntity[]> {
    return await this.db.select().from(myEntity).where(eq(myEntity.userId, userId));
  }

  async getById(id: string, userId: string): Promise<MyEntity | null> {
    const result = await this.db
      .select()
      .from(myEntity)
      .where(and(eq(myEntity.id, id), eq(myEntity.userId, userId)))
      .limit(1);
    return result[0] ?? null;
  }

  async create(data: CreateMyEntityInput): Promise<MyEntity> {
    const result = await this.db.insert(myEntity).values(data).returning();
    return result[0] as MyEntity;
  }
}

API Routes (routes/api):
- Use SvelteKit RequestHandler.
- Use locals.user?.id for auth.
- Validate JSON with zod.
- Return proper status codes.
- Never accept userId from request body or query.

API skeleton:
import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import { MyEntityRepository } from "$lib/repositories/external_modules/<ModuleId>/my-entity-repository";
import { db } from "$lib/server/db";

const CreateSchema = z.object({
  title: z.string().min(1),
});

export const GET: RequestHandler = async ({ locals }) => {
  const userId = locals.user?.id;
  if (!userId) throw error(401, "Unauthorized");
  const repo = new MyEntityRepository(db);
  return json(await repo.getByUserId(userId));
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const userId = locals.user?.id;
  if (!userId) throw error(401, "Unauthorized");
  const data = CreateSchema.parse(await request.json());
  const repo = new MyEntityRepository(db);
  return json(await repo.create({ ...data, userId }), { status: 201 });
};

UI Routes (routes/ui):
- Use +page.svelte for the module root.
- Use dashboard/+page.svelte as main view.
- Use /ui/<ModuleId>/... paths.
- If you redirect from +page.svelte, use goto("/ui/<ModuleId>/dashboard").
- Use fetch("/api/<ModuleId>") for API calls.
- Never import repositories in UI or +page.server.ts/+layout.server.ts files.

AI Tools (optional):
- File: lib/server/ai/ai-tools.ts
- Export getAiTools(userId) that returns ToolDefinition[].
- Tools are auto-prefixed by MoLOS with <ModuleId>_.
- Use snake_case tool names.

Final Checklist (required for new or existing modules):
- Module loads with npm run dev.
- /ui/<ModuleId> renders.
- /api/<ModuleId> responds.
- Migrations run without errors.
- No missing imports or path errors.
- All queries are user-scoped.
- No lint/type errors in module files.
- config.ts exports moduleConfig and default.
- manifest.yaml id matches config.ts id and folder name.
- Table names use <ModuleId>_ prefix and snake_case columns.
- If extending, existing routes and features still work.
- All UI/server routes use API calls as the only data source.

Good vs Wrong Examples:

GOOD: IDs and paths
- Repo folder: MoLOS-Notes
- manifest.yaml id: "MoLOS-Notes"
- config.ts id: "MoLOS-Notes"
- Table name: "MoLOS-Notes_notes"
- UI route: /ui/MoLOS-Notes
- API route: /api/MoLOS-Notes

WRONG: ID mismatch
- Repo folder: MoLOS-Notes
- manifest.yaml id: "notes"
- Table name: "notes_items"

GOOD: Auth and user scope
const userId = locals.user?.id;
if (!userId) throw error(401, "Unauthorized");
await repo.getByUserId(userId);

WRONG: Accepting userId from the client
const userId = url.searchParams.get("userId");

GOOD: Imports inside MoLOS
import { notes } from "$lib/server/db/schema/external_modules/MoLOS-Notes/tables";

WRONG: Relative imports from symlinked paths
import { notes } from "../../../lib/server/db/schema/tables";

GOOD: Table prefix
sqliteTable("MoLOS-Notes_notes", { ... })

WRONG: No module prefix
sqliteTable("notes", { ... })

Stop Conditions:
- If a required file is missing, create it before proceeding.
- If module ID mismatch is found, fix ALL mismatches immediately.
- If extending a module and an edit risks breaking current behavior, stop and ask for confirmation.
```
