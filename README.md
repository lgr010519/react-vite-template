# vite-react 项目

最终项目配置 http://code-base.yoyohr.com/youpin-frontend-team/vite-react-project.git

## 创建项目

[通过 pnpm 创建](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project)

`pnpm create vite`

## 配置 `eslint`

- https://eslint.org/docs/latest/use/getting-started
- https://www.npmjs.com/package/eslint-config-react-app

1. `pnpm install --save-dev eslint`
2. `pnpm install --save-dev eslint-config-react-app eslint-plugin-react-refresh`
3. 创建 `.eslintrc.cjs` 在 vite 因为 package.json 中的 type 是 module，所以不能使用 `.eslintrc.js`，所以使用 `.eslintrc.cjs`

```
{
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
    react/jsx-closing-tag-location': 'error',
    'react/self-closing-comp': [
      2,
      {
        component: true, // 要求对组件使用自闭合标签
        html: true, // 不要求对 HTML 标记使用自闭合标签
      },
    ],
  },
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
2. 创建 `.stylelintrc.cjs`

```
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

1. 添加 vscode 配置

   1.1：全局配置 : 在 vsCode 设置中搜索 settings.json 进行配置即可

   1.2：单独配置 : 在项目的根目录下创建.vscode 文件夹 然后在该文件夹中创建 settings.json 文件进行配置即可

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

## 使用 css module

```javascript
// 创建.modult.scss文件并且引入
import style from './index.module.scss'

const Login = () => {
  const [formType, setFormType] = useState('login')
  const userInfo = useSelector(getUserInfo)
  const handleChangeType = (type) => {
    setFormType(type)
  }

  const FormCom = formConf[formType]
  useEffect(() => {
    console.log(userInfo)
  }, [userInfo])
  return (
    // 通过引用类名的方式使用
    <div className={style.container}>
      <div className={style.formBox}>
        <FormCom onChangeType={handleChangeType} />
      </div>
      {/* <Footer /> */}
    </div>
  )
}
```

## 环境变量

https://cn.vitejs.dev/guide/env-and-mode.html

## 请求工具

### axios

1. `pnpm install axios`
2. 封装

```javascript
import axios from 'axios'

export const baseUrl = process.env.VITE_APP_API_BASE_URL

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

`pnpm add ahooks` 在组件中调用接口，推荐使用 `useRequest`

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

## 配置构建时删除 `console.log`

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

- 因为这里的主题变量同样需要在 scss 中使用，所以做一下处理新建 `src\assets\styles\variables.scss.js`

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

## 全局状态管理(react-redux)

https://redux.js.org/tutorials/quick-start

### 安装 Redux Toolkit 和 React Redux

```
pnpm install @reduxjs/toolkit react-redux
```

### 注册全局状态存储容器(Store)

```javascript
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {},
})
```

### 定义存储状态以及修改状态的模块

```javascript
import { createSlice } from '@reduxjs/toolkit'
const userInfoJsonStr = localStorage.getItem('userInfo')
// 用户权限状态
export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    token: localStorage.getItem('token') || '',
    // 用户信息
    userInfo:
      userInfoJsonStr && userInfoJsonStr !== 'undefined'
        ? JSON.parse(userInfoJsonStr)
        : { name: '我是憨猪' },
  },
  reducers: {
    setUserToken: (state, action) => {
      /**
       * Redux Toolkit允许我们在reducers中编写“突变”逻辑。
       * 它实际上并没有改变状态，因为它使用了Immer库，
       * 它检测到“草稿状态”的变化并产生全新的
       * 基于这些更改的不可变状态
       *
       * Tips：接收参数的时候会得到一个对象
       *  action : {
       *    type:'当前状态模块的name/当前方法名',
       *    payload:'接收的参数'
       *  }
       *
       */
      localStorage.setItem('token', action.payload)
      state.token = action.payload
    },
    getUserToken: (state) => state.token,
    getUserInfo: (state) => state.userInfo,
  },
})

// 单独导出action方法 方便使用
export const { setUserToken, getUserToken, getUserInfo } =
  permissionsSlice.actions
// 导出该Store用于命名注册
export default permissionsSlice.reducer
```

### 提供状态模块给 React

```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import zhCN from 'antd/locale/zh_CN'
import styleVariables from '@/assets/style/variables.scss.js'
import { ConfigProvider } from 'antd'
import store from './store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          ...styleVariables,
        },
      }}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
```

### 在 React 组件中使用 Redux 状态和操作

```javascript
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserInfo, getUserToken, setUserToken } from '@/store/permissions'
import { Button, Input } from 'antd'
export default function Login() {
  const dispatch = useDispatch()
  // 获取状态
  const token = useSelector((state) => {
    return state.permissions.token
  })
  // dispatch 用于调用 action 方法
  const userInfo = () => {
    dispatch(setUserToken(value))
  }
  // InputValue
  const [value, setValue] = useState('')
  useEffect(() => {
    console.log('token状态改变了', token)
  }, [token])
  return (
    <div>
      <Input
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
      <Button
        onClick={() => {
          userInfo()
        }}
        type="primary">
        确定
      </Button>
      <h2>{token}</h2>
    </div>
  )
}
```
