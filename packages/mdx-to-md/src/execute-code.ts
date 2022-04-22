import { resolve } from "path"
import { transformCode } from "./transform-code"

export async function executeCode(codeString: string, cwd?: string) {
  const transformedCode = await transformCode(codeString)
  const exports: Record<string, unknown> = {}
  const result = new Function("exports", "require", transformedCode)
  const localRequire = (path: string) => {
    const isRelativePath = path.startsWith(".")
    const parsedPath = isRelativePath ? resolve(cwd ?? process.cwd(), path) : path
    return require(parsedPath)
  }

  result(exports, localRequire)

  return exports.default
}
