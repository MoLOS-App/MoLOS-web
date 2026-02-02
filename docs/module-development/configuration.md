---
title: Configuration
sidebar_position: 7
---

# Module Configuration

**Location**: `config.ts` and `manifest.yaml` in your module repo.

External modules are discovered automatically from `external_modules/`, so you do not edit the core registry.

## manifest.yaml

The manifest file contains core module metadata:

```yaml
# Module identity used by the core app and module manager.
id: "MoLOS-Example"
name: "MoLOS Example Module"
version: "1.0.0"
description: "A sample MoLOS module"
author: "Module Developer"
# Icon name must exist in lucide-svelte
icon: "Box"
```

## config.ts

The config file defines the module's navigation and routing:

```typescript
/**
 * Example Module Configuration
 * Defines routes, navigation items, and metadata for the Example module
 *
 * Keep the `id` and `href` aligned with `manifest.yaml` and the UI base route.
 */

import { Box, Settings, LayoutDashboard } from "lucide-svelte";
import type { ModuleConfig } from "$lib/config/types";

export const exampleConfig: ModuleConfig = {
  id: "MoLOS-Example",
  name: "Example Module",
  href: "/ui/MoLOS-Example",
  icon: Box,
  description: "Short module description",
  navigation: [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/ui/MoLOS-Example/dashboard",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/ui/MoLOS-Example/settings",
    },
  ],
};

export const moduleConfig = exampleConfig;
export default exampleConfig;
```

## Key Rules

- **Unique ID**: Ensure the `id` is unique across all modules and matches between `manifest.yaml` and `config.ts`.
- **Icons**: Import icons individually from `lucide-svelte` and use them in both `icon` and `navigation` items.
- **Type Safety**: Always implement the `ModuleConfig` interface.
- **Href Consistency**: The `href` must match the UI base route `/ui/<ModuleId>`.
- **Manifest Alignment**: The `id` in `manifest.yaml` must exactly match the `id` in `config.ts`.
