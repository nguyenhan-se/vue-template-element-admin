import request from '@/utils/axiosReq'
import { DynamicProps } from '@/types/utils'

export function loginReq(data: DynamicProps) {
  return request({
    url: '/ty-user/user/loginValid',
    data,
    method: 'post',
    bfLoading: false,
    isParams: true,
    isAlertErrorMsg: false
  })
}

export function getInfoReq() {
  return request({
    url: '/ty-user/user/getUserInfo',
    bfLoading: false,
    method: 'post'
  })
}

export function logoutReq() {
  return request({
    url: '/ty-user/user/loginOut',
    method: 'post'
  })
}
