---
title: UI Development
sidebar_position: 6
---

# UI Development

UI development in MoLOS involves Svelte components, SvelteKit routes, and reactive state management.

## 1. State Management (Stores)
**Location**: `src/lib/stores/modules/{module-name}/index.ts`

Use Svelte stores to manage global module state and data fetching.

```typescript
import { writable } from 'svelte/store';

export const items = writable([]);
export const uiState = writable({ loading: false, error: null });

export async function loadData() {
	uiState.update(s => ({ ...s, loading: true, error: null }));
	try {
		const response = await fetch('/api/mymodule');
		const data = await response.json();
		items.set(data);
	} catch (err) {
		uiState.update(s => ({ ...s, error: err.message }));
	} finally {
		uiState.update(s => ({ ...s, loading: false }));
	}
}
```

## 2. Components
**Location**: `src/lib/components/modules/{module-name}/`

Build reusable UI pieces using Svelte and Tailwind CSS.

```svelte
<script lang="ts">
	let { item } = $props();
</script>

<div class="p-4 border rounded-lg">
	<h3 class="font-bold">{item.title}</h3>
	<p>{item.description}</p>
</div>
```

## 3. Routes & Layouts
**Location**: `src/routes/ui/(modules)/{module-name}/`

- **`+layout.svelte`**: Defines the module's shell (sidebar, header).
- **`dashboard/+page.svelte`**: The primary view for the module.
- **`+page.svelte`**: Root route, typically performs a `goto('/ui/mymodule/dashboard')`.
