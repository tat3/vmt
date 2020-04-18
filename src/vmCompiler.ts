import { Parser, PUSH, POP, ARITHMETIC, LABEL, GOTO, IF, FUNCTION, CALL, RETURN } from "./parser"
import { ArithmeticCompiler } from "./arithmeticCompiler"
import { PushCompiler } from "./pushCompiler"
import { PopCompiler } from "./popCompiler"
import { FlowCompiler } from './flowCompiler'
import { FunctionCompiler } from "./functionCompiler"

export class VMCompiler {
  compile = (script: string, functionName: string) => {
    const parser = new Parser(script)
    const arithmeticCompiler = new ArithmeticCompiler()
    const pushCompiler = new PushCompiler()
    const popCompiler = new PopCompiler()
    const flowCompiler = new FlowCompiler()
    const functionCompiler = new FunctionCompiler()

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

        case LABEL:
          asm += '\n' + flowCompiler.compileLabel(parser.arg1())          
          break
   
        case GOTO:
          asm += '\n' + flowCompiler.compileGoto(parser.arg1())          
          break

        case IF:
          asm += '\n' + flowCompiler.compileIf(parser.arg1())          
          break

        case FUNCTION:
          asm += '\n' + functionCompiler.compileFunction(parser.arg1(), parser.arg2())          
          break

        case CALL:
          asm += '\n' + functionCompiler.compileCall(parser.arg1(), parser.arg2())          
          break

        case RETURN:
          asm += '\n' + functionCompiler.compileReturn()          
          break

        default:
          break
      }
    }
    return asm
  }
}