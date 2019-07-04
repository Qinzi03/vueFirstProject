import Vue from 'vue'
import Router from 'vue-router'
// import { routerPermission } from '@/constant/eventButtonPermission'
Vue.use(Router)

/* Layout */
import Layout from '@/views/layout/Layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'

/** note: Submenu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
**/

// 菜单额外配置项
const ROUTE_SCOPE_INTELLIGENT_CALL = 'INTELLIGENT_CALL'
const ROUTE_SCOPE_MARKETING_HALL = 'MARKETING_HALL'
const ROUTE_SCOPE_CRM = 'CRM'
const ROUTE_SCOPE_AUDIO_INTERACT = 'AUDIO_INTERACT'
const ROUTE_SCOPE_SETTING = 'UI_SYSTEM_MANAGEMENT' // SETTING

export const routeScopeMap = {
  [ROUTE_SCOPE_INTELLIGENT_CALL]: {
    order: 1,
    title: '大数据管家'
  },
  [ROUTE_SCOPE_MARKETING_HALL]: {
    order: 2,
    title: '营销大厅'
  },
  [ROUTE_SCOPE_CRM]: {
    order: 3,
    title: 'CRM'
  },
  [ROUTE_SCOPE_AUDIO_INTERACT]: {
    order: 4,
    title: '语音交互'
  },
  [ROUTE_SCOPE_SETTING]: {
    order: 5,
    title: '系统管理'
  }
}

export const constantRouterMap = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'login',
    hidden: true,
    meta: { noLogin: true }
  },
  {
    path: '/password-reset',
    component: () => import('@/views/forgetPass'),
    name: 'password-reset',
    hidden: true,
    meta: { noLogin: true }
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
  // {
  //   path: '*',
  //   component: () => import('@/views/errorPage/404'),
  //   hidden: true
  // }
]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/personalData',
    meta: {
      scope: ROUTE_SCOPE_INTELLIGENT_CALL // 所有要显示的路由必须配置scope
    },
    children: [
      {
        path: 'personalData',
        component: () => import('@/views/personalData/index'),
        name: 'personalData',
        meta: { title: '个人资料', icon: 'menu_home', noCache: true, permissionCode: 'code1' }
      }
    ]
  }

]
