import local from '@/utils/local'
import { http } from '@/utils/http'
import apiMap from '@/api/index'
import { Message } from 'element-ui'

const tokenRefreshInSeconds = 20 * 60 // 过期前20分钟刷新

let base = {
  userId: '',
  userName: '',
  token: '',
  refreshToken: '',
  refreshExpire: 0,
  expire: 0,
  ents: [],
  entId: '',
  entName: ''
}

if (local.get('base')) { // 页面刷新后还原数据状态
  base = local.get('base')
}

window.getBase = function() { // 便于后端调试
  return {
    userId: base.userId,
    userName: base.userName,
    entId: base.entId,
    entName: base.entName
  }
}

const refreshToken = function() {
  const href = window.location.href
  if (href.indexOf('/login') !== -1 || href.indexOf('/password-reset') !== -1) {
    return
  }
  if (base.token) {
    const diffInSeconds = Math.floor((base.expire - new Date().getTime()) / 1000)
    if (diffInSeconds < tokenRefreshInSeconds) {
      http.get(apiMap.refreshToken, { silent: true }).then(data => { // 更新token
        Object.assign(base, data)
        local.set('base', base)
      }).catch(_ => {
      })
    }
  }
}

setInterval(_ => { // 每一分钟去校验token是否需要更新
  refreshToken()
}, 60 * 1000)

const user = {
  state: {
    base: base,
    status: '',
    code: '',
    token: local.get('token'),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    }
  },
  mutations: {
    SET_LOGIN_INFO: (state, data) => { // 保存登录数据
      if (data.ents.length === 1) { // 单租户直接登录
        data.entId = data.ents[0].entId
      }
      data.permissions = data.permissions || []
      local.set('base', data)
      Object.assign(state.base, data)
    },
    SET_COMPANY_ID(state, val) {
      const newBase = Object.assign(state.base, {
        entId: val
      })
      local.set('base', newBase)
    },
    CLEAR_LOGIN_INFO(state) { // 用户登出
      local.remove('base')
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting
    },
    SET_STATUS: (state, status) => {
      state.status = status
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const extendData = {}
      if (userInfo.imageCode) {
        extendData.params = extendData.params || {}
        extendData.params.imageVerifyCode = {
          imageCode: userInfo.imageCode,
          imageKey: userInfo.imageKey
        }
      }
      if (userInfo.verifyCode) {
        extendData.params = extendData.params || {}
        extendData.params.noticeVerifyCode = {
          verifyCode: userInfo.verifyCode,
          verifyKey: userInfo.verifyKey,
          code: 'B001',
          target: userInfo.account.trim()
        }
      }
      return new Promise((resolve, reject) => {
        http.post('/login', {
          account: userInfo.account.trim(),
          password: userInfo.password.trim(),
          ...extendData
        }, { silent: true, axiosRes: true }).then(res => {
          const data = res.data
          commit('SET_LOGIN_INFO', data)
          resolve(data)
        }).catch(error => {
          // console.log(error)
          reject(error)
        })
      })
    },
    LogOut({ commit, state }) { // 登出
      return new Promise((resolve, reject) => {
        http.delete(apiMap.logout).then(() => {
          commit('CLEAR_LOGIN_INFO')
          Message.success({ message: '登出成功' })
          setTimeout(_ => {
            location.reload()
          }, 1000)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
