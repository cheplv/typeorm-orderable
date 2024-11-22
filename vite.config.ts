/// <reference types="vitest" />
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { copyFileSync } from 'node:fs'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'typeorm-orderable',
      formats: ['es', 'cjs'],
      //fileName: 'typeorm-orderable',
      fileName: 'index',
    },
    rollupOptions: {
      external: ['typeorm'],
    },
  },
  plugins: [
    dts({
      rollupTypes: true,
      //insertTypesEntry: true,
      //include: ['src'],
      afterBuild: () => {
        copyFileSync('dist/index.d.ts', 'dist/index.d.cts')
      },
    }),
  ],
  test: {
    includeSource: ['tests/**/*.spec.ts'],
    testTimeout: 100000,
  },
})
