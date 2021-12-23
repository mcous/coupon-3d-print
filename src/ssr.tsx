import renderToString from 'preact-render-to-string'
import { App } from './app'

export function render(): string {
  return renderToString(<App />)
}
