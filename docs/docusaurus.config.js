// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'exa.js',
    tagline: 'Dinosaurs are cool',
    favicon: 'img/favicon.ico',

    // Set the production url of your site here
    url: 'https://exa.js.org',
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: '/',

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: 'realtux', // Usually your GitHub org/user name.
    projectName: 'exa', // Usually your repo name.

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
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: './sidebars.js',
                    sidebarCollapsible: false,
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/realtux/exa/tree/master/docs',
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ['rss', 'atom'],
                        xslt: true,
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        'https://github.com/realtux/exa/tree/master/docs',
                    // Useful options to enforce blogging best practices
                    onInlineTags: 'warn',
                    onInlineAuthors: 'warn',
                    onUntruncatedBlogPosts: 'warn',
                },
                theme: {
                    customCss: './src/css/custom.css',
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            colorMode: {
                defaultMode: 'dark',
                respectPrefersColorScheme: false,
            },
            prism: {
                theme: prismThemes.github,
                darkTheme: prismThemes.dracula,
                additionalLanguages: [
                    'bash',
                    'yaml'
                ],
            },
            // Replace with your project's social card
            image: 'img/docusaurus-social-card.jpg',
            navbar: {
                title: 'exa.js',
                logo: {
                    alt: 'exa.js',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        type: 'docSidebar',
                        sidebarId: 'tutorialSidebar',
                        position: 'left',
                        label: 'docs',
                    },
                    {
                        href: 'https://github.com/realtux/exa',
                        label: 'github',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                // links: [
                //     {
                //         title: 'Docs',
                //         items: [
                //             {
                //                 label: 'Tutorial',
                //                 to: '/intro',
                //             },
                //         ],
                //     },
                //     {
                //         title: 'Community',
                //         items: [
                //             {
                //                 label: 'Stack Overflow',
                //                 href: 'https://stackoverflow.com/questions/tagged/docusaurus',
                //             },
                //             {
                //                 label: 'Discord',
                //                 href: 'https://discordapp.com/invite/docusaurus',
                //             },
                //             {
                //                 label: 'X',
                //                 href: 'https://x.com/docusaurus',
                //             },
                //         ],
                //     },
                //     {
                //         title: 'More',
                //         items: [
                //             {
                //                 label: 'GitHub',
                //                 href: 'https://github.com/facebook/docusaurus',
                //             },
                //         ],
                //     },
                // ],
                copyright: `exa.js -- built with docusaurus`,
            },
        }),
};

export default config;
