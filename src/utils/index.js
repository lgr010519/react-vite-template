/**
 * 后端返回blob对象进行下载
 *  + axios 配置 responseType: 'blob'
 * @param {*} data
 * @param {*} fileName
 */
export function downloadFile(data, fileName = 'download') {
  const blob = new Blob([data])
  const downloadElement = document.createElement('a')
  // 创建下载的链接
  const href = window.URL.createObjectURL(blob)
  downloadElement.href = href
  // 下载后文件名
  downloadElement.download = fileName
  document.body.appendChild(downloadElement)
  // 点击下载
  downloadElement.click()
  // 下载完成移除元素
  document.body.removeChild(downloadElement)
  // 释放掉blob对象
  window.URL.revokeObjectURL(href)
}
