import { AppTy } from '@/types/store'
import { DynamicProps } from '@/types/utils'

interface AppState {
  sidebar: {
    opened: boolean
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  }
  device: 'desktop'
  cachedViews: Array<string>
}

const state: AppTy = {
  sidebar: {
    opened: true
    //opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    // withoutAnimation: false
  },
  device: 'desktop',
  cachedViews: []
}

const mutations = {
  /*Mutations suggest starting with M_*/
  M_sidebar_opened: (state: AppTy, data: boolean) => {
    state.sidebar.opened = data
  },
  M_toggleSideBar: (state: AppTy) => {
    state.sidebar.opened = !state.sidebar.opened
  },

  /*keepAlive cache*/
  M_ADD_CACHED_VIEW: (state: AppTy, view: string) => {
    if (state.cachedViews.includes(view)) return
    state.cachedViews.push(view)
  },

  M_DEL_CACHED_VIEW: (state: AppTy, view: string) => {
    const index = state.cachedViews.indexOf(view)
    index > -1 && state.cachedViews.splice(index, 1)
  },
  M_RESET_CACHED_VIEW: (state: AppTy) => {
    state.cachedViews = []
  }
}
const actions = {
  A_sidebar_opened({ commit }: DynamicProps, data: boolean) {
    commit('M_sidebar_opened', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
