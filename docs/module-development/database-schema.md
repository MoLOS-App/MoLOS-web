---
title: Database Schema
sidebar_position: 2
---

# Database Schema Setup

**Location**: `lib/server/db/schema/tables.ts` (inside your module repo)

Define tables with `sqliteTable` and prefix every table with `<ModuleId>_`. Place SQL migrations in `drizzle/`.

## Example Implementation

```typescript
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { textEnum } from '$lib/server/db/utils';

export const myModuleTable = sqliteTable('MoLOS-Example_items', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	userId: text('user_id').notNull(),
	title: text('title').notNull(),
	description: text('description'),
	status: textEnum('status', MyStatusEnum).notNull().default('pending'),
	createdAt: integer('created_at')
		.notNull()
		.default(sql`(strftime('%s','now'))`),
	updatedAt: integer('updated_at')
		.notNull()
		.default(sql`(strftime('%s','now'))`)
});
```

## Key Rules

- **Primary Keys**: Always use UUIDs via `text('id').primaryKey().$defaultFn(() => crypto.randomUUID())`.
- **User Isolation**: Every table includes `userId: text('user_id').notNull()`.
- **Timestamps**: Use unix seconds for `createdAt` and `updatedAt`.
- **Enums**: Use `textEnum('column_name', YourEnum)` for fixed values.
- **Foreign Keys**: Use `.references(() => otherTable.id, { onDelete: 'cascade' })`.
