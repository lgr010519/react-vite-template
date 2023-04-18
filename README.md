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
   全局配置：在vscode设置中搜索settings.json进行配置
   单独配置: 在项目的根目录中创建.vscode文件夹 然后在该文件夹中创建settings.json文件进行配置即可
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

## 请求工具

### axios

1. `pnpm install axios`
2. 封装

```javascript
import axios from 'axios'

export const baseUrl = import.env.VITE_APP_API_BASE_URL

// 30秒中断请求
axios.defaults.timeout = 30000

// 拦截发送请求
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = 'Bearer ' + token)

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

// 拦截返回结果
axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      let token
      if (res.headers && res.headers.authorization) {
        token = res.headers.authorization
        localStorage.setItem('token', token)
      }
      if (res.data.code !== 0) {
        if (
          res.data.code === 10127 ||
          res.data.code === 10126 ||
          res.data.code === 10117
        ) {
          // token失效
          localStorage.removeItem('token')
        }
        console.error(res.data.message)
        return Promise.reject(new Error(res.data.message))
      }
    }
    return res
  },
  (err) => {
    // TODO 会存在弹窗
    console.error('请求服务器失败！')
    return Promise.reject(err)
  },
)

/**
 * request封装
 */
function fetchData(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseUrl + url, { params: data })
    } else {
      request = axios[method](baseUrl + url, data)
    }
    request
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export const get = function (url, params) {
  return fetchData('get', url, params)
}

export const post = function (url, data) {
  return fetchData('post', url, data)
}

export const put = function (url, data) {
  return fetchData('put', url, data)
}

export const remove = function (url, params) {
  return fetchData('delete', url, params)
}

export const upload = function (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}
```

3. 新建接口调用函数

- 在 src 目录下新建 api/index.js
- 编写函数并导出

```
import {get, post, put, remove } from '../utils/fetchData'

/**
* 登录
* @param {*} data
* @returns
*/
export const login = (data) => post('api/v1/auth/login', data)
```

4. 调用接口

```
import * as apis from '../api/index'
useEffect(() => {
  async function getDownList () {
    try {
      let res = await apis.getDownList('project_class')
    } catch (error) {
      console.error('获取下拉列表错误', error)
    }
  }

  apis.getDownList('project_class1').then(res => {
    console.log(res)
  }).catch(err => {
    console.error('err', err)
  })
  getDownList()
}, [])
```

### ahook.useRequest

在组件中调用接口，推荐使用`useRequest`

https://ahooks.js.org/zh-CN/hooks/use-request/index

## 配置别名

1. vite.config.js

```
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

```

2. jsconfig.json

```
{
  "include": [
    "./src/**/*"
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 配置构建时删除`console.log`

```
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  esbuild: {
    pure: ['console.log'],
    minify: true,
  },
})

```

## 安装 antd

1. `pnpm install antd dayjs --save`
2. 引入

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './App'
import '@/assets/styles/index.scss'
import 'antd/dist/reset.css';

dayjs.locale('zh-cn')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  </React.StrictMode>,
)

```

3. 配置主题变量

- 因为这里的主题变量同样需要在 scss 中使用，所以做一下处理新建`src\assets\styles\variables.scss.js`

```
const variables = {
  colorPrimary: '#00b96b',
}

export default variables

```

4. antd 使用主题变量

```
import styleVariables from '@/assets/styles/variables.scss.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          ...styleVariables,
        },
      }}>
      <AntdApp>
        <App />
      </AntdApp>
    </ConfigProvider>

```

5. 添加主题变量到 scss 全局变量

```
import { defineConfig } from 'vite'
import path from 'path'
import react from '@vitejs/plugin-react'
import scssVariables from './src/assets/styles/variables.scss.js'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: Object.keys(scssVariables)
          .map((k) => `$${k}: ${scssVariables[k]};`)
          .join('\n'),
      },
    },
  },
  esbuild: {
    pure: ['console.log'],
    minify: true,
  },
})

```

5. 在 scss 文件中使用全局变量

```
p {
  margin-bottom: 0;
  color: $colorPrimary;
}
```

## 配置路由

1. 安装依赖

```
pnpm install react-router-dom --save
```

2. 新建路由文件 src\router\index.jsx

```
import Test from '@/views/Test/Test'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Test />,
  },
]

export default createBrowserRouter(routes)

```

3. 引入 src\main.jsx

```
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)

```

### 教程

- 路由配置
- 创建路由
- 懒加载
- 嵌套路由
- 默认路由

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// 传入routes 创建router
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    // 错误路由
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    // 嵌套路由
    children: [
      // 默认路由
      { index: true, element: <Index /> },
      // <Navigate />
      {
        index: true,
        element: (
          <Navigate
            to="/admin/manage-account"
            replace={true}
          />
        ),
      },
      // 动态路由
      {
        path: 'contacts/:contactId',
        // 懒加载
        async lazy() {
          let ContactNew = await import('./routes/contact')
          return { Component: ContactNew.default, loader: contactLoader }
        },
      },
      {
        path: 'contacts/:contactId/edit',
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: 'contacts/:contactId/destroy',
        action: destroyAction,
      },
      // 可选值
      // - /categories
      // - /en/categories
      // - /fr/categories
      {
        path: '/:lang?/categories',
        element: <Element />,
      },
    ],
  },
])

export default function Root() {
  // 导航当前状态
  /* 
    navigation.state;
    navigation.location;
    navigation.formData;
    navigation.formAction;
    navigation.formMethod;
  */
  const navigation = useNavigation()

  // 路由参数 获取动态值
  let urlParams = useParams()
  console.log(params.teamId) // "hotspur"

  // 路由查询参数
  let [searchParams, setSearchParams] = useSearchParams()

  // 路由跳转
  let navigate = useNavigate()
  function handleAddContact() {
    navigate('/contacts/new')
  }

  let location = useLocation()

  return (
    <>
      <div id="sidebar">
        <h1>React Router Contacts</h1>
        <div></div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  // NavLink 会根据当前路由的状态，给元素添加不同的 class
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? 'active' : isPending ? 'pending' : ''
                    }>
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{' '}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        // 导航的状态
        className={navigation.state === 'loading' ? 'loading' : ''}>
        // 动态路由插槽
        <Outlet />
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
```
