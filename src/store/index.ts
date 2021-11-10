import { createStore, useStore as baseUseStore, Store } from 'vuex'
import getters from './getters'
import { InjectionKey } from 'vue'
import { RootState } from '@/types/store'
import { DynamicProps } from '@/types/utils'
//auto import (perfect!!!)

const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: DynamicProps = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
export const storeKeys: InjectionKey<Store<RootState>> = Symbol()

export function useStore() {
  return baseUseStore(storeKeys)
}

console.log('modules =====>', modules)

export default createStore({
  modules,
  getters
})
