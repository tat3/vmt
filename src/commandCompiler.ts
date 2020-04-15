export class CommandCompiler {
  jumpId = 0

  compilePush = (segment: string, index: number) => {
    return `    @${index}
    D=A
` + this.compilePushFromDRegister()
  }

  compileArithmetic = (operator: string) => {
    const popToD = this.compilePopToDRegister()
    switch (operator) {
      case 'add':
        return `${popToD}
    A=A-1
    M=M+D`

      case 'sub':
        return `${popToD}
    A=A-1
    M=M-D`

      case 'and':
        return `${popToD}
    A=A-1
    M=M&D`

      case 'or':
        return `${popToD}
    A=A-1
    M=M|D`

      case 'neg':
        return `    @SP
    A=M-1
    M=-M`

      case 'not':
        return `    @SP
    A=M-1
    M=!M`

      case 'eq':
        return this.compileCompareArithmetic(operator)

      case 'gt':
        return this.compileCompareArithmetic(operator)

      case 'lt':
        return this.compileCompareArithmetic(operator)

      default:
        throw new Error(`invalid operator '${operator}'`)
    }
  }

  compileCompareArithmetic = (operator: string) => {
    if (operator !== 'eq' && operator !== 'gt' && operator !== 'lt') {
      throw new Error(`argument of 'compileCompareArithmetic' must be eq, gt or lt`)
    }
    const popToD = this.compilePopToDRegister()
    const jumpCmd = { 'eq': 'JEQ', 'gt': 'JGT', 'lt': 'JLT' }[operator]
    const op = operator.toUpperCase()
    const asm = `${popToD}
    A=A-1
    D=M-D
    @${op}_${this.jumpId}
    D;${jumpCmd}
    D=0
    @${op}_END_${this.jumpId}
    0;JMP
(${op}_${this.jumpId})
    D=-1
(${op}_END_${this.jumpId})
    @SP
    A=M
    M=D`
    this.jumpId++
    return asm
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
