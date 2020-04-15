import chai from 'chai'

import { PushCompiler } from '../src/pushCompiler'

const expect = chai.expect

describe('push operation compiler test', () => {
  let pc: PushCompiler
  beforeEach(() => {
    pc = new PushCompiler()
  })

  it('can be initiated', () => {
    expect(pc).not.to.be.null
  })

  it('generate push constant assembler code', () => {
    expect(pc.compile('constant', 10)).to.equal(`    @10
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(pc.compile('constant', 5)).to.equal(`    @5
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate push direct segemnt assembler code', () => {
    expect(pc.compile('pointer', 1)).to.equal(`    @1
    D=A
    @3
    A=D+A
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(pc.compile('temp', 2)).to.equal(`    @2
    D=A
    @5
    A=D+A
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate push indirect segemnt assembler code', () => {
    expect(pc.compile('argument', 1)).to.equal(`    @1
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(pc.compile('local', 2)).to.equal(`    @2
    D=A
    @LCL
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(pc.compile('this', 1)).to.equal(`    @1
    D=A
    @THIS
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(pc.compile('that', 1)).to.equal(`    @1
    D=A
    @THAT
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate push static segemnt assembler code', () => {
    expect(() => pc.compile('static', 1)).to.throw('functionName is not set')

    pc.setFunctionName('hoge')
    expect(pc.compile('static', 1)).to.equal(`    @hoge.1
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate push from D register assembler code', () => {
    expect(pc.compilePushFromDRegister()).to.equal(`    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })
})
