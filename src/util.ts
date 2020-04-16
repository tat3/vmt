export const range = (a: number) => Array.from({ length: a }, (k, i) => i)

export const clone = <T>(a: T) => JSON.parse(JSON.stringify(a))

export const isNumber = (a: string) => !isNaN(Number(a))

export const last = <T>(array: T[]) => array[array.length-1]

export const fileName = (path: string) => {
  const m = path.match(/([a-zA-Z0-9_]*?)\.vm$/)
  if (!m) {
    throw new Error(`invalid format: ${path}`)
  }
  return m[1]
}
