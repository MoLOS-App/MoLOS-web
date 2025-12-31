---
title: Database Schema
sidebar_position: 2
---

# Database Schema Setup

**Location**: `src/lib/server/db/schema/{module-name}/tables.ts`

Define your tables using `sqliteTable` from `drizzle-orm/sqlite-core`. Follow the `module_entity` naming convention.

## Example Implementation

```typescript
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';
import { textEnum } from '../../utils';

export const myModuleTable = sqliteTable('mymodule_items', {
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
- **User Isolation**: Every table must include a `userId: text('user_id').notNull()` field to link to `auth-schema`.
- **Timestamps**: Use Unix timestamps (integers) for `createdAt` and `updatedAt` with `default(sql`(strftime('%s','now'))`)`.
- **Enums**: Use `textEnum('column_name', YourEnum)` for fixed string values.
- **Foreign Keys**: Define using `.references(() => otherTable.id, { onDelete: 'cascade' })`.
