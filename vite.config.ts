import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

export default defineConfig({
  base: '/coupon-3d-print/',
  plugins: [preact()],
})
