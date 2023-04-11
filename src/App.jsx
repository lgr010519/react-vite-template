import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as apis from './api/index'

function App() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    async function getDownList() {
      try {
        apis.getDownList('project_class')
      } catch (error) {
        console.error('获取下拉列表错误', error)
      }
    }

    apis
      .getDownList('project_class1')
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.error('err', err)
      })
    getDownList()
  }, [])
  return (
    <div className="App">
      <div>
        <a
          href="https://vitejs.dev"
          target="_blank"
          rel="noreferrer">
          <img
            src={viteLogo}
            className="logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://reactjs.org"
          target="_blank"
          rel="noreferrer">
          <img
            src={reactLogo}
            className="logo react"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="tw-underline tw-font-bold">Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
