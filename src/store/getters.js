const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => {
    const user = state.user.base

    if (user.token && new Date().getTime() <= user.expire) {
      return user.token
    } else {
      return ''
    }
  },
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  eventButtonPermission: state => state.permission.eventButtonPermission,
  errorLogs: state => state.errorLog.logs,
  userEnterpriseList: state => {
    const user = state.user.base
    return user.ents
  },
  addedRoutes: state => state.permission.added
}
export default getters
