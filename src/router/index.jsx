import Test from '@/views/Test/Test'
// import About from '@/views/About/About'
import { createBrowserRouter } from 'react-router-dom'

const routes = [
  {
    path: '/',
    element: <Test />,
  },
  {
    path: '/about',
    async lazy() {
      const About = await import('@/views/About/About')

      return {
        Component: About.default,
      }
    },
  },
  // {
  //   path: '/about2',
  //   element: async () => {
  //     const About2 = await import('@/views/About2/About')

  //     console.log(About2)

  //     return About2
  //   },
  // },
]

export default createBrowserRouter(routes)