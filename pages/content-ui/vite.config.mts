import { resolve } from 'path';
import { makeEntryPointPlugin } from '@extension/hmr';
import { withPageConfig, isDev } from '@extension/vite-config';

const rootDir = resolve(__dirname);
const srcDir = resolve(rootDir, 'src');

export default withPageConfig({
  resolve: {
    alias: {
      '@src': srcDir,
    },
  },
  plugins: [isDev && makeEntryPointPlugin()],
  publicDir: resolve(rootDir, 'public'),
  build: {
    lib: {
      entry: resolve(srcDir, 'index.tsx'),
      name: 'contentUI',
      formats: ['iife'],
      fileName: 'index',
    },
    outDir: resolve(rootDir, '..', '..', 'dist', 'content-ui'),
    sourcemap: isDev,
    reportCompressedSize: !isDev,
    rollupOptions: {
      external: ['chrome'],
      // This next function warns about source maps, but we can ignore it
      // https://github.com/vitejs/vite/issues/15012
      onwarn(warning, defaultHandler) {
        if (warning.code === 'SOURCEMAP_ERROR') {
          return;
        }

        defaultHandler(warning);
      },
    },
    // We need to do this otherwise we get a bad sourcemap
    // minify: isProduction,
    minify: 'terser', // Specify terser as the minifier
    terserOptions: {
      format: {
        ascii_only: true, // Ensure the output is ASCII only
      },
    },
  },
  define: {
    'process.env.NODE_ENV': isDev ? `"development"` : `"production"`,
  },
});
