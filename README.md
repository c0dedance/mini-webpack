## ✨ Introduction

typescript编写 + tsup打包的简陋版的webpack，实现了核心功能

+ 多个js文件打包到一个bundle
+ modele_cache：同一模块只加载一次
+ esm -> cjs

## 📦 Project

```bash
mini-webpack
├── core # 实现核心
│   ├── make.ts
│   ├── index.ts
│   ├── emit.ts
│   ├── compiler.ts
│   └── common.ts
├── example # 实例项目
│   ├── webpack.config.js
│   ├── src
│   ├── package.json
│   ├── dist
│   └── build.js
├── lib # 项目编译产物导出
│   └── index.js
├── package.json
├── README.md
├── tsconfig.json
└── tsup.config.ts
```

## 🦄 Usage

本项目提供了Node API，新建配置`webpack.config.js`，并在js编写代码如下：


~~~js
/* build.js */
import webpack from 'mini-webpack'

import config from './webpack.config.js'
const compiler = webpack(config)
compiler.run()
~~~

通过script更方便运行

~~~bash
"scripts": {
	"webpack": "node build.js"
},
# run
pnpm webpack
~~~



## 📄 License

[MIT](./LICENSE) License © 2022 [c0dedance](https://github.com/c0dedance/)