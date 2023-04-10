# vite-react 项目

## 创建项目

[通过 pnpm 创建](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

`pnpm create vite`

## 配置`eslint`

- https://eslint.org/docs/latest/use/getting-started
- https://www.npmjs.com/package/eslint-config-react-app

1. `pnpm install --save-dev eslint`
2. `pnpm install --save-dev eslint-config-react-app`
3. 创建`.eslintrc.cjs` 在 vite 因为 package.json 中的 type 是 module，所以不能使用`.eslintrc.js`，所以使用`.eslintrc.cjs`

```
{
  "extends": ["react-app", "plugin:jsx-a11y/recommended"],
  "plugins": ["jsx-a11y"]
}
```

4. 配置自动修复配置 settings.json

```
"eslint.enable": true,
"editor.codeActionsOnSave": {
   "source.fixAll": true
 },
```

## 配置 stylelint

1. 安装 stylelint,和 scss 支持以及排序规则 `pnpm install --save-dev stylelint postcss-scss sass stylelint-config-standard-scss stylelint-order stylelint-config-hudochenkov`
2. 创建`.stylelintrc.cjs`

```
module.exports = {
  extends: [
    'stylelint-config-standard-scss',
    // 用于排序
    'stylelint-config-hudochenkov/full',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'value-list-comma-space-after': 'always',
  },
}

```

3. 配置 settings.json

```
# settings.json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    // 加入stylelint的自动修复
    "source.fixAll.stylelint": true
  },
  // 关闭vscode本身的校验，避免重复
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false,
  "stylelint.validate": ["css", "scss"],
  // 配置使用的包管理器
  "stylelint.packageManager": "pnpm",
  // 配置使用的postcss-scss
  "stylelint.customSyntax": "postcss-scss",
  "stylelint.enable": true
}
```

## 配置格式化工具 Prettier

Prettier 是用来格式化的，他与 eslint 和 stylelint 不同，他不会去修复代码错误，有关 eslint 和 stylelint 的格式化问题会交给他，所以是给他开启格式化功能，eslint 和 stylelint 开启 fixAll 功能

1. 安装并固定版本 `pnpm install --save-dev --save-exact prettier`
2. 创建配置文件.prettierrc

```
{
  "printWidth": 80,
  "tabWidth": 2,
  "singleQuote": true,
  "semi": false,
  "trailingComma": "all",
  "bracketSameLine": true,
  "bracketSpacing": true,
  "singleAttributePerLine": true,
  "proseWrap": "never",
  "overrides": [
    {
      "files": ".prettierrc",
      "options": {
        "parser": "json"
      }
    }
  ]
}
```

```
printWidth：每行最大字符数。

tabWidth：一个 tab 的空格数。

singleQuote：使用单引号代替双引号。

semi：是否需要在语句末尾加上分号。

trailingComma：在多行对象和数组字面量的最后一项后面加上逗号。

bracketSameLine：左括号是否和第一行的代码在同一行。

bracketSpacing：对象字面量中的括号之间是否添加空格。

singleAttributePerLine：每个属性是否都写在单独的一行。

proseWrap：换行符处理方式。

overrides：为特定文件配置单独的选项。
```

3. 添加 vscode 配置

添加 vscode 配置

```
# settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode",
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
}
```

### 与 eslint 结合

关闭所有不必要的或可能与 Prettier 冲突的规则。 `pnpm install --save-dev eslint-config-prettier`

添加"prettier"到文件中的“extends”数组.eslintrc.\*。确保把它放在最后，这样它就有机会覆盖其他配置。 .eslintrc.cjs

```
{
  "extends": [
    "some-other-config-you-use",
    "prettier"
  ]
}
```

### 与 stylelint 结合

从 Stylelint v15 开始，所有与样式相关的规则都已弃用。如果您使用的是 v15 或更高版本并且没有使用这些已弃用的规则，则不再需要此插件(stylelint-config-prettier)。

https://github.com/prettier/stylelint-config-prettier

## 与 git 工作流结合

### 配置 lint-staged

针对暂存的 git 文件运行 linters,他要配合 Husky 创建钩子 使用

https://github.com/okonet/lint-staged#installation-and-setup

`pnpm install --save-dev lint-staged`

单独在根目录新建.lintstagedrc 文件

```
{
  "*.{md,json}": ["prettier --write"],
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.{css,less,scss}": ["stylelint --fix", "prettier --write"]
}


```

### 配置 Husky

https://typicode.github.io/husky/#/?id=usage

1. `pnpm install husky --save-dev`
2. `npx husky install` (Enable Git hooks)
3. `pnpm pkg set scripts.prepare="husky install"` (在 package.json 中添加 prepare 脚本，确保另外的人在安装依赖时也能正确安装钩子并初始化钩子文件夹)
4. `npx husky add .husky/pre-commit "npm test"` (创建钩子) 写入的钩子内容如下：

```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install lint-staged
```

## 使用 Tailwind CSS

https://tailwindcss.com/docs/guides/vite

## 环境变量

https://cn.vitejs.dev/guide/env-and-mode.html
