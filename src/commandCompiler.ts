export class CommandCompiler {
  jumpId = 0
  functionName: string | null = null

  compilePush = (segment: string, index: number) => {
    let asm = ''
    if (segment === 'constant') {
      asm = `    @${index}
    D=A`

    } else if (['argument', 'local', 'this', 'that'].includes(segment)) {
      asm = this.compileIndirectSegmentToDRegister(segment, index)

    } else if (['pointer', 'temp'].includes(segment)) {
      asm = this.compileDirectSegmentToDRegister(segment, index)

    } else if (segment === 'static') {
      asm = this.compileStaticSegmentToDRegister(index)

    } else {
      throw new Error(`invalid segment '${segment}'`)
    }
    return asm + '\n' + this.compilePushFromDRegister()
  }

  compileDirectSegmentToDRegister = (segment: string, index: number) => {
    const segmentMap = {
      'pointer': 3,
      'temp': 5,
    }
    if (segment !== 'pointer' && segment !== 'temp') {
      throw new Error(`segment '${segment}' must be pointer or temp`)
    }
    const base = segmentMap[segment]

    return `    @${index}
    D=A
    @${base}
    A=D+A
    D=M`
  }

  compileIndirectSegmentToDRegister = (segment: string, index: number) => {
    const segmentMap = {
      'local': 'LCL',
      'argument': 'ARG',
      'this': 'THIS',
      'that': 'THAT',
    }
    if (segment !== 'local' && segment !== 'argument' && segment !== 'this' && segment !== 'that') {
      throw new Error(`segment '${segment}' must be local, argument, this or that`)
    }
    const base = segmentMap[segment]

    return `    @${index}
    D=A
    @${base}
    A=D+M
    D=M`
  }

  compileStaticSegmentToDRegister = (index: number) => {
    if (this.functionName === null) {
      throw new Error('functionName is not set')
    }

    return `    @${this.functionName}.${index}
    D=M`
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

  setFunctionName = (functionName: string) => {
    this.functionName = functionName
  }
}
