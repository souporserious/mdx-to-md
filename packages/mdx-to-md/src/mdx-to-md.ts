import { NodeHtmlMarkdown } from "node-html-markdown"
import { bundleMDX } from "mdx-bundler"
import type { BundleMDX } from "mdx-bundler/dist/types"
import { getMDXComponent } from "mdx-bundler/client"
import { createElement } from "react"
import { renderToString } from "react-dom/server"
import { readFile } from "fs/promises"
import { dirname } from "path"

const htmlToMarkdown = new NodeHtmlMarkdown()

/**
 * Converts MDX to Markdown. This is useful for rendering dynamic README.md files.
 *
 * @example
 * import { resolve } from "path"
 * import { mdxToMd } from "mdx-to-md"
 *
 * const markdown = await mdxToMd(resolve(process.cwd(), "README.mdx"))
 */
export async function mdxToMd<
  Frontmatter extends {
    [key: string]: any
  }
>(
  /** The path to the MDX file. */
  path: string,

  /** Configure internal library options. */
  options?: Pick<BundleMDX<Frontmatter>, "esbuildOptions" | "grayMatterOptions" | "mdxOptions">
) {
  const contents = await readFile(path, "utf-8")
  const { code } = await bundleMDX({ source: contents, cwd: dirname(path), ...options })
  const component = getMDXComponent(code)
  const element = createElement(component)
  const html = renderToString(element)
  const markdown = htmlToMarkdown.translate(html)

  return markdown
}
