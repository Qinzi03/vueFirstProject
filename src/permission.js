import router from './router'
import store from './store'
import { Message } from 'element-ui'
router.beforeEach((to, from, next) => {
  const token = store.getters.token
  if ((!token && !to.meta.noLogin)) {
    Message.warning({ message: '请重新登录111' })
    next({ path: '/login' })
  } else {
    if (to.name !== 'login' && !store.getters.addedRoutes) {
      store.dispatch('GenerateRoutes').then(() => { // 根据roles权限生成可访问的路由表
        // 动态添加可访问路由表
        new Promise((resolve) => {
          router.addRoutes(store.getters.addRouters)
          resolve()
        }).then(_ => {
          if (store.getters.addRouters.length === 0) {
            // 无任何菜单栏权限，则显示个人资料
            router.push({ path: '/' })
          }
        })
        // 网页刷新前进行提示
        // window.onbeforeunload = function(e) {
        //   const dialogText = '确认刷新么！'
        //   e.returnValue = dialogText
        //   return dialogText
        // }
        next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
      })
    }
    next()
  }
})

