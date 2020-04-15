import chai from 'chai'

import { CommandCompiler } from '../src/commandCompiler'

const expect = chai.expect

describe('tokenizer test', () => {
  let cc: CommandCompiler
  beforeEach(() => {
    cc = new CommandCompiler()
  })

  it('can be initiated', () => {
    expect(cc).not.to.be.null
  })

  it('generate push constant assembler code', () => {
    expect(cc.compilePush('constant', 10)).to.equal(`    @10
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(cc.compilePush('constant', 5)).to.equal(`    @5
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate push direct segemnt assembler code', () => {
    expect(cc.compilePush('pointer', 1)).to.equal(`    @1
    D=A
    @3
    A=D+A
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(cc.compilePush('temp', 2)).to.equal(`    @2
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
    expect(cc.compilePush('argument', 1)).to.equal(`    @1
    D=A
    @ARG
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(cc.compilePush('local', 2)).to.equal(`    @2
    D=A
    @LCL
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(cc.compilePush('this', 1)).to.equal(`    @1
    D=A
    @THIS
    A=D+M
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)

    expect(cc.compilePush('that', 1)).to.equal(`    @1
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
    expect(() => cc.compilePush('static', 1)).to.throw('functionName is not set')

    cc.setFunctionName('hoge')
    expect(cc.compilePush('static', 1)).to.equal(`    @hoge.1
    D=M
    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate push from D register assembler code', () => {
    expect(cc.compilePushFromDRegister()).to.equal(`    @SP
    A=M
    M=D
    @SP
    M=M+1`)
  })

  it('generate pop to D register assembler code', () => {
    expect(cc.compilePopToDRegister()).to.equal(`    @SP
    M=M-1
    A=M
    D=M`)
  })

  it('generate arithmetic assembler code', () => {
    expect(cc.compileArithmetic('add')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M+D`)

    expect(cc.compileArithmetic('sub')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M-D`)

    expect(cc.compileArithmetic('and')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M&D`)

    expect(cc.compileArithmetic('or')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M|D`)

    expect(cc.compileArithmetic('neg')).to.equal(`    @SP
    A=M-1
    M=-M`)

    expect(cc.compileArithmetic('not')).to.equal(`    @SP
    A=M-1
    M=!M`)

    expect(cc.compileArithmetic('eq')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    D=M-D
    @EQ_0
    D;JEQ
    D=0
    @EQ_END_0
    0;JMP
(EQ_0)
    D=-1
(EQ_END_0)
    @SP
    A=M
    M=D`)

    expect(cc.compileArithmetic('gt')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    D=M-D
    @GT_1
    D;JGT
    D=0
    @GT_END_1
    0;JMP
(GT_1)
    D=-1
(GT_END_1)
    @SP
    A=M
    M=D`)

    expect(cc.compileArithmetic('lt')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    D=M-D
    @LT_2
    D;JLT
    D=0
    @LT_END_2
    0;JMP
(LT_2)
    D=-1
(LT_END_2)
    @SP
    A=M
    M=D`)

    expect(() => cc.compileArithmetic('aad')).to.throw('invalid operator \'aad\'')
  })
})
