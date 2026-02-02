---
title: Module Development
sidebar_position: 1
---

# Module Development Guide

This guide covers external modules that live as separate git repos under `MoLOS/external_modules/`.

## Quick Start with CLI

The fastest way to create a new module is using the built-in CLI:

```bash
# From the MoLOS root directory
npm run module:create my-module --name "My Module" --author "Your Name" --description "My module description"

# Or with all defaults
npm run module:create my-module
```

This will create a complete module scaffold at `external_modules/my-module` with all necessary files and folders.

## Manual Workflow

If you prefer to start from the sample module manually:

1. Create a new git repo.
2. Clone the MoLOS main repo.
3. Clone `MoLOS-Sample-Module` or another working module as boilerplate.
4. Copy the boilerplate into `MoLOS/external_modules/<ModuleId>`.
5. Run `npm run modules:sync` to create symlinks and run migrations.
6. Run `npm run dev`.
7. Start developing your module.

## Development Map

1.  **[Database Schema](./database-schema)**: Define tables and migrations.
2.  **[TypeScript Models](./typescript-models)**: Create type-safe interfaces and inputs.
3.  **[Repository Layer](./repository-layer)**: Implement data access logic.
4.  **[API Endpoints](./api-endpoints)**: Build SvelteKit server routes.
5.  **[UI Development](./ui-development)**: Create routes, components, and stores.
6.  **[Module Configuration](./configuration)**: Manifest + navigation config.
7.  **[AI Integration](./ai-integration)**: Optional AI tools for the Architect Agent.
