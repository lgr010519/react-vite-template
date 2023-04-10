module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    // 用于排序
    'stylelint-config-hudochenkov/full',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'selector-max-type': 5,
    'selector-max-id': 5,
  },
}
