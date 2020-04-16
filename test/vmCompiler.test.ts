import chai from 'chai'
import fs from 'fs'

import { VMCompiler } from '../src/vmCompiler'

const expect = chai.expect

describe('vm script compiler test', () => {
  let vmc: VMCompiler
  beforeEach(() => {
    vmc = new VMCompiler()
  })

  it('can be initiated', () => {
    expect(vmc).not.to.be.null
  })

  it('generate assembly from empty vm script', () => {
    const script = ``
    const asm = vmc.compile(script)
    expect(asm).to.equal(`    @256
    D=A
    @SP
    M=D`)
  })

  it('generate assembly from sample vm scripts', () => {
    const simpleAddVm = fs.readFileSync('test/data/SimpleAdd/SimpleAdd.vm', { encoding: 'utf8' })
    const simpleAddAsm = fs.readFileSync('test/data/SimpleAdd/SimpleAdd.asm', { encoding: 'utf8' })
    const simpleAddRes = vmc.compile(simpleAddVm)
    expect(simpleAddRes).to.equal(simpleAddAsm)

    const stackTestVm = fs.readFileSync('test/data/StackTest/StackTest.vm', { encoding: 'utf8' })
    const stackTestAsm = fs.readFileSync('test/data/StackTest/StackTest.asm', { encoding: 'utf8' })
    const stackTestRes = vmc.compile(stackTestVm)
    expect(stackTestRes).to.equal(stackTestAsm)
  })
})
