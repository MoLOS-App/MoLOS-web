---
title: Module Development
sidebar_position: 1
---

# Module Development Guide

This guide covers external modules that live as separate git repos under `MoLOS/external_modules/`.

## Required Workflow

1. Create a new git repo.
2. Clone the MoLOS main repo.
3. Clone the new module into `MoLOS/external_modules/<ModuleId>`.
4. Open your editor at the MoLOS root.
5. Use `MoLOS-Sample-Module` or another working module as boilerplate.
6. Copy the boilerplate into the new module git path.
7. Run `npm run dev`.
8. Start developing new modules.

## Development Map

1.  **[Database Schema](./database-schema)**: Define tables and migrations.
2.  **[TypeScript Models](./typescript-models)**: Create type-safe interfaces and inputs.
3.  **[Repository Layer](./repository-layer)**: Implement data access logic.
4.  **[API Endpoints](./api-endpoints)**: Build SvelteKit server routes.
5.  **[UI Development](./ui-development)**: Create routes, components, and stores.
6.  **[Module Configuration](./configuration)**: Manifest + navigation config.
7.  **[LLM Instructions](./llm-instructions)**: Exact rules and templates for AI agents.
8.  **[AI Module Guidelines](./ai-module-guidelines)**: Rules for AI-assisted module creation.
9.  **[AI Integration](./ai-integration)**: Optional AI tools for the Architect Agent.
