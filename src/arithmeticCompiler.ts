import { PopCompiler } from './popCompiler'

export class ArithmeticCompiler {
  jumpId = 0
  popCompiler = new PopCompiler()

  compile = (operator: string) => {
    const popToD = this.popCompiler.compilePopToDRegister()
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
    const popToD = this.popCompiler.compilePopToDRegister()
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
}
