import { PushCompiler } from './pushCompiler'
import { range } from './util'
import { PopCompiler } from './popCompiler'

export class FunctionCompiler {
  jumpId = 0

  compileFunction = (functionName: string, nLocals: number) => {
    const pushCompiler = new PushCompiler()
    return `(${functionName})`
      + range(nLocals).map(() => '\n' + pushCompiler.compile('constant', 0)).join('')
  }

  compileReturn = () => {
    const popCompiler = new PopCompiler()
    const pop = (register: string) => (`    @R13
    AM=M-1
    D=M
    @${register}
    M=D`)

    return `    @LCL
    D=M
    @R13
    M=D
    @5
    D=A
    @R13
    A=M-D
    D=M
    @R14
    M=D
${popCompiler.compilePopToDRegister()}
    @ARG
    A=M
    M=D
    @ARG
    D=M+1
    @SP
    M=D
${pop('THAT')}
${pop('THIS')}
${pop('ARG')}
${pop('LCL')}
    @R14
    A=M
    0;JMP`
  }

  compileCall = (functionName: string, nArgs: number) => {
    const pushCompiler = new PushCompiler()
    const pushFrom = (register: string) => (`    @${register}
    D=M
${pushCompiler.compilePushFromDRegister()}`)
    const jumpIdOld = this.jumpId
    const retAddr = `${functionName}_RETURN_${jumpIdOld}`
    this.jumpId++

    return `    @${retAddr}
    D=A
${pushCompiler.compilePushFromDRegister()}
${pushFrom('LCL')}
${pushFrom('ARG')}
${pushFrom('THIS')}
${pushFrom('THAT')}
    @SP
    D=M
    @LCL
    M=D
    @${nArgs + 5}
    D=D-A
    @ARG
    M=D
    @${functionName}
    0;JMP
(${retAddr})`
  }

}
