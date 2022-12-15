import { resolve } from 'path'

export default {
  entry: resolve('./src/main.js'),
  output: {
    path: resolve('dist'),
    filename: 'bundle.js',
  },
}
