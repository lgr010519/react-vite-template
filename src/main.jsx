import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/plugins/dayjs'
import AntdUi from './plugins/antd'
import '@/assets/styles/index.scss'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AntdUi>
      <App></App>
    </AntdUi>
  </React.StrictMode>,
)
