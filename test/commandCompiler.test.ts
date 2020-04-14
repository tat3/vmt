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
    expect(cc.compileArithmetic('add')).to.equal(`
    `)

    expect(cc.compileArithmetic('sub')).to.equal(`
    `)
  })
})
