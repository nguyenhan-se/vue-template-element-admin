/*vuex ts*/
import { RouterTy } from '@/types/router'

interface RootState {
  app: AppState
  permission: PermissionState
  user: UserState
  tagsView: TagsViewState
}

interface TagsViewState {
  visitedViews: RouterTy
  cachedViews: RouterTy
}

interface UserState {
  username: string
  avatar: string
  roles: Array<string>
}

interface AppState {
  sidebar: {
    opened: boolean
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  }
  device: 'desktop'
  cachedViews: Array<string>
}

interface PermissionState {
  isGetUserInfo: boolean //Whether the permissions have been set
  routes: RouterTy //Collect filtered asynchronous routes and static routes
  addRoutes: RouterTy //Asynchronous routing after filtering
}
