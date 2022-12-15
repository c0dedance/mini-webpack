import { resolve } from 'path'
import { createAssetsGraph } from './make'

const ENTRY = resolve('dist')
interface Config {
  entry?: string
  output?: string
}

class Compiler {
  private config
  constructor(config: Config) {
    this.config = config
  }

  run() {
    const { entry = ENTRY } = this.config
    this.buildMoudes(entry)
  }

  buildMoudes(entry: string) {
    const assetsGraph = createAssetsGraph(entry)
    console.log(assetsGraph)

    return []
  }
}

export default Compiler
export {
  Config,
}
