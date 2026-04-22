import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

const buildTimestamp = new Date().toISOString();
const buildInfoPlugin = () => ({
  name: 'build-info-plugin',
  generateBundle(this: { emitFile: (asset: { type: string; fileName: string; source: string }) => void }) {
    this.emitFile({
      type: 'asset',
      fileName: 'build-info.json',
      source: JSON.stringify({
        version: buildTimestamp.slice(0, 10),
        buildId: buildTimestamp,
        label: 'Deployment Checker Release',
      }, null, 2),
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  define: {
    'import.meta.env.VITE_APP_VERSION': JSON.stringify(buildTimestamp.slice(0, 10)),
    'import.meta.env.VITE_APP_BUILD_ID': JSON.stringify(buildTimestamp),
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react(), buildInfoPlugin(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'v-react': ['react', 'react-dom'],
          'v-router': ['react-router-dom'],
          'v-ui-core': ['@radix-ui/react-dialog', '@radix-ui/react-tooltip'],
          'v-ui-extra': ['@radix-ui/react-accordion', '@radix-ui/react-toast'],
          'v-query': ['@tanstack/react-query'],
          'v-supabase': ['@supabase/supabase-js'],
        },
      },
    },
    cssMinify: true,
    minify: 'esbuild',
    target: 'es2020',
  },
}));
