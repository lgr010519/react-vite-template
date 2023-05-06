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
    'value-list-comma-space-after': 'always',
    'selector-class-pattern': null,
    'declaration-no-important': null,
    'selector-pseudo-class-no-unknown': null,
    'no-descending-specificity': null,
  },
}
