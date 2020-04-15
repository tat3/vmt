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

  it('generate pop to D register assembler code', () => {
    expect(pc.compilePopToDRegister()).to.equal(`    @SP
    M=M-1
    A=M
    D=M`)
  })
})
