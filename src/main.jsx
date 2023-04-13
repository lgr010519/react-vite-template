import React from 'react'
import ReactDOM from 'react-dom/client'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { RouterProvider } from 'react-router-dom'
import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider, App as AntdApp } from 'antd'
import router from './router'
import styleVariables from '@/assets/styles/variables.scss.js'
import '@/assets/styles/index.scss'

dayjs.locale('zh-cn')

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
        <RouterProvider router={router}></RouterProvider>
      </AntdApp>
    </ConfigProvider>
  </React.StrictMode>,
)
