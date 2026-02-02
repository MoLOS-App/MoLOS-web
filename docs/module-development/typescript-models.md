---
title: TypeScript Models
sidebar_position: 3
---

# TypeScript Models

**Location**: `lib/models/index.ts` (inside your module repo)

Define interfaces that mirror your database schema and create input types for mutations.

## Interface Definitions

Each major entity should have a corresponding TypeScript interface.

```typescript
export interface MyItem {
  id: string;
  userId: string;
  title: string;
  description?: string;
  status: MyStatus;
  createdAt: number; // Unix timestamp
  updatedAt: number; // Unix timestamp
}
```

## Type Aliases & Input Types

Use `Omit` and `Partial` to create type-safe inputs for creation and updates.

```typescript
export type MyStatus = "pending" | "active" | "completed";

export type CreateItemInput = Omit<MyItem, "id" | "createdAt" | "updatedAt">;
export type UpdateItemInput = Partial<Omit<CreateItemInput, "userId">>;
```

## Best Practices

- **Consistency**: Field names and types must match the database schema exactly.
- **Enums**: Define enums as `(typeof Enum)[keyof typeof Enum]`.
- **Timestamps**: Always include `createdAt` and `updatedAt` as `number`.
