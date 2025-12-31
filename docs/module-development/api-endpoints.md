---
title: API Endpoints
sidebar_position: 5
---

# API Endpoints

**Location**: `src/routes/api/{module-name}/`

API endpoints handle incoming requests, interact with the repository layer, and return JSON responses.

## Standard CRUD Endpoint (`+server.ts`)

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { MyRepository } from '$lib/repositories/mymodule/myRepository';

const repo = new MyRepository();

export const GET: RequestHandler = async ({ url }) => {
	const userId = url.searchParams.get('userId');
	if (!userId) return json({ message: 'User ID required' }, { status: 400 });
	
	const items = await repo.getByUserId(userId);
	return json(items);
};

export const POST: RequestHandler = async ({ request }) => {
	const data = await request.json();
	const newItem = await repo.create(data);
	return json(newItem, { status: 201 });
};
```

## Key Patterns
- **Authentication**: Always verify the user's identity before performing operations.
- **Validation**: Validate incoming JSON payloads against your TypeScript models.
- **Error Handling**: Return appropriate HTTP status codes (400 for bad requests, 404 for not found, 500 for server errors).
- **Separation of Concerns**: Keep API logic focused on request/response handling; delegate business logic to repositories.
