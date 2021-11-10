import request from 'axios'
import { DynamicProps } from '@/types/utils'

export function getList(params: DynamicProps) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    data: params
  })
}
