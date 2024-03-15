import { createBrowserRouter } from 'react-router-dom'

import Home from '@/views/home'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
    },
  ],
  {
    basename: import.meta.env.BASE_URL, // 设置公共路径
  },
)

export default router
