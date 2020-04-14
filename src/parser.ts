import { isNumber } from "./util"

export const ARITHMETIC = 'C_ARITHMETIC'
export const PUSH = 'C_PUSH'
export const POP = 'C_POP'
export const LABEL = 'C_LABEL'
export const GOTO = 'C_GOTO'
export const IF = 'C_IF'
export const FUNCTION = 'C_FUNCTION'
export const RETURN = 'C_RETURN'
export const CALL = 'C_CALL'

export class Parser {
  commands: string[]
  current: string | null
  constructor(script: string) {
    const reComment = /\/\/.*/
    const reLeadingSpace = /^\s*/
    const reTrailingSpace = /\s*$/
    this.commands = script.split('\n')
      .map(cmd => cmd.replace(reComment, ''))
      .map(cmd => cmd.replace(reLeadingSpace, ''))
      .map(cmd => cmd.replace(reTrailingSpace, ''))
      .filter(cmd => cmd !== '')
    this.current = null 
  }

  advance = () => {
    if (this.commands.length === 0) {
      throw new Error('parser has no commands')
    }
    this.current = this.commands[0]
    this.commands = this.commands.slice(1)
  }

  commandType = () => {
    if (!this.current) {
      throw new Error('current command is null')
    }
    const tokens = this.current.split(' ')
    const cmdToken = tokens[0]

    const commandTypeMap = {
      'add': ARITHMETIC,
      'sub': ARITHMETIC,
      'neg': ARITHMETIC,
      'eq': ARITHMETIC,
      'gt': ARITHMETIC,
      'lt': ARITHMETIC,
      'and': ARITHMETIC,
      'or': ARITHMETIC,
      'not': ARITHMETIC,
      'push': PUSH,
      'pop': POP,
      'label': LABEL,
      'goto': GOTO,
      'if-goto': IF,
      'function': FUNCTION,
      'call': CALL, 
      'return': RETURN,
    }

    if(!(cmdToken in commandTypeMap)) {
      throw new Error(`invalid command token '${cmdToken}'`)
    }
    return (commandTypeMap as {[key: string]: string})[cmdToken]
  }

  arg1 = () => {
    if (!this.current) {
      throw new Error('current command is null')
    }
    const tokens = this.current.split(' ')

    const cmdType = this.commandType()
    if (cmdType === ARITHMETIC) {
      return cmdType
    }

    if(tokens.length < 2) {
      throw new Error(`command '${this.current}' has no arguments`)
    }
    return tokens[1]
  }

  arg2 = () => {
    if (!this.current) {
      throw new Error('current command is null')
    }
    const tokens = this.current.split(' ')

    if(tokens.length < 3) {
      throw new Error(`command '${this.current}' has no second arguments`)
    }

    const arg2Token = tokens[2]

    if (!isNumber(arg2Token)) {
      throw new Error(`second argument '${arg2Token}' is not integer`)
    }
    return Number(arg2Token)
  }
}
