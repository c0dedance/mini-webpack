import { readFileSync } from 'fs'
import { dirname, resolve } from 'path'
import { parse } from '@babel/parser'
import traverseModule from '@babel/traverse'

const traverse = traverseModule.default
interface Assets {
  path: string
  source: string
  deps: string[]
}
interface Module {
  id?: number
  path?: string
  source?: string
  deps?: string[]
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

  return {
    path: absolutePath,
    source,
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
