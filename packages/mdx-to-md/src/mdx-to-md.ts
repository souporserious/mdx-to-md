import type { CompileOptions } from "@mdx-js/mdx"
import { NodeHtmlMarkdown } from "node-html-markdown"
import { renderToString } from "react-dom/server"
import { createElement } from "react"
import { readFile } from "fs/promises"
import { dirname, resolve } from "path"
import { executeCode } from "./execute-code"

const htmlToMarkdown = new NodeHtmlMarkdown()

/**
 * Converts MDX to Markdown. This is useful for rendering dynamic README.md files.
 *
 * @example
 * import { readFile } from "fs/promises"
 * import { mdxToMd } from "mdx-to-md"
 *
 * const contents = await readFile('README.mdx', 'utf-8')
 * const markdown = await mdxToMd(contents)
 */
export async function mdxToMd(
  /** The path to the MDX file. */
  path: string,
  {
    cwd,
    compileOptions,
  }: {
    /** The current working directory. Defaults to process.cwd(). */
    cwd?: string

    /** MDX [compile options](https://mdxjs.com/packages/mdx/#compilefile-options) */
    compileOptions?: CompileOptions
  } = {}
) {
  const contents = await readFile(resolve(cwd ?? process.cwd(), path), "utf-8")
  const { compile } = await import("@mdx-js/mdx")
  const compiledCode = await compile(contents, compileOptions)
  const executedCode = await executeCode(compiledCode.value.toString(), dirname(path))
  const element = createElement(executedCode as any)
  const html = renderToString(element)
  const markdown = htmlToMarkdown.translate(html)

  return markdown
}
