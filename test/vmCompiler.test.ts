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
    const asm = vmc.compile(script, 'func')
    expect(asm).to.equal(`    @256
    D=A
    @SP
    M=D`)
  })

  it('generate assembly from sample vm scripts', () => {
    const doTest = (testPath: string, testName: string) => {
      const vm = fs.readFileSync(`${testPath}/${testName}/${testName}.vm`, { encoding: 'utf8' })
      const asm = fs.readFileSync(`${testPath}/${testName}/${testName}.asm`, { encoding: 'utf8' })
      const res = vmc.compile(vm, testName)
      expect(res).to.equal(asm)
    }

    doTest('test/data', 'SimpleAdd')
    doTest('test/data', 'StackTest')
    doTest('test/data', 'BasicLoop')
    doTest('test/data', 'FibonacciSeries')
    doTest('test/data', 'SimpleFunction')

    const doTest2 = (testPath: string, testName: string) => {
      const vm = fs.readFileSync(`${testPath}/${testName}.vm`, { encoding: 'utf8' })
      const asm = fs.readFileSync(`${testPath}/${testName}.asm`, { encoding: 'utf8' })
      const res = vmc.compile(vm, testName)
      expect(res).to.equal(asm)
    }

    doTest2('test/data/FibonacciElement', 'Main')
    doTest2('test/data/FibonacciElement', 'Sys')
    doTest('test/data', 'FibonacciElement')

    doTest2('test/data/StaticsTest', 'Class1')
    doTest2('test/data/StaticsTest', 'Class2')
    doTest2('test/data/StaticsTest', 'Sys')

    doTest2('test/data/NestedCall', 'Sys')
  })
})
