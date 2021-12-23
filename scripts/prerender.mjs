import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { unified } from 'unified'
import { read, write } from 'to-vfile'
import { rehype } from 'rehype'
import { isCssLink } from 'hast-util-is-css-link'
import rehypeParse from 'rehype-parse'
import rehypeRewrite from 'rehype-rewrite'
import rehypeFormat from 'rehype-format'
import rehypeUrls from 'rehype-urls'
import rehypeInline from 'rehype-inline'
import removeUnusedCss from 'rehype-remove-unused-css'

import ssr from '../dist-ssr/ssr.js'

const DIST_DIR = join(dirname(fileURLToPath(import.meta.url)), '../dist')
const TEMPLATE = join(DIST_DIR, 'index.html')

const htmlParser = unified().use(rehypeParse, { fragment: true })

const processor = rehype()
  .use(rehypeRewrite, {
    selector: '#app',
    rewrite: (node) => {
      const appFragment = htmlParser.parse(ssr.render())
      node.children = appFragment.children
    },
  })
  .use(rehypeUrls, (url, node) => {
    if (isCssLink(node) && url.path) {
      return join(DIST_DIR, url.path)
    }
  })
  .use(rehypeInline, {
    css: true,
    js: false,
    images: false,
    imports: false,
    svgElements: false,
  })
  .use(removeUnusedCss)
  .use(rehypeFormat)
  .freeze()

read(TEMPLATE)
  .then((file) => processor.process(file))
  .then((result) => write(result))
  .then(() => console.log('App prerendered'))
  .catch((error) => console.error('Prerender failed', error))
