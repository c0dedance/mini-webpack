import { existsSync, mkdirSync, rmSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import type { Module } from './make'
import type { outputType } from './compiler'
export function emitAssets(assets: string, { path, filename }: outputType) {
  // 清理目录及文件
  if (existsSync(path)) {
    console.log('existsSync')

    rmSync(path, { recursive: true })
  }

  console.log(path)
  console.log(filename)
  console.log(assets)

  // 新建目录
  mkdirSync(path, { recursive: true })
  // 写出文件
  writeFileSync(resolve(path, filename), assets)
}
export function render(modules: Module[]) {
  return `\
  (function (modules) {
    const moduleCache = {}

    function require(id) {
      if(moduleCache[id]){
        return moduleCache[id].exports
      }

      const module = moduleCache[id] = {
        exports:{}
      }
      modules[id](module, module.exports, require)
      
      return module.exports
    }
  
    require(0)
  })([${modules}])
  `
}
