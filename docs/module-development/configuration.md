---
title: Configuration
sidebar_position: 7
---

# Module Configuration

**Location**: `config.ts` and `manifest.yaml` in your module repo.

External modules are discovered automatically from `external_modules/`, so you do not edit the core registry.

## Configuration Example

```typescript
import { LayoutDashboard, Settings, ListTodo } from 'lucide-svelte';
import type { ModuleConfig } from '$lib/config/types';

export const myModuleConfig: ModuleConfig = {
	name: 'My Module',
	id: 'MoLOS-Example',
	href: '/ui/MoLOS-Example',
	icon: ListTodo,
	description: 'Short module description',
	navigation: [
		{
			name: 'Dashboard',
			href: '/ui/MoLOS-Example/dashboard',
			icon: LayoutDashboard
		},
		{
			name: 'Settings',
			href: '/ui/MoLOS-Example/settings',
			icon: Settings
		}
	]
};

export const moduleConfig = myModuleConfig;
export default myModuleConfig;
```

## Key Rules
- **Unique ID**: Ensure the `id` is unique across all modules.
- **Icons**: Use Lucide-Svelte icons for consistency.
- **Type Safety**: Always implement the `ModuleConfig` interface.
- **Manifest**: `manifest.yaml` must match the module ID and include semver.
