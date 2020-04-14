export class CodeCompiler {

  compilePush = (segment: string, index: number) => {
    return `    @${index}
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`
  }
}
