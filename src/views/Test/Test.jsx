import { useState, useEffect } from 'react'
import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import './Test.scss'
import { DatePicker, App as AntdApp } from 'antd'
import * as apis from '@/api/index'

function Test() {
  const { message } = AntdApp.useApp()
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
  const [date, setDate] = useState(null)
  const handleChange = (value) => {
    message.info(
      `您选择的日期是: ${value ? value.format('YYYY年MM月DD日') : '未选择'}`,
    )
    setDate(value)
  }
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
      <DatePicker onChange={handleChange}></DatePicker>
      <div style={{ marginTop: 16 }}>
        当前日期：{date ? date.format('YYYY年MM月DD日') : '未选择'}
      </div>
    </div>
  )
}

export default Test
