import chai from 'chai'

import * as parser from '../src/parser'
import { range } from '../src/util'

const expect = chai.expect
const Parser = parser.Parser

const scriptCommon = `
  add
  sub
  neg
  eq
  gt
  lt
  and
  or
  not
  push argument 0
  push local 10
  push static 12
  push constant 1
  push this 1
  push that 1
  push pointer 1
  pop temp 1
  label SP
  goto LCL
  if-goto ARG
  if-goto THIS
  if-goto THAT
  if-goto R13
  if-goto R14
  if-goto R15
  if-goto HOGE.j
  if-goto hoge.j
  function hoge 1
  call hoge 1
  return
`

describe('parser test', () => {
  it('can be initiated', () => {
    const script = ``
    const p = new Parser(script)
    expect(p).not.to.be.null
  })

  it('store script as command array', () => {
    const script = `
      // comment
      add // comment
      sub
    `
    const p = new Parser(script)
    expect(p.commands).to.deep.equal(['add', 'sub'])
    expect(p.current).to.equal(null)
  })

  it('parse single line with advance', () => {
    const script = `
      // comment
      add // comment
      sub
    `
    const p = new Parser(script)
    expect(p.current).to.equal(null)

    p.advance()
    expect(p.current).to.equal('add')
    expect(p.commands).to.deep.equal(['sub'])
  })

  it('find command type of current line', () => {
    const types = [
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.ARITHMETIC,
      parser.PUSH,
      parser.PUSH,
      parser.PUSH,
      parser.PUSH,
      parser.PUSH,
      parser.PUSH,
      parser.PUSH,
      parser.POP,
      parser.LABEL,
      parser.GOTO,
      parser.IF,
      parser.IF,
      parser.IF,
      parser.IF,
      parser.IF,
      parser.IF,
      parser.IF,
      parser.IF,
      parser.FUNCTION,
      parser.CALL, 
      parser.RETURN,
    ]

    const p = new Parser(scriptCommon)

    range(30).forEach(i => {
      p.advance()
      expect(p.commandType()).to.equal(types[i])
    })

    expect(p.advance).to.throw('parser has no commands')
  })

  it('find arg1 of current line', () => {
    const arg1 = [
      'add',
      'sub',
      'neg',
      'eq',
      'gt',
      'lt',
      'and',
      'or',
      'not',
      'argument',
      'local',
      'static',
      'constant',
      'this',
      'that',
      'pointer',
      'temp',
      'SP',
      'LCL',
      'ARG',
      'THIS',
      'THAT',
      'R13',
      'R14',
      'R15',
      'HOGE.j',
      'hoge.j',
      'hoge',
      'hoge',
    ]

    const p = new Parser(scriptCommon)

    range(29).forEach(i => {
      p.advance()
      expect(p.arg1()).to.equal(arg1[i])
    })

    p.advance()
    expect(p.arg1).to.throw('command \'return\' has no arguments')
  })

  it('find arg2 of current line', () => {
    const script = `
      push argument 0
      push local 10
      push static 12
      push constant 1
      push this 1
      push that 1
      push pointer 1
      pop temp 1
      function hoge 1
      call hoge 1

      if-goto hoge.j
      push argument a
    `

    const arg2 = [0, 10, 12, 1, 1, 1, 1, 1, 1, 1]

    const p = new Parser(script)

    range(10).forEach(i => {
      p.advance()
      expect(p.arg2()).to.equal(arg2[i])
    })

    p.advance()
    expect(p.arg2).to.throw('command \'if-goto hoge.j\' has no second arguments')

    p.advance()
    expect(p.arg2).to.throw('second argument \'a\' is not integer')

  })

})
