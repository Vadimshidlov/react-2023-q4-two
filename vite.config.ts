/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    // alias: {
    //   '@': path.resolve(__dirname, './src/'),
    //   components: `${path.resolve(__dirname, './src/components/')}`,
    //   hooks: `${path.resolve(__dirname, './hooks/')}`,
    //   services: `${path.resolve(__dirname, './services/')}`,
    //   assets: `${path.resolve(__dirname, './assets/')}`,
    //   types: `${path.resolve(__dirname, './types/')}`,
    //   view: `${path.resolve(__dirname, './view/')}`,
    // },
  },
});
