import { createAssetsGraph, createModuleGraph } from './make'
import type { Module } from './make'
import { emitAssets, render } from './emit'

import { ENTRY, OUTPUT } from './common'

export interface outputType {
  path: string
  filename: string
}
interface Config {
  entry?: string
  output?: outputType
}

class Compiler {
  private config
  private moduleGraph: Module[]
  constructor(config: Config) {
    this.config = config
    this.moduleGraph = []
  }

  run() {
    const { entry = ENTRY, output = OUTPUT } = this.config

    this.buildMoudes(entry)
    this.emitFile(output)
  }

  buildMoudes(entry: string) {
    const assetsGraph = createAssetsGraph(entry)
    this.moduleGraph = createModuleGraph(assetsGraph)
  }

  emitFile(output: outputType) {
    const assets = render(this.moduleGraph)
    emitAssets(assets, output)
  }
}

export default Compiler
export {
  Config,
}
