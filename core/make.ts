import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'
import { transformFromAst } from '@babel/core'

const traverse = traverseModule.default
let id = 0
interface Assets {
  id: number
  path: string
  source: string
  deps: string[]
}
interface Module {
  id: number
  code: string
}
export function createAssets(absolutePath: string): Assets {
  const deps: string[] = []
  // 读取文件内容
  const source = readFileSync(absolutePath, {
    encoding: 'utf-8',
  })
  // 解析为AST
  const ast = parse(source, {
    sourceType: 'module',
  })

  // 遍历AST，找到import节点
  traverse(ast, {
    ImportDeclaration({ node }: any) {
      // 收集依赖的路径（相对）
      const path = node.source.value
      deps.push(path)
    },
  })
  // 将esm代码转换成cjs
  const { code } = transformFromAst(ast, null, {
    // 使用@babel/preset-env将代码转为ES5
    presets: ['env'],
  })

  return {
    id: id++,
    path: absolutePath,
    source: code,
    deps,
  }
}
export function createAssetsGraph(entry: string): Assets[] {
  const rootAssets = createAssets(entry)
  const assetsGraph = [rootAssets]

  for (const assets of assetsGraph) {
    const { path, deps } = assets
    const dirName = dirname(path)

    deps.forEach((p) => {
      const path = resolve(dirName, p)
      const childAssets = createAssets(path)
      assetsGraph.push(childAssets)
    })
  }
  // todo
  return assetsGraph
}

export function createModuleGraph(assetsGraph: Assets[]): Module[] {
  const moduleGraph = new Array(assetsGraph.length)
  assetsGraph.forEach(({ id, source }) => {
    const code
    = `\
    (function(module, exports, require){
        ${source}
      }
    )
    `
    moduleGraph[id] = code
  })
  return moduleGraph
}
