import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Quick Start',
      collapsible: true,
      collapsed: false,
      items: [
        'getting-started/index',
        'getting-started/quick-start',
        'getting-started/core-modules',
        'getting-started/faq',
        'getting-started/the-architect',
        'getting-started/migration-guides',
      ],
    },
    {
      type: 'category',
      label: 'For Developers',
      collapsible: true,
      collapsed: true,
          items: [
            'module-development/index',
            'module-development/database-schema',
            'module-development/typescript-models',
            'module-development/repository-layer',
            'module-development/api-endpoints',
            'module-development/ui-development',
            'module-development/configuration',
            'module-development/llm-instructions',
            'module-development/ai-integration',
          ],
    },
    {
      type: 'category',
      label: 'Modules',
      collapsible: true,
      collapsed: true,
      items: [
        'modules/index',
        'modules/finance',
        'modules/goals',
        'modules/health',
        'modules/meals',
        'modules/tasks',
      ],
    },
    {
      type: 'category',
      label: 'Community & Contributing',
      collapsible: true,
      collapsed: true,
      items: [
        'community/index',
        'community/contributing',
        'community/governance',
        'community/code-of-conduct',
        'community/testimonials',
      ],
    },
  ],
};

export default sidebars;
