import { PopCompiler } from './popCompiler'

export class FlowCompiler {
  compileLabel = (label: string) => {
    return `(${label})`
  }

  compileGoto = (label: string) => {
    return `    @${label}
    0;JMP`
  }

  compileIf = (label: string) => {
    const popCompiler = new PopCompiler()
    return `${popCompiler.compilePopToDRegister()}
    @${label}
    D;JNE`
  }
}
