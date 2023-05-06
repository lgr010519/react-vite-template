module.exports = {
  extends: ['react-app', 'prettier'],
  plugins: ['react-refresh'],
  rules: {
    'prefer-const': 2,
    'no-const-assign': 2,
    'no-undef': 2,
    'no-unused-vars': [
      2,
      {
        // 禁止存在未使用的变量、函数、函数参数
        vars: 'all',
        args: 'none',
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react-refresh/only-export-components': 'warn',
    'react/jsx-closing-tag-location': 'error',
    'react/self-closing-comp': [
      2,
      {
        component: true, // 要求对组件使用自闭合标签
        html: true, // 不要求对 HTML 标记使用自闭合标签
      },
    ],
  },
}
