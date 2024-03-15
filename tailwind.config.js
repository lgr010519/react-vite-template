import variables from './src/assets/styles/variables.scss.js'

/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {
      colors: {
        ...variables,
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
