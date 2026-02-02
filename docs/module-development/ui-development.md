---
title: UI Development
sidebar_position: 6
---

# UI Development

UI development in MoLOS uses Svelte 5 with runes and server-side data loading.

## Server-Side Data Loading (`+layout.server.ts`)

Load data on the server for optimal performance:

```typescript
import type { LayoutServerLoad } from "./$types";
import { MyRepository } from "$lib/repositories/external_modules/MoLOS-Example";

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.user) {
    return { items: [] };
  }

  try {
    const repo = new MyRepository();
    const items = await repo.getByUserId(locals.user.id);
    return { items };
  } catch (error) {
    console.error("Error loading items:", error);
    return { items: [] };
  }
};
```

## Client Pages with Svelte 5 Runes

Use Svelte 5 runes syntax in your pages:

```svelte
<script lang="ts">
	import type { PageData } from './$types';
	import { hydrateMyModuleData } from '$lib/stores/external_modules/MoLOS-Example';
	let { data }: { data: PageData } = $props();

	// Hydrate store with server-loaded data
	hydrateMyModuleData(data.items);
</script>

<div class="dashboard">
	<h1>Dashboard</h1>

	<div class="items-list">
		{#each data.items as item}
			<div class="item-card">
				<h3>{item.name}</h3>
				<p>{item.description || 'No description'}</p>
				<span class="status">{item.status}</span>
			</div>
		{/each}
		{#if data.items.length === 0}
			<p>No items yet. Create your first one!</p>
		{/if}
	</div>
</div>

<style>
	.dashboard {
		max-width: 1200px;
		margin: 0 auto;
	}

	.items-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1rem;
		margin-top: 1.5rem;
	}

	.item-card {
		padding: 1rem;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		background: white;
	}
</style>
```

## State Management (Stores)

**Location**: `lib/stores/`

Use Svelte stores to manage global module state and data fetching.

```typescript
import { writable, derived } from "svelte/store";

export const items = writable([]);
export const uiState = writable({ loading: false, error: null });

// Hydrate store with server-loaded data
export function hydrateMyModuleData(data) {
  items.set(data);
  uiState.update((s) => ({ ...s, loading: false, error: null }));
}

// Client-side data loading (when needed)
export async function loadData() {
  uiState.update((s) => ({ ...s, loading: true, error: null }));
  try {
    const response = await fetch("/api/MoLOS-Example");
    const data = await response.json();
    items.set(data);
  } catch (err) {
    uiState.update((s) => ({ ...s, error: err.message }));
  } finally {
    uiState.update((s) => ({ ...s, loading: false }));
  }
}
```

## Components

**Location**: `lib/components/`

Build reusable UI pieces using Svelte 5 syntax:

```svelte
<script lang="ts">
	let { item } = $props();
</script>

<div class="p-4 border rounded-lg">
	<h3 class="font-bold">{item.title}</h3>
	<p>{item.description}</p>
</div>
```

## Routes & Layouts

**Location**: `routes/ui/`

- **`+layout.svelte`**: Defines the module shell with navigation.
- **`+layout.server.ts`**: Loads data on the server for all child routes.
- **`dashboard/+page.svelte`**: The primary view for the module.
- **`+page.svelte`**: Root route, shows main content.

## Module Layout

The layout file provides navigation for your module:

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { moduleConfig } from '../../config';
</script>

<div class="module-container">
	<header>
		<h1>{moduleConfig.name}</h1>
		<nav>
			{#each moduleConfig.navigation as item}
				<a href={item.href} class:active={$page.url.pathname === item.href}>
					<svelte:component this={item.icon} />
					<span>{item.name}</span>
				</a>
			{/each}
		</nav>
	</header>

	<main>
		<slot />
	</main>
</div>
```
