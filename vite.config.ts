/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'typeorm-orderable',
      formats: ['es', 'cjs'],
      fileName: 'typeorm-orderable',
    },
    rollupOptions: {
      external: ['typeorm'],
    },
  },
  plugins: [dts({ rollupTypes: true })],
  test: {
    includeSource: ['tests/**/*.spec.ts'],
    threads: false,
    testTimeout: 100000,
  },
})
