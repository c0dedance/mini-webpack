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
    console.log(this.config)
  }
}

export default Compiler
export {
  Config,
}
