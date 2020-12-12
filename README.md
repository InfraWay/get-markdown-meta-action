# get-markdown-meta-action

Github Action for extracting metadata from markdown file

## Inputs

### `markdown_file`

**Required** The markdown file path of the article.

### `base_url`

Base blog's url e.g. https://myblog.com

## Outputs

### `title`

Title of the post

## Example usage
Let's assume the post markdown file's path is `./content/post.md`.

```yaml
name: tweet-from-markdown
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Read post's meta
        id: meta
        uses: infraway/get-markdown-meta-action@v1
        with:
          markdown_file: ./content/post.md
      - uses: infraway/tweet-action@v1
        with:
          status: Check out new article ${{ steps.meta.outputs.title }} - ${{ steps.meta.outputs.url }} 
```
