import chai from 'chai'

import { ArithmeticCompiler } from '../src/arithmeticCompiler'

const expect = chai.expect

describe('arithmetic operation compiler test', () => {
  let ac: ArithmeticCompiler
  beforeEach(() => {
    ac = new ArithmeticCompiler()
  })

  it('can be initiated', () => {
    expect(ac).not.to.be.null
  })

  it('generate arithmetic assembler code', () => {
    expect(ac.compile('add')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M+D`)

    expect(ac.compile('sub')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M-D`)

    expect(ac.compile('and')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M&D`)

    expect(ac.compile('or')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    A=A-1
    M=M|D`)

    expect(ac.compile('neg')).to.equal(`    @SP
    A=M-1
    M=-M`)

    expect(ac.compile('not')).to.equal(`    @SP
    A=M-1
    M=!M`)

    expect(ac.compile('eq')).to.equal(`    @SP
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

    expect(ac.compile('gt')).to.equal(`    @SP
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

    expect(ac.compile('lt')).to.equal(`    @SP
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

    expect(() => ac.compile('aad')).to.throw('invalid operator \'aad\'')
  })
})
