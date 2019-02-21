/**
 * 针对业务对axios做简单的封装
 */
import axios from 'axios'
import { Message } from 'element-ui'
import apiMap from '@/api/index'
import router from '@/router/index'
import { getAuthModel } from '@/utils/auth'
import store from '@/store/index'

const axiosInstance = axios.create()
axiosInstance.defaults.timeout = 15 * 1000

const showErrorMessage = function(msg) {
  Message.error({ message: msg })
}

axiosInstance.interceptors.request.use(
  config => {
    console.log(config)
    if (config.url && (config.url.indexOf(apiMap.login) === -1)) {
      if (!config.headers.Authorization) {
        Object.assign(config.headers, getAuthModel())
      }
      if (config.url && (config.url.indexOf(apiMap.refreshToken) !== -1)) {
        config.headers['Authorization'] = 'Bearer ' + store.state.user.base.refreshToken
      }
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

/**
 * 返回的error格式 { message: '' }
 */
const httpInstance = {
  handleResponse(instance, options = {}) {
    const { silent, axiosRes } = options
    return new Promise((resolve, reject) => {
      instance.then(response => {
        const responseData = response.data
        if (responseData.errmsg) {
          showErrorMessage(responseData.errmsg)
          reject({ code: responseData.errcode, message: responseData.errmsg })
        } else {
          resolve(axiosRes ? response : responseData)
        }
      }).catch(err => {
        if (err.code === 'ECONNABORTED') { // 超时
          if (!silent) {
            showErrorMessage('请求超时')
          }
          reject({ message: '请求超时' })
        } else {
          if (!err.response) {
            return false
          }
          const statusCode = err.response.status
          if (statusCode === 401) {
            showErrorMessage('请重新登录')
            reject({ message: '请重新登录' })
            router.push({
              path: '/login'
            })
          } else {
            let errorResponse = ''
            if (statusCode === 500) {
              errorResponse = '网络异常'
            } else {
              errorResponse = err.response.data.message || '哎呀 网络塞车了 请客官重新操作'
            }
            reject(axiosRes ? err : { message: errorResponse })
            if (!silent) {
              showErrorMessage(errorResponse)
            }
          }
        }
      })
    })
  },
  get(url, options) {
    return this.handleResponse(axiosInstance.get(url, options), options)
  },
  post(url, data, options) {
    return this.handleResponse(axiosInstance.post(url, data, options), options)
  },
  put(url, data, options) {
    return this.handleResponse(axiosInstance.put(url, data, options), options)
  },
  delete(url, options) {
    return this.handleResponse(axiosInstance.delete(url, options), options)
  },

  getImageVerCode(imageKey, opts) {
    return new Promise((resolve, reject) => {
      this.get(apiMap.getImageVerCode, {
        params: { imageKey },
        responseType: 'blob',
        ...opts
      }).then(res => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export const http = httpInstance

export default {
  install(Vue) {
    Vue.prototype.$http = httpInstance
  }
}
