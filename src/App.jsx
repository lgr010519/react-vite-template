import { RouterProvider } from 'react-router-dom'

import router from '@/router'

import PageSpin from './components/PageSpin'

function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<PageSpin />}
    />
  )
}

export default App
