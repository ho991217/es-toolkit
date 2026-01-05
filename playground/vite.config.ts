import fs from 'fs';
import path from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

function bundleEsToolkit() {
  return {
    name: 'bundle-es-toolkit',
    resolveId(id: string) {
      if (id === 'virtual:es-toolkit-types' || id === 'virtual:es-toolkit-bundle') {
        return id;
      }
    },
    load(id: string) {
      const distPath = path.resolve(__dirname, '../dist');

      // Check if dist folder exists
      if (!fs.existsSync(distPath)) {
        throw new Error(
          'es-toolkit dist folder not found. Please build es-toolkit first by running "yarn build" in the root directory.'
        );
      }

      // Load bundled runtime code
      if (id === 'virtual:es-toolkit-bundle') {
        const bundlePath = path.join(distPath, 'browser.global.js');
        if (!fs.existsSync(bundlePath)) {
          throw new Error(
            `es-toolkit bundle not found at ${bundlePath}. Please run "yarn build" in the root directory.`
          );
        }
        const bundleCode = fs.readFileSync(bundlePath, 'utf-8');
        return `export default ${JSON.stringify(bundleCode)};`;
      }

      // Load bundled type definitions
      if (id === 'virtual:es-toolkit-types') {
        const indexDtsPath = path.join(distPath, 'index.d.ts');
        if (!fs.existsSync(indexDtsPath)) {
          throw new Error(
            `es-toolkit types not found at ${indexDtsPath}. Please run "yarn build" in the root directory.`
          );
        }
        const indexDts = fs.readFileSync(indexDtsPath, 'utf-8');

        // Extract all export paths from index.d.ts
        const exportRegex = /export \{ (.+?) \} from '(.+?)';/g;
        const matches = [...indexDts.matchAll(exportRegex)];

        // Read all referenced type files and combine them
        let combinedTypes = '';
        const processedFiles = new Set<string>();

        for (const match of matches) {
          const exportPath = match[2].replace('.js', '.d.ts');
          const fullPath = path.join(distPath, exportPath);

          if (!processedFiles.has(fullPath) && fs.existsSync(fullPath)) {
            processedFiles.add(fullPath);
            const content = fs.readFileSync(fullPath, 'utf-8');
            // Remove export keywords and imports
            const cleaned = content
              .replace(/^import .+;$/gm, '')
              .replace(/^export \{ type \}/gm, '')
              .replace(/^export /gm, '');
            combinedTypes += cleaned + '\n';
          }
        }

        return `export default ${JSON.stringify(combinedTypes)};`;
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), bundleEsToolkit()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['es-toolkit'],
      output: {
        globals: {
          'es-toolkit': 'es-toolkit',
        },
      },
    },
  },
});
