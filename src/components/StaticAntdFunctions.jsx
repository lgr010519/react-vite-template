import { App } from 'antd'

let message = undefined
let modal = undefined
let notification = undefined

export default function StaticAntdFunctions() {
  const staticFunctions = App.useApp()

  message = staticFunctions.message
  modal = staticFunctions.modal
  notification = staticFunctions.notification

  return null
}

// eslint-disable-next-line react-refresh/only-export-components
export { message, modal, notification }
