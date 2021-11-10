import router, { asyncRoutes } from '@/router'
import store from './store'
import settings from './settings'
import { getToken } from '@/utils/auth'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'
import { RouterRowTy } from '@/types/router'
import { NavigationGuardNext } from 'vue-router'

const whiteList = ['/login'] // no redirect whitelist
router.beforeEach(async (to: any, _, next: NavigationGuardNext) => {
  // start progress bar
  if (settings.isNeedNprogress) NProgress.start()
  // set page title
  document.title = getPageTitle(to.meta.title)
  /*
   * In general: filtering dynamic routing
   * 1. Do you not go to the login page with the token? If you want to go to the login page, you will be redirected to the homepage. No, redirect to the login page
   * 2.Judge whether to filter by permission, if yes, let it go directly. No, after filtering the dynamic route, add the dynamic route and let it go,
   * */
  const hasToken: string = settings.isNeedLogin ? getToken() : 'temp_token'
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
    } else {
      //Have you obtained user information
      const isGetUserInfo: boolean = store.state.permission.isGetUserInfo
      if (isGetUserInfo) {
        next()
      } else {
        try {
          let accessRoutes = []
          if (settings.isNeedLogin) {
            // get user info
            // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
            const { roles } = await store.dispatch('user/getInfo')
            accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          } else {
            accessRoutes = asyncRoutes
            store.commit('permission/M_routes', accessRoutes)
          }
          // dynamically add accessible routes
          //router4 addRoutes destroyed
          accessRoutes.forEach((route: RouterRowTy) => {
            router.addRoute(route)
          })
          //already get userInfo
          store.commit('permission/M_isGetUserInfo', true)
          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (err) {
          await store.dispatch('user/resetToken')
          next(`/login?redirect=${to.path}`)
          if (settings.isNeedNprogress) NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      if (settings.isNeedNprogress) NProgress.done()
    }
  }
})

router.afterEach(() => {
  if (settings.isNeedNprogress) NProgress.done()
})
