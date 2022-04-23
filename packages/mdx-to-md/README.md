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

Take MDX using your favorite library:

```mdx
import { Text } from "@chakra-ui/react"

# Hello World

<Text color="tomato">Compile static MDX content to Markdown 😎</Text>

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