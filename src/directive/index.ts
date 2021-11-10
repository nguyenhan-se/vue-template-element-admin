import permission from './permission'
import { DynamicProps } from '@/types/utils'

export default function (app: DynamicProps) {
  app.directive('permission', permission)
}
