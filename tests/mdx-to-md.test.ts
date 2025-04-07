import { test } from "uvu"
import { resolve } from "path"
import * as assert from "uvu/assert"
import { mdxToMd } from "../src"

const snapshot = `
# mdx-to-md

Convert MDX to Markdown. 

# Install

\`\`\`bash
pnpm add mdx-to-md
\`\`\`

\`\`\`bash
npm install mdx-to-md
\`\`\`
`.trim()

test("Converts MDX to Markdown", async () => {
  const path = resolve(__dirname, "test.mdx")
  const markdown = await mdxToMd(path)

  assert.equal(markdown, snapshot)
})

test.run()
