<!--- This markdown file was auto-generated from "src/README.mdx" -->

# mdx-to-md

Convert MDX to Markdown. 

## Why?

This library is most useful for generating README.md files [like the one you're reading](/packages/mdx-to-md/src/README.mdx).

# Install

```bash
pnpm add mdx-to-md
```

```bash
npm install mdx-to-md
```

## CLI

```bash
mdx-to-md [sourcePath] [outPath]

```

In the simplest use case, you can run the CLI and it will output the converted Markdown relative to the current working directory the script was run in:

```bash
pnpm mdx-to-md README.mdx

```

## Node

Start with MDX:

```mdx
import { name, description } from "./package.json"

# {name}

{description}

# Install

<pre>
  <code className="language-bash">pnpm add {name}</code>
</pre>

```

And convert it to Markdown:

```ts
import { writeFile } from "fs/promises"
import { mdxToMd } from "mdx-to-md"

const markdown = await mdxToMd("README.mdx")
const banner = `This README was auto-generated using "pnpm build:readme"`
const readme = `<!--- ${banner} --> \n\n ${markdown}`

await writeFile("README.md", readme)

console.log("📝 Converted README.mdx -> README.md")

```

Which outputs:

```md
# mdx-to-md

Convert MDX to Markdown.

# Install

pnpm add mdx-to-md

```