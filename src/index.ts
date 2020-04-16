import fs from 'fs'

import { VMCompiler } from './vmCompiler'
import { fileName } from './util'

const vmt = (vmPath: string) => {
  const code = fs.readFileSync(vmPath, { encoding: 'utf8' })
  const functionName = fileName(vmPath)
  const vmc = new VMCompiler()
  console.log(vmc.compile(code, functionName))
}

vmt(process.argv[2])
