import chai from 'chai'

import { CodeCompiler } from '../src/codeCompiler'

const expect = chai.expect

describe('tokenizer test', () => {
  let w: CodeCompiler
  beforeEach(() => {
    w = new CodeCompiler()
  })

  it('can be initiated', () => {
    expect(w).not.to.be.null
  })

  it('generate push constant assembler code', () => {
    const assembly10 = `    @10
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`

    expect(w.compilePush('constant', 10)).to.equal(assembly10)

    const assembly5 = `    @5
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`

    expect(w.compilePush('constant', 5)).to.equal(assembly5)
  })

  it('generate push constant assembler code', () => {
    const assembly10 = `    @10
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`

    expect(w.compilePush('constant', 10)).to.equal(assembly10)

    const assembly5 = `    @5
    D=A
    @SP
    A=M
    M=D
    @SP
    M=M+1`

    expect(w.compilePush('constant', 5)).to.equal(assembly5)
  })
})
