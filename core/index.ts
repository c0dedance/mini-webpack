import type { Config } from './compiler'
import Compiler from './compiler'

export default function webpack(config: Config) {
  return new Compiler(config)
}
