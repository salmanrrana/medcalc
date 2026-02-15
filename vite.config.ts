import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'
import { nitro } from 'nitro/vite'
import { defineConfig } from 'vite'
import viteTsConfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  build: {
    // Match TypeScript target for consistent compilation
    target: 'es2022',
    // Keep source maps for better error diagnostics
    sourcemap: true,
    // Minify with terser for better compression than default esbuild
    minify: 'terser',
    terserOptions: {
      compress: {
        // Preserve console.error for error visibility - no error tracking service configured
        // Only remove verbose logging to reduce bundle size
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.debug'],
      },
    },
  },
  plugins: [
    devtools(),
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    viteTsConfigPaths({ projects: ['./tsconfig.json'] }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
  ],
})
