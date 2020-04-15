export class PushCompiler {
  jumpId = 0
  functionName: string | null = null

  compile = (segment: string, index: number) => {
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

  compilePushFromDRegister = () => {
    return `    @SP
    A=M
    M=D
    @SP
    M=M+1`
  }

  setFunctionName = (functionName: string) => {
    this.functionName = functionName
  }
}
