import { Spin } from 'antd'

function PageSpin() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}>
      <Spin size="large" />
    </div>
  )
}

export default PageSpin
