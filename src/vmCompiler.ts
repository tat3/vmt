import { Parser, PUSH, POP, ARITHMETIC } from "./parser"
import { ArithmeticCompiler } from "./arithmeticCompiler"
import { PushCompiler } from "./pushCompiler"
import { PopCompiler } from "./popCompiler"

export class VMCompiler {
  compile = (script: string, functionName: string) => {
    const parser = new Parser(script)
    const arithmeticCompiler = new ArithmeticCompiler()
    const pushCompiler = new PushCompiler()
    const popCompiler = new PopCompiler()

    pushCompiler.setFunctionName(functionName)
    popCompiler.setFunctionName(functionName)

    let asm = `    @256
    D=A
    @SP
    M=D`

    while (true) {
      try {
        parser.advance()
      } catch {
        break
      }
      const cmdType = parser.commandType()

      switch (cmdType) {
        case PUSH:
          asm += '\n' + pushCompiler.compile(parser.arg1(), parser.arg2())
          break

        case POP:
          asm += '\n' + popCompiler.compile(parser.arg1(), parser.arg2())
          break

        case ARITHMETIC:
          asm += '\n' + arithmeticCompiler.compile(parser.arg1())          
          break
    
        default:
          break
      }
    }
    return asm
  }
}