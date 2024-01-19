// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import '@/plugins/dayjs'
// import { Provider } from 'react-redux'

// import AntdUi from './plugins/antd'
// import '@/assets/styles/index.scss'
// import App from './App'
// import store from './store'

// 对外暴露一系列方法 使用户得以结构使用

import sso from '@/utils/index.ts'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <AntdUi>
//         <App />
//       </AntdUi>
//     </Provider>
//   </React.StrictMode>,
// )
sso.loginAuth(
  {
    username: '17612721028',
    password: 'Youpin123',
  },
  {
    apiPrefix: 'https://eiam-portal-service.test.youpin-k8s.net',
    client_id: '38442ddb4f9327f44509795a5ec562e8',
    redirect_uri: '',
  },
)
export default sso
