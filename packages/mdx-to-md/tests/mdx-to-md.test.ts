import { test } from "uvu"
import * as assert from "uvu/assert"
import { mdxToMd } from "../src"

test("Converts MDX to Markdown", async () => {
  const markdown = await mdxToMd("./test.mdx", { cwd: __dirname })
  console.log(markdown)
})

test.run()
