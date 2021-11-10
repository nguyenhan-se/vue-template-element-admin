import type { ComputedRef, Ref } from 'vue'

export type DynamicProps<T = { [propName: string]: any }> = {
  [P in keyof T]: Ref<T[P]> | T[P] | ComputedRef<T[P]>
}
