import { resolve } from 'path'

export const ENTRY = resolve('./src/index.js')
export const OUTPUT = {
  path: resolve('dist'),
  filename: resolve('dist/bundle.js'),
}
