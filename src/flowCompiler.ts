import { PopCompiler } from './popCompiler'

const asmLabel = (label: string, functionName: string) => {
  return `${functionName}$${label}`
}

export class FlowCompiler {
  functionName: string | null = null

  compileLabel = (label: string) => {
    if (this.functionName === null) {
      throw new Error('functionName is not set')
    }
    return `(${asmLabel(label, this.functionName)})`
  }

  compileGoto = (label: string) => {
    if (this.functionName === null) {
      throw new Error('functionName is not set')
    }
    return `    @${asmLabel(label, this.functionName)}
    0;JMP`
  }

  compileIf = (label: string) => {
    if (this.functionName === null) {
      throw new Error('functionName is not set')
    }

    const popCompiler = new PopCompiler()
    return `${popCompiler.compilePopToDRegister()}
    @${asmLabel(label, this.functionName)}
    D;JNE`
  }

  setFunctionName = (functionName: string) => {
    this.functionName = functionName
  }
}
