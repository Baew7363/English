import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const rootFiles = ['index', 'app', 'about', 'contact', 'privacy', 'terms', 'cookies', 'disclaimer', 'blog', 'thanks', '404'];
  const inputMap: Record<string, string> = {};
  
  for (const name of rootFiles) {
    const file = path.resolve(__dirname, `${name}.html`);
    if (fs.existsSync(file)) {
      inputMap[name] = file;
    }
  }

  const blogDir = path.resolve(__dirname, 'blog');
  if (fs.existsSync(blogDir)) {
    const blogFiles = fs.readdirSync(blogDir).filter((f) => f.endsWith('.html'));
    for (const f of blogFiles) {
      const baseName = f.replace(/\.html$/, '');
      inputMap[`blog_${baseName}`] = path.resolve(blogDir, f);
    }
  }

  return {
    appType: 'mpa' as const,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        input: inputMap,
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
