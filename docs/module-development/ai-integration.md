---
title: AI Integration
sidebar_position: 10
---

# AI Tools Integration

External modules can provide AI tools for the Architect Agent.

## Define AI Tools

**Location**: `lib/server/ai/ai-tools.ts`

Export `getAiTools(userId)` and return `ToolDefinition[]`.

```typescript
import { TaskRepository } from "$lib/repositories/external_modules/MoLOS-Tasks/task-repository";
import type { ToolDefinition } from "$lib/models/external_modules/MoLOS-Tasks";
import { db } from "$lib/server/db";

export function getAiTools(userId: string): ToolDefinition[] {
  const repo = new TaskRepository(db as any);

  return [
    {
      name: "get_tasks",
      description: "Retrieve tasks for the current user.",
      parameters: {
        type: "object",
        properties: { limit: { type: "number", default: 10 } },
      },
      execute: async (params) => repo.getByUserId(userId, params.limit),
    },
  ];
}
```

## How MoLOS Loads Tools

- Tools are discovered from `lib/server/ai/ai-tools.ts` in external modules.
- Tool names are automatically prefixed with `<ModuleId>_`.

## Key Rules

1. **Naming**: Use `snake_case` for tool names (e.g., `create_task`).
2. **Descriptions**: Keep them short and unambiguous.
3. **User Isolation**: Always scope calls to `userId`.
4. **Safety**: Return enough data for the agent to explain outcomes.
