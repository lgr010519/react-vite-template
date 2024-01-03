module.exports = {
  extends: [
    'react-app',
    'plugin:import/recommended',
    'plugin:import/react',
    'prettier',
  ],
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
    // 模板字符串的处理``
    'no-template-curly-in-string': 'off',
    'import/order': [
      'warn',
      {
        groups: [
          // https://github.com/import-js/eslint-plugin-import/blob/v2.29.1/docs/rules/order.md
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'newlines-between': 'always', // 可选: 在不同组之间加空行
      },
    ],
    'no-new-func': 'off',
  },
  settings: {
    // 添加别名解析器
    'import/resolver': {
      'eslint-import-resolver-custom-alias': {
        alias: {
          '@': './src',
        },
        extensions: ['.js', '.jsx'],
      },
    },
  },
}
