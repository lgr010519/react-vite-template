import React from 'react'
import ReactDOM from 'react-dom/client'
import '@/plugins/dayjs'
import { Provider } from 'react-redux'

import AntdUi from './plugins/antd'
import '@/assets/styles/index.scss'
import App from './App'
import store from './store'
import StaticAntdFunctions from './components/StaticAntdFunctions'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AntdUi>
        <App />
        <StaticAntdFunctions />
      </AntdUi>
    </Provider>
  </React.StrictMode>,
)
