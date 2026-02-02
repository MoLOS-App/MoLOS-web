---
title: Database Schema
sidebar_position: 2
---

# Database Schema Setup

**Location**: `lib/server/db/schema/tables.ts` (inside your module repo)

Define tables with `sqliteTable` and prefix every table with `<ModuleId>_`. Place SQL migrations in `drizzle/`.

## Example Implementation

```typescript
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { textEnum } from "$lib/server/db/utils";
import { ItemStatus } from "$lib/models/external_modules/MoLOS-Example";

/**
 * Example module table schema.
 * Keep table names prefixed by the module ID (hyphen or underscore).
 * All timestamps are unix seconds for consistency across modules.
 */

export const exampleItems = sqliteTable("MoLOS-Example_items", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: textEnum("status", ItemStatus).notNull().default("pending"),
  createdAt: integer("created_at")
    .notNull()
    .default(sql`(strftime('%s','now'))`),
  updatedAt: integer("updated_at")
    .notNull()
    .default(sql`(strftime('%s','now'))`),
});

/**
 * Export the enum for use in the repository
 */
export { ItemStatus };
```

## drizzle.config.ts

Configure Drizzle Kit to point to your schema and database:

```typescript
import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/server/db/schema/tables.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: "../.db/data.db",
  },
} satisfies Config;
```

## Key Rules

- **Primary Keys**: Always use UUIDs via `text('id').primaryKey().$defaultFn(() => crypto.randomUUID())`.
- **User Isolation**: Every table includes `userId: text('user_id').notNull()`.
- **Timestamps**: Use unix seconds for `createdAt` and `updatedAt`.
- **Table Prefix**: Use the module ID as prefix (e.g., `MoLOS-Example_items`).
- **Enums**: Define enums in your models file and use `textEnum('column_name', YourEnum)`.
- **Foreign Keys**: Use `.references(() => otherTable.id, { onDelete: 'cascade' })` for relations.

## Generating Migrations

```bash
# Generate migration from schema changes
npm run db:generate

# Push schema directly to database (development only)
npm run db:push

# Open Drizzle Studio to inspect data
npm run db:studio
```
