export class PopCompiler {
  jumpId = 0
  functionName: string | null = null

  compilePopToDRegister = () => {
    return `    @SP
    M=M-1
    A=M
    D=M`
  }

  setFunctionName = (functionName: string) => {
    this.functionName = functionName
  }
}
