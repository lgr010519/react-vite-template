import axios from 'axios'

import { downloadFile } from '@/utils'
import { message } from '@/components/StaticAntdFunctions'

class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
      timeout: 30000,
    })

    // 拦截发送请求
    this.instance.interceptors.request.use(
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
    this.instance.interceptors.response.use(
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
            return Promise.reject(new Error(res.data.msg))
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
          return Promise.reject(new Error('请求服务器失败！'))
        }
        return res
      },
      (err) => {
        const { message: errMessage, response, config } = err
        let msg = errMessage ? errMessage : '请求服务器失败！'
        if (response) {
          const { data } = err.response
          if (data) {
            if (data.msg) {
              msg = data.msg
            }
            if (
              data.code === 10127 ||
              data.code === 10126 ||
              data.code === 10128
            ) {
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
  }

  /**
   * request封装
   */
  _fetchData(method, url, data = {}, config = { showMsg: true }) {
    return new Promise((resolve, reject) => {
      let request
      if (method === 'get' || method === 'delete') {
        request = this.instance[method](url, { params: data, ...config })
      } else {
        request = this.instance[method](url, data, { ...config })
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

  /**
   * get
   * @param {*} url
   * @param {*} params
   * @returns
   */
  get(url, params) {
    return this._fetchData('get', url, params)
  }

  /**
   * post
   * @param {*} url
   * @param {*} data
   * @returns
   */
  post(url, data) {
    return this._fetchData('post', url, data)
  }

  /**
   * put
   * @param {*} url
   * @param {*} data
   * @returns
   */
  put(url, data) {
    return this._fetchData('put', url, data)
  }

  /**
   * delete
   * @param {*} url
   * @param {*} params
   * @returns
   */
  remove(url, params) {
    return this._fetchData('delete', url, params)
  }

  /**
   * upload
   * @param {*} url
   * @param {*} data
   * @returns
   */
  upload(url, data) {
    const formData = new FormData()
    Object.keys(data).forEach((child) => {
      formData.append(child, data[child])
    })
    return this.post(url, formData)
  }
}

const baseURL = import.meta.env.VITE_API_BASE_URL

const httpClient = new HttpClient(baseURL)

export default httpClient

/**
 * 上传文件地址
 */
export const uploadURL = baseURL + '/api/v1/file/uploads'

/**
 * 上传文件
 * @param {*} data
 * @returns
 */
export const uploadFile = (data) => {
  return httpClient.upload(`/api/v1/file/uploads`, data)
}
