import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

// Define chrome as default browser for the dev server.
const opsys = process.platform;
// windows
if (opsys === 'win32') process.env.BROWSER = 'chrome';
// macOS
if (opsys === 'darwin') process.env.BROWSER = '/Applications/Google Chrome.app';

export default defineConfig({
  root: './src',
  publicDir: '../public',
  build: {
    emptyOutDir: true,
    outDir: '../dist',
    sourcemap: true,
  },
  server: {
    port: 3000,
  },

  plugins: [
    // HTML minification
    ViteMinifyPlugin({
      removeComments: true,
    }),
  ],
});
