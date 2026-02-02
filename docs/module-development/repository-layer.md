---
title: Repository Layer
sidebar_position: 4
---

# Repository Layer

**Location**: `lib/repositories/` (inside your module repo)

The repository layer abstracts data access, providing a clean interface for interacting with the database.

## Base Repository

All repositories should extend the `BaseRepository` class:

```typescript
import { db as defaultDb } from "../../../../../src/lib/server/db";
import type { BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

export abstract class BaseRepository {
  protected db: BetterSQLite3Database<any>;

  constructor(db?: BetterSQLite3Database<any>) {
    this.db = (db as BetterSQLite3Database<any>) || defaultDb;
  }
}
```

## Implementation Example

```typescript
import { eq, and } from "drizzle-orm";
import { myModuleTable } from "$lib/server/db/schema/tables";
import { BaseRepository } from "./base-repository";
import type {
  MyItem,
  CreateItemInput,
  UpdateItemInput,
} from "$lib/models/external_modules/MoLOS-Example";

export class MyRepository extends BaseRepository {
  async getByUserId(userId: string, limit = 50): Promise<MyItem[]> {
    const rows = await this.db
      .select()
      .from(myModuleTable)
      .eq(myModuleTable.userId, userId)
      .limit(limit);

    return rows.map((row) => this.mapToEntity(row));
  }

  async getById(id: string, userId: string): Promise<MyItem | null> {
    const [row] = await this.db
      .select()
      .from(myModuleTable)
      .where(and(eq(myModuleTable.id, id), eq(myModuleTable.userId, userId)));

    return row ? this.mapToEntity(row) : null;
  }

  async create(input: CreateItemInput, userId: string): Promise<MyItem> {
    const [row] = await this.db
      .insert(myModuleTable)
      .values({
        id: crypto.randomUUID(),
        userId,
        ...input,
      })
      .returning();

    return this.mapToEntity(row);
  }

  async update(
    id: string,
    userId: string,
    input: UpdateItemInput,
  ): Promise<MyItem | null> {
    const [row] = await this.db
      .update(myModuleTable)
      .set(input)
      .where(and(eq(myModuleTable.id, id), eq(myModuleTable.userId, userId)))
      .returning();

    return row ? this.mapToEntity(row) : null;
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const result = await this.db
      .delete(myModuleTable)
      .where(and(eq(myModuleTable.id, id), eq(myModuleTable.userId, userId)));

    return result.changes > 0;
  }

  private mapToEntity(row: Record<string, unknown>): MyItem {
    return {
      id: row.id as string,
      userId: row.user_id as string,
      name: row.name as string,
      description: row.description as string | undefined,
      status: row.status as MyItem["status"],
      createdAt: row.created_at as number,
      updatedAt: row.updated_at as number,
    };
  }
}
```

## Core Principles

- **CRUD Operations**: Provide standard methods for Create, Read, Update, and Delete.
- **Complex Queries**: Implement joins and aggregations here, not in the API or UI.
- **Type Safety**: Leverage the models defined in the previous step.
- **User Isolation**: Scope queries to `userId`.
- **Field Mapping**: Use `mapToEntity` to convert snake_case DB columns to camelCase TypeScript interfaces.
