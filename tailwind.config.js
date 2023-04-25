/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {},
    colors: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}
