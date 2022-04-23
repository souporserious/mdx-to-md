import { resolve } from "path"
import { writeFile } from "fs/promises"
import { mdxToMd } from "mdx-to-md"
import { watch } from "chokidar"

const sourceReadme = resolve(process.cwd(), "../mdx-to-md/src/README.mdx")

async function build() {
  const markdown = await mdxToMd(sourceReadme)
  const banner = `This README was auto-generated from "packages/mdx-to-md/src/README.mdx" using "yarn build"`
  const readme = `<!--- ${banner} --> \n\n ${markdown}`

  await writeFile("../mdx-to-md/README.md", readme)

  console.log("📝 Converted README.mdx -> README.md")
}

if (process.argv.includes("--watch")) {
  watch(sourceReadme).on("change", build)
} else {
  build()
}
