/*vuex ts*/
import { RouterTy } from '@/types/router'

interface StateTy {
  app: AppTy
  permission: PermissionTy
  user: UserTy
  tagsView: TagsViewTy
}

interface TagsViewTy {
  visitedViews: RouterTy
  cachedViews: RouterTy
}

interface UserTy {
  username: string
  avatar: string
  roles: Array<string>
}

interface AppTy {
  sidebar: {
    opened: boolean
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  }
  device: 'desktop'
  cachedViews: Array<string>
}

interface PermissionTy {
  isGetUserInfo: boolean //Whether the permissions have been set
  routes: RouterTy //Collect filtered asynchronous routes and static routes
  addRoutes: RouterTy //Asynchronous routing after filtering
}
