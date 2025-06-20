import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: './test/setup.ts',
    coverage: {
      enabled: true, // or overriden by "vitest --coverage"
      include: ['src/**'],
    },
  },
})