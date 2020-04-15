export class PopCompiler {
  functionName: string | null = null

  compile = (segment: string, index: number) => {
    let asm = ''
    if (segment === 'constant') {
      throw new Error('pop constant command does nothing')

    } else if (['argument', 'local', 'this', 'that'].includes(segment)) {
      return this.compileIndirectSegment(segment, index)

    } else if (['pointer', 'temp'].includes(segment)) {
      asm = this.compileDirectSegmentFromDRegister(segment, index)

    } else if (segment === 'static') {
      asm = this.compileStaticSegmentFromDRegister(index)

    } else {
      throw new Error(`invalid segment '${segment}'`)
    }
    return this.compilePopToDRegister() + '\n' + asm
  }

  compileDirectSegmentFromDRegister = (segment: string, index: number) => {
    const segmentMap = {
      'pointer': 3,
      'temp': 5,
    }
    if (segment !== 'pointer' && segment !== 'temp') {
      throw new Error(`segment '${segment}' must be pointer or temp`)
    }
    const base = segmentMap[segment]

    return `    @${base + index}
    M=D`
  }

  compileIndirectSegment = (segment: string, index: number) => {
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
    M=D+M
${this.compilePopToDRegister()}
    @${base}
    A=M
    M=D
    @${index}
    D=A
    @${base}
    M=M-D`
  }

  compileStaticSegmentFromDRegister = (index: number) => {
    if (this.functionName === null) {
      throw new Error('functionName is not set')
    }

    return `    @${this.functionName}.${index}
    M=D`
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
