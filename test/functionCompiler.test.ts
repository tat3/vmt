import chai from 'chai'

import { FunctionCompiler } from '../src/functionCompiler'
import { PushCompiler } from '../src/pushCompiler'
import { PopCompiler } from '../src/popCompiler'

const expect = chai.expect

describe('function compiler test', () => {
  let fc: FunctionCompiler
  beforeEach(() => {
    fc = new FunctionCompiler()
  })

  it('can be initiated', () => {
    expect(fc).not.to.be.null
  })

  it('generate function declaration', () => {
    expect(fc.compileFunction('hoge', 2)).to.equal(`(hoge)
    @0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1
    @0
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(fc.compileFunction('hoge', 0)).to.equal(`(hoge)`)
  })

  it('generate return statement', () => {
    const popCompiler = new PopCompiler()
    expect(fc.compileReturn()).to.equal(`    @LCL
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
    @R13
    AM=M-1
    D=M
    @THAT
    M=D
    @R13
    AM=M-1
    D=M
    @THIS
    M=D
    @R13
    AM=M-1
    D=M
    @ARG
    M=D
    @R13
    AM=M-1
    D=M
    @LCL
    M=D
    @R14
    A=M
    0;JMP`)
  })

  it('generate function call', () => {
    const pushCompiler = new PushCompiler()
    expect(fc.compileCall('hoge', 2)).to.equal(`    @hoge_RETURN_0
    D=A
${pushCompiler.compilePushFromDRegister()}
    @LCL
    D=M
${pushCompiler.compilePushFromDRegister()}
    @ARG
    D=M
${pushCompiler.compilePushFromDRegister()}
    @THIS
    D=M
${pushCompiler.compilePushFromDRegister()}
    @THAT
    D=M
${pushCompiler.compilePushFromDRegister()}
    @SP
    D=M
    @LCL
    M=D
    @7
    D=D-A
    @ARG
    M=D
    @hoge
    0;JMP
(hoge_RETURN_0)`)
  })

})
