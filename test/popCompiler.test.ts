import chai from 'chai'

import { PopCompiler } from '../src/popCompiler'

const expect = chai.expect

describe('pop operation compiler test', () => {
  let pc: PopCompiler
  beforeEach(() => {
    pc = new PopCompiler()
  })

  it('can be initiated', () => {
    expect(pc).not.to.be.null
  })

  it('throw for pop constant', () => {
    expect(() => pc.compile('constant', 10)).to.throw('pop constant command does nothing')
  })

  it('generate pop direct segemnt assembler code', () => {
    expect(pc.compile('pointer', 1)).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    @4
    M=D`)

    expect(pc.compile('temp', 2)).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    @7
    M=D`)
  })

  it('generate pop indirect segemnt assembler code', () => {
    expect(pc.compile('argument', 1)).to.equal(`    @1
    D=A
    @ARG
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @ARG
    A=M
    M=D
    @1
    D=A
    @ARG
    M=M-D`)

    expect(pc.compile('local', 2)).to.equal(`    @2
    D=A
    @LCL
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @LCL
    A=M
    M=D
    @2
    D=A
    @LCL
    M=M-D`)

    expect(pc.compile('this', 1)).to.equal(`    @1
    D=A
    @THIS
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @THIS
    A=M
    M=D
    @1
    D=A
    @THIS
    M=M-D`)

    expect(pc.compile('that', 1)).to.equal(`    @1
    D=A
    @THAT
    M=D+M
    @SP
    M=M-1
    A=M
    D=M
    @THAT
    A=M
    M=D
    @1
    D=A
    @THAT
    M=M-D`)
  })

  it('generate pop static segemnt assembler code', () => {
    expect(() => pc.compile('static', 1)).to.throw('functionName is not set')

    pc.setFunctionName('hoge')
    expect(pc.compile('static', 1)).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    @hoge.1
    M=D`)
  })

  it('generate pop to D register assembler code', () => {
    expect(pc.compilePopToDRegister()).to.equal(`    @SP
    M=M-1
    A=M
    D=M`)
  })
})
