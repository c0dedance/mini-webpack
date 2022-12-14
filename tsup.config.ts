import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['core/index.ts'],
  splitting: false,
  sourcemap: false,
  clean: true,
  format: 'esm',
  outDir: 'lib',
})
