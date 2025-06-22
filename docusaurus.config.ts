import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'WP LLM',
  tagline: 'Supercharge WordPress with AI',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://artificialpoets.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'artificialpoets', // Usually your GitHub org/user name.
  projectName: 'wp-llm-docs', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
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
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/artificialpoets/wp-llm-docs/tree/main/docs/',
        },
        pages: {
          path: 'src/pages',
        },
        // Removed blog configuration
        theme: {
          customCss: './src/css/custom.css',
        },
        googleTagManager: {
          containerId: 'GTM-MKVPSLQF',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/og-image.png',
    
    // Open Graph and Twitter meta tags
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: 'https://artificialpoets.github.io/wp-llm-docs/',
      siteName: 'WP LLM Documentation',
      title: 'WP LLM - Supercharge WordPress with AI',
      description: 'The ultimate AI tool for WordPress developers. Generate custom post types, Gutenberg blocks, REST APIs, and more with specialized WordPress knowledge.',
      image: {
        url: '/img/og-image.png',
        width: 1200,
        height: 630,
        alt: 'WP LLM - Supercharge WordPress with AI',
      },
    },

    // Twitter meta tags
    twitter: {
      cardType: 'summary_large_image',
      site: '@artificialpoets',
      creator: '@artificialpoets',
      title: 'WP LLM - Supercharge WordPress with AI',
      description: 'The ultimate AI tool for WordPress developers. Generate custom post types, Gutenberg blocks, REST APIs, and more with specialized WordPress knowledge.',
      image: '/img/og-image.png',
    },
    
    // Color mode configuration
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    
    navbar: {
      title: 'WP LLM',
      logo: {
        alt: 'WP LLM Logo',
        src: 'img/logo.png',
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: 'Home',
        },
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Documentation',
        },
        {
          to: '/get-in-touch',
          label: 'Contact',
          position: 'left',
        },
        {
          href: 'https://github.com/artificialpoets/wp-llm-docs',
          label: 'GitHub',
          position: 'right',
        },
        {
          href: 'https://docs.mcp-wp.com/',
          label: 'MCP for WP',
          position: 'right',
        },
        {
          href: 'https://www.artificialpoets.com/?ref=wp-llm-docs.com',
          label: 'AI for WordPress',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      // Disable default footer since we're using a custom one
      links: [],
      copyright: `Copyright © ${new Date().getFullYear()} WP LLM. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
