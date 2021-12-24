import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import { read, readSync, write } from 'to-vfile'
import { rehype } from 'rehype'
import { isCssLink } from 'hast-util-is-css-link'
import rehypeParse from 'rehype-parse'
import rehypeRewrite from 'rehype-rewrite'
import rehypeFormat from 'rehype-format'
import removeUnusedCss from 'rehype-remove-unused-css'

import ssr from '../dist-ssr/ssr.js'

const DIST_DIR = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const TEMPLATE = join(DIST_DIR, 'index.html')

const htmlParser = unified().use(rehypeParse, { fragment: true })

const processor = rehype()
  .use(rehypeRewrite, {
    rewrite: (node) => {
      if (node.tagName == 'body') {
        const appFragment = htmlParser.parse(ssr.render())
        node.children = [...appFragment.children, ...node.children]
      } else if (isCssLink(node)) {
        const href = node.properties.href
        const filePath = href.replace('/coupon-3d-print', DIST_DIR)
        const contents = readSync(filePath)
        node.tagName = 'style'
        node.properties = {}
        node.children = [{ type: 'text', value: String(contents) }]
      }
    },
  })
  .use(removeUnusedCss)
  .use(rehypeFormat)
  .freeze()

read(TEMPLATE)
  .then((file) => processor.process(file))
  .then((result) => write(result))
  .then(() => console.log('App prerendered'))
  .catch((error) => console.error('Prerender failed', error))
