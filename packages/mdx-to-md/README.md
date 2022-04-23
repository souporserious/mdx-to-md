<!--- This README was auto-generated from "packages/mdx-to-md/src/README.mdx" using "yarn build" --> 

 # mdx-to-md

Convert MDX to Markdown. 

## Why?

This library is most useful for generating README.md files [like the one you're reading](/packages/mdx-to-md/src/README.mdx).

# Install

```bash
yarn add mdx-to-md
```

```bash
npm install mdx-to-md
```

## Usage

Start with MDX:

```mdx
import { name, description } from "./package.json"

# {name}

{description}

# Install

<pre>
  <code className="language-bash">yarn add {name}</code>
</pre>

```

And convert it to Markdown:

```ts
import { writeFile } from "fs/promises"
import { mdxToMarkdown } from "mdx-to-md"

const markdown = await mdxToMarkdown("README.mdx")
const banner = `This README was auto-generated using "yarn build:readme"`
const readme = `<!--- ${banner} --> \n\n ${markdown}`

await writeFile("README.md", readme)

console.log("📝 Converted README.mdx -> README.md")

```

Which outputs:

```md
# mdx-to-md

Convert MDX to Markdown.

# Install

yarn add mdx-to-md

```

## CLI

Coming Soon

```bash
mdx-to-md README.mdx

```