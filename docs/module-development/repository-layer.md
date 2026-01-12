---
title: Repository Layer
sidebar_position: 4
---

# Repository Layer

**Location**: `lib/repositories/` (inside your module repo)

The repository layer abstracts data access, providing a clean interface for interacting with the database.

## Implementation Example

```typescript
import { db } from '$lib/server/db';
import { myModuleTable } from '$lib/server/db/schema/external_modules/MoLOS-Example/tables';
import { and, eq } from 'drizzle-orm';
import type { MyItem, CreateItemInput, UpdateItemInput } from '$lib/models/external_modules/MoLOS-Example';

export class MyRepository {
	async getById(id: string, userId: string): Promise<MyItem | undefined> {
		return db
			.select()
			.from(myModuleTable)
			.where(and(eq(myModuleTable.id, id), eq(myModuleTable.userId, userId)))
			.get();
	}

	async getByUserId(userId: string): Promise<MyItem[]> {
		return db.select().from(myModuleTable).where(eq(myModuleTable.userId, userId)).all();
	}

	async create(data: CreateItemInput): Promise<MyItem> {
		const [newItem] = await db.insert(myModuleTable).values(data).returning();
		return newItem;
	}

	async update(id: string, data: UpdateItemInput): Promise<MyItem | undefined> {
		const [updated] = await db.update(myModuleTable)
			.set(data)
			.where(eq(myModuleTable.id, id))
			.returning();
		return updated;
	}

	async delete(id: string, userId: string): Promise<void> {
		await db
			.delete(myModuleTable)
			.where(and(eq(myModuleTable.id, id), eq(myModuleTable.userId, userId)));
	}
}
```

## Core Principles
- **CRUD Operations**: Provide standard methods for Create, Read, Update, and Delete.
- **Complex Queries**: Implement joins and aggregations here, not in the API or UI.
- **Type Safety**: Leverage the models defined in the previous step.
- **User Isolation**: Scope queries to `userId`.
