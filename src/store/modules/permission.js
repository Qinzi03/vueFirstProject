import { asyncRouterMap, constantRouterMap } from '@/router'
import { eventButtonPermission } from '@/constant/eventButtonPermission'
import user from './user.js'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.indexOf(role) >= 0)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (hasPermission(roles, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

function filterAsyncRouterByPermisstion(asyncRouterMap) {
  const permissions = user.state.base.permissions
  const newRouter = []
  asyncRouterMap.forEach(item => {
    const temArr = []
    if (item.children) {
      item.children.forEach(childrenObj => {
        const somePermisstion = permissions.some(item2 => {
          // permissionCode 为空，表示始终有权限
          if (!childrenObj.meta.permissionCode) {
            return true
          }
          return item2.code === childrenObj.meta.permissionCode
        })
        if (somePermisstion) {
          temArr.push(childrenObj)
        }
      })
    }
    item.children = temArr
    if (temArr.length) {
      newRouter.push(item)
    }
  })
  return newRouter
}

function filterEnventButtonPermisstion(eventDescription) {
  const tmpAry = {}
  const permissions = user.state.base.permissions
  eventDescription.forEach(item => {
    const somePermisstion = permissions.some(item2 => {
      return item2.code === item.code
    })
    if (somePermisstion) {
      tmpAry[item.code] = true
    }
  })
  return tmpAry
}

const permission = {
  state: {
    routers: constantRouterMap,
    eventButtonPermission: {},
    addRouters: [],
    added: false
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    SET_EVENTPERMISSION: (state, eventPermission) => {
      state.eventButtonPermission = eventPermission
    },
    ADDED: (state) => {
      state.added = true
    }
  },
  actions: {
    GenerateRoutes({ commit, dispatch }, data) {
      return new Promise(resolve => {
        const accessedRouters = filterAsyncRouterByPermisstion(asyncRouterMap)
        const eventPermission = filterEnventButtonPermisstion(eventButtonPermission)
        commit('SET_EVENTPERMISSION', eventPermission)
        commit('SET_ROUTERS', accessedRouters)
        commit('ADDED', true)
        resolve()
      })
    }
  }
}

export default permission
