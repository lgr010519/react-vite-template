/* eslint-disable import/no-anonymous-default-export */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: 'tw-',
  theme: {
    extend: {},
    colors: {
      primary: '#186DEC',
      borderBase: '#DCDFE6',
      textPrimary: '#303133',
      textRegular: '#606266',
      textSecondary: '#909399',
      textPlaceholder: '#C0C4CC',
    },
  },
  plugins: [],
}
