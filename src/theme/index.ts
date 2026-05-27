import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          red: { value: '#ff3337' },
          dark: { value: '#404254' },
          slate: { value: '#686a7d' },
          purple: { value: '#857eea' },
          tint: { value: '#f3f2fd' },
          deepAccent: { value: '#2d2028' },
          toastBg: { value: '#46474F' },
          toastGreen: { value: '#74C898' },
          neutral: { value: '#9697a2' },
          bg: { value: '#f4f4f4' },
        },
      },
      fonts: {
        body: { value: "'Inter', system-ui, sans-serif" },
        heading: { value: "'Inter', system-ui, sans-serif" },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
