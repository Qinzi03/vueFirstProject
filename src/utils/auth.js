import Cookies from 'js-cookie'
import store from '@/store'
const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getAuthModel(userModel) {
  const user = userModel || store.state.user.base
  return {
    'Authorization': `Bearer ${user.token}`,
    'userId': `${user.userId}`,
    'entId': `${user.entId}`,
    'userName': `${encodeURIComponent(user.userName || 'empty')}`
  }
}
