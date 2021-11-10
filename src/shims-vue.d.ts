/*Life module type*/
declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
declare module './*'
declare module '@/*'
declare module '@/hooks'
declare module '*'
