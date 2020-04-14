export class CommandCompiler {

  compilePush = (segment: string, index: number) => {
    return `    @${index}
    D=A
` + this.compilePushFromDRegister()
  }

  compileArithmetic = (operator: string) => {
    return `
    `
  }

  compilePushFromDRegister = () => {
    return `    @SP
    A=M
    M=D
    @SP
    M=M+1`
  }

  compilePopToDRegister = () => {
    return `    @SP
    M=M-1
    A=M
    D=M`
  }
}
