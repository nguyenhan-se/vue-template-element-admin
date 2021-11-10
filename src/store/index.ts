import { createStore, useStore as baseUseStore, Store } from 'vuex'
import getters from './getters'
import { InjectionKey } from 'vue'
import { StateTy } from '@/types/store'
import { DynamicProps } from '@/types/utils'
//auto import (perfect!!!)

const modulesFiles = import.meta.globEager('./modules/*.ts')
const modules: DynamicProps = {}
for (const path in modulesFiles) {
  const moduleName = path.replace(/(.*\/)*([^.]+).*/gi, '$2')
  modules[moduleName] = modulesFiles[path].default
}
export const storeKeys: InjectionKey<Store<StateTy>> = Symbol()

export function useStore() {
  return baseUseStore(storeKeys)
}

console.log('modules =====>', modules)
//Close complicated way connections
// const modulesFiles = import.meta.globEager('./modules/*.js')
// console.log(Object.keys(modulesFiles));
// const modules = Object.keys(modulesFiles).reduce((modules, modulePath) => {
//   // const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
//   const moduleName = modulePath.replace(/(.*\/)*([^.]+).*/gi, '$2')
//   const value = modulesFiles[modulePath]
//   modules[moduleName] = value.default
//   return modules
// }, {})
// console.log(modules);
export default createStore({
  modules,
  getters
})
