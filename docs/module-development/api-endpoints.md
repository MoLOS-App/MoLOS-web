---
title: API Endpoints
sidebar_position: 5
---

# API Endpoints

**Location**: `routes/api/` (inside your module repo)

API endpoints handle requests, call repositories, and return JSON. The base path is `/api/<ModuleId>`.

## Standard CRUD Endpoint (`+server.ts`)

```typescript
import { json, error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { z } from "zod";
import { MyRepository } from "$lib/repositories/external_modules/MoLOS-Example/my-repository";
import { db } from "$lib/server/db";

const repo = new MyRepository(db);
const CreateItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
});

export const GET: RequestHandler = async ({ locals }) => {
  const userId = locals.user?.id;
  if (!userId) throw error(401, "Unauthorized");

  const items = await repo.getByUserId(userId);
  return json(items);
};

export const POST: RequestHandler = async ({ locals, request }) => {
  const userId = locals.user?.id;
  if (!userId) throw error(401, "Unauthorized");

  const data = CreateItemSchema.parse(await request.json());
  const newItem = await repo.create({ ...data, userId });
  return json(newItem, { status: 201 });
};

export const PUT: RequestHandler = async ({ locals, request }) => {
  const userId = locals.user?.id;
  if (!userId) throw error(401, "Unauthorized");

  const { id, ...updates } = await request.json();
  const item = await repo.update(id, userId, updates);

  if (!item) {
    throw error(404, "Item not found");
  }

  return json(item);
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
  const userId = locals.user?.id;
  if (!userId) throw error(401, "Unauthorized");

  const { id } = await request.json();
  const deleted = await repo.delete(id, userId);

  if (!deleted) {
    throw error(404, "Item not found");
  }

  return json({ success: true });
};
```

## Key Patterns

- **Authentication**: Always verify the user via `locals.user?.id` and use `throw error()` for failures.
- **Validation**: Validate payloads with zod schemas.
- **Error Handling**: Use `throw error()` from `@sveltejs/kit` for consistent HTTP error responses.
- **Separation of Concerns**: Keep API logic thin; push business logic into repositories.
- **Response Format**: Return data directly (not wrapped in `{ data: ... }`) for consistency.
