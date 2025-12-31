import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MoLOS',
  tagline: 'The Local-First, AI-Native Modular Life Organization System',
  favicon: 'img/brand/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://molos.dev',
  baseUrl: '/',

  organizationName: 'eduardez',
  projectName: 'MoLOS',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/MoLOS-App/MoLOS/tree/main/docs/',
        },
        blog: {
          showReadingTime: true,
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/brand/logo_text_FHD.png',
    metadata: [
      {name: 'keywords', content: 'local-first, ai-native, productivity, modular, self-hosted, sveltekit, life-management'},
      {name: 'twitter:card', content: 'summary_large_image'},
    ],
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'MoLOS',
      hideOnScroll: true,
      logo: {
        alt: 'MoLOS Logo',
        src: 'img/brand/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Docs',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          label: 'Modules',
          position: 'left',
          items: [
            {label: 'Tasks', to: '/docs/modules/tasks'},
            {label: 'Health', to: '/docs/modules/health'},
            {label: 'More...', to: '/docs/modules/'},
          ],
        },
        {
          href: 'https://github.com/MoLOS-App/MoLOS',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          type: 'html',
          position: 'right',
          value: '<a href="/docs/getting-started" class="button button--primary button--sm margin-left--md" style="text-decoration: none;">Get Started</a>',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Getting Started',
          items: [
            { label: 'Quick Start', to: '/docs/getting-started' },
            { label: 'Why MoLOS?', to: '/docs/getting-started#why-molos' },
            { label: 'Core Modules', to: '/docs/modules/' },
            { label: 'FAQ', to: '/docs/getting-started/faq' },
s          ],
        },
        {
          title: 'Develop',
          items: [
            { label: 'Module Development', to: '/docs/module-development' },
            { label: 'Plugin Gallery', to: '/docs/modules/' },
            { label: 'Contributing', to: '/docs/community/contributing' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'GitHub', href: 'https://github.com/MoLOS-App/MoLOS' },
            { label: 'Discussions', href: 'https://github.com/MoLOS-App/MoLOS/discussions' },
            { label: 'Issues', href: 'https://github.com/MoLOS-App/MoLOS/issues' },
            { label: 'Contributing Guide', to: '/docs/community/contributing' },
          ],
        },
        {
          title: 'Modules',
          items: [
            { label: 'Finance', to: '/docs/modules/finance' },
            { label: 'Goals', to: '/docs/modules/goals' },
            { label: 'All Modules', to: '/docs/modules/' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'Governance', to: '/docs/community/governance' },
            { label: 'Code of Conduct', to: '/docs/community/code-of-conduct' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MoLOS Project. Built with Docusaurus. Licensed under Apache license 2.0`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
