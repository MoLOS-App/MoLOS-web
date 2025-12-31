---
title: AI Integration
sidebar_position: 8
---

# AI Tools Integration

MoLOS modules can provide custom tools that the **Architect Agent** uses to interact with module data.

## 1. Define AI Tools
**Location**: `src/lib/ai/modules/{module}/ai-tools.ts`

Create a function that returns an array of `ToolDefinition` objects.

```typescript
import { MyRepository } from '../../../repositories/mymodule/myRepository';
import type { ToolDefinition } from '$lib/models/ai';

export function getModuleAiTools(userId: string): ToolDefinition[] {
	const repo = new MyRepository();

	return [
		{
			name: 'get_my_items',
			description: 'Retrieve items for the current user.',
			parameters: {
				type: 'object',
				properties: {
					limit: { type: 'number', default: 10 }
				}
			},
			execute: async (params) => {
				return await repo.getByUserId(userId, params.limit);
			}
		}
	];
}
```

## 2. Register Tools
In your `config.ts`, add the `getAiTools` property:

```typescript
import { getModuleAiTools } from '../../../ai/modules/mymodule/ai-tools';

export const myModuleConfig: ModuleConfig = {
	id: 'mymodule',
	// ... other config
	getAiTools: getModuleAiTools
};
```

## Key Rules
1. **Naming**: Use `snake_case` for tool names (e.g., `create_task`).
2. **Descriptions**: Provide clear, concise descriptions for the LLM.
3. **User Isolation**: Always use the provided `userId` in repository calls.
4. **Safety**: Ensure tools return enough information for the agent to explain the result.
