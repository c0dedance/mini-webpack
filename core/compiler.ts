import { resolve } from 'path'
import { createAssetsGraph, createModuleGraph } from './make'

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
    const moduleGraph = createModuleGraph(assetsGraph)
    console.log(moduleGraph)

    return []
  }
}

export default Compiler
export {
  Config,
}
