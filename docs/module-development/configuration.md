---
title: Configuration
sidebar_position: 7
---

# Module Configuration

**Location**: `src/lib/config/modules/{module-name}/config.ts`

Register your module and its navigation structure within the MoLOS ecosystem.

## Configuration Example

```typescript
import { LayoutDashboard, Settings, ListTodo } from 'lucide-svelte';
import type { ModuleConfig } from '../types';

export const myModuleConfig: ModuleConfig = {
	name: 'My Module',
	id: 'mymodule',
	icon: ListTodo,
	color: '#4CAF50',
	navigation: [
		{
			id: 'dashboard',
			title: 'Dashboard',
			href: '/ui/mymodule/dashboard',
			icon: LayoutDashboard
		},
		{
			id: 'settings',
			title: 'Settings',
			href: '/ui/mymodule/settings',
			icon: Settings
		}
	]
};
```

## Registration

Add your configuration to the central registry in `src/lib/config/modules/index.ts`:

```typescript
import { myModuleConfig } from './mymodule/config';

export const modules = [
	// ... other modules
	myModuleConfig
];
```

## Key Rules
- **Unique ID**: Ensure the `id` is unique across all modules.
- **Icons**: Use Lucide-Svelte icons for consistency.
- **Type Safety**: Always implement the `ModuleConfig` interface.
