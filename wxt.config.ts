import { defineConfig } from 'wxt';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Argus by Pixelesq',
    description:
      'All-seeing SEO inspector. Extract meta tags, audit SEO health, get AI-powered insights.',
    permissions: ['sidePanel', 'activeTab', 'storage'],
    host_permissions: ['https://api.anthropic.com/*'],
    action: {
      default_title: 'Open Argus',
    },
    side_panel: {
      default_path: 'sidepanel.html',
    },
    icons: {
      16: 'icon/16.png',
      32: 'icon/32.png',
      48: 'icon/48.png',
      128: 'icon/128.png',
    },
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
