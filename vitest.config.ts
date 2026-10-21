import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'scripts/**/*.test.mjs'],
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    globals: true,
    css: false,
  },
});
