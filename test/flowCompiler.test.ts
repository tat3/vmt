import chai from 'chai'

import { FlowCompiler } from '../src/flowCompiler'

const expect = chai.expect

describe('program flow compiler test', () => {
  let fc: FlowCompiler
  beforeEach(() => {
    fc = new FlowCompiler()
  })

  it('can be initiated', () => {
    expect(fc).not.to.be.null
  })

  it('generate label assembly', () => {
    expect(fc.compileLabel('abc012_.:')).to.equal(`(abc012_.:)`)
  })

  it('generate goto assembly', () => {
    expect(fc.compileGoto('abc012_.:')).to.equal(`    @abc012_.:
    0;JMP`)
  })

  it('generate if-goto assembly', () => {
    expect(fc.compileIf('abc012_.:')).to.equal(`    @SP
    M=M-1
    A=M
    D=M
    @abc012_.:
    D;JNE`)
  })
})
