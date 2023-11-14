import axios from 'axios'
import { downloadFile } from '@/utils'
import { message } from 'antd'

export const baseUrl = import.meta.env.VITE_APP_API_BASE_URL

// 30秒中断请求
axios.defaults.timeout = 30000

// 拦截发送请求
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = 'Bearer ' + token)

    return config
  },
  (err) => {
    return Promise.reject(err)
  },
)

// 拦截返回结果
axios.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  (res) => {
    const { showMsg, responseType } = res.config
    if (res.status === 200) {
      // 截取新的token并存储
      if (res.headers && res.headers.authorization) {
        const token = res.headers.authorization.replace('Bearer ', '')
        localStorage.setItem('token', token)
      }

      if (res.data.code && res.data.code !== 0) {
        if (
          res.data.code === 10127 ||
          res.data.code === 10126 ||
          res.data.code === 10117
        ) {
          // token失效
          localStorage.removeItem('token')
        }
        showMsg && message.error(res.data.msg)
        return Promise.reject(res.data.msg)
      }

      // 导出下载文件的情况 返回格式为blob 并且 非JSON格式 (当为blob时，data直接就是一个blob，不会是一个标准接口返回格式)
      if (
        responseType &&
        responseType === 'blob' &&
        !Object.prototype.hasOwnProperty.call(res.data, 'code')
      ) {
        const contentDisposition = res.headers.get('content-disposition')
        const fileNameOriginal = contentDisposition
          .split(';')[1]
          .trim()
          .replace(/^filename=/, '')
        const fileName = fileNameOriginal
          ? decodeURIComponent(fileNameOriginal)
          : 'download'
        // 下载文件
        downloadFile(res.data, fileName)
        return res
      }
    } else {
      showMsg && message.error('请求服务器失败！')
      return Promise.reject('请求服务器失败！')
    }
    return res
  },
  // 超出 2xx 范围的状态码都会触发该函数。
  (err) => {
    const { message, response, config } = err
    let msg = message ? message : '请求服务器失败！'
    if (response) {
      const { data } = err.response
      if (data) {
        if (data.msg) {
          msg = data.msg
        }
        if (data.code === 10127 || data.code === 10126 || data.code === 10117) {
          // token失效
          localStorage.removeItem('token')
          // 清空用户信息
          localStorage.removeItem('userInfo')
          // 跳转登录
          window.location.href = '/login'
        }
      }
    }
    config.showMsg && message.error(msg)
    err.message = msg
    return Promise.reject(err)
  },
)

/**
 * request封装
 */
function fetchData(method, url, data = {}) {
  return new Promise((resolve, reject) => {
    let request
    if (method === 'get' || method === 'delete') {
      request = axios[method](baseUrl + url, { params: data })
    } else {
      request = axios[method](baseUrl + url, data)
    }
    request
      .then((res) => {
        resolve(res)
      })
      .catch((e) => {
        reject(e)
      })
  })
}

export const get = function (url, params) {
  return fetchData('get', url, params)
}

export const post = function (url, data) {
  return fetchData('post', url, data)
}

export const put = function (url, data) {
  return fetchData('put', url, data)
}

export const remove = function (url, params) {
  return fetchData('delete', url, params)
}

export const upload = function (url, data) {
  const formData = new FormData()
  Object.keys(data).forEach((child) => {
    formData.append(child, data[child])
  })
  return post(url, formData)
}
