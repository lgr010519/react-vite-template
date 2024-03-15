import zhCN from 'antd/locale/zh_CN'
import { ConfigProvider, App as AntdApp } from 'antd'

import styleVariables from '@/assets/styles/variables.scss.js'

// antd 封装
function AntdUi(props) {
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: {
          ...styleVariables,
        },
      }}>
      <AntdApp>{props.children}</AntdApp>
    </ConfigProvider>
  )
}

export default AntdUi
