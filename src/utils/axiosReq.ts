import store from '@/store'
import axios, { AxiosInstance } from 'axios'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'
import { getToken, setToken } from '@/utils/auth'
import { AxiosConfigTy, AxiosReqTy } from '@/types/axios'
let requestData: any
let loadingE: any

const service: AxiosInstance | any = axios.create({
  // baseURL: process.env.VUE_APP_BASE_URL,
  // timeout: 30000 // overtime time
})
// Request interception
service.interceptors.request.use(
  (request: AxiosReqTy) => {
    console.log('request', request)
    // token placement
    request.headers['AUTHORIZE_TOKEN'] = getToken()
    /* download file*/
    if (request.isDownLoadFile) {
      request.responseType = 'blob'
    }
    if (request.isUploadFile) {
      console.log('Uploaded is a file', request)
      request.headers['Content-Type'] = 'multipart/form-data'
    }
    requestData = request
    if (request.bfLoading) {
      loadingE = ElLoading.service({
        lock: true,
        text: 'Đang tải dữ liệu',
        spinner: 'el-icon-ElLoading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    }
    /*
     *params will be spliced to the url
     * */
    if (request.isParams) {
      request.params = request.data
      request.data = {}
    }
    return request
  },
  (err: any) => {
    Promise.reject(err)
  }
)
// Response interception
service.interceptors.response.use(
  (res: any) => {
    console.log('res', res)
    if (requestData.afHLoading && loadingE) {
      loadingE.close()
    }
    // If it is a download file, return directly
    if (requestData.isDownLoadFile) {
      return res.data
    }
    const { flag, msg, isNeedUpdateToken, updateToken } = res.data
    //Update token to stay logged in
    if (isNeedUpdateToken) {
      setToken(updateToken)
    }
    if (flag) {
      return res.data
    } else {
      if (requestData.isAlertErrorMsg) {
        ElMessage({
          message: msg,
          type: 'error',
          duration: 2 * 1000
        })
        return Promise.reject(msg)
      } else {
        return res.data
      }
    }
  },
  (err: any) => {
    if (loadingE) loadingE.close()
    if (err && err.response && err.response.code) {
      if (err.response.code === 403) {
        ElMessageBox.confirm('please login again', {
          confirmButtonText: 're-register',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      } else {
        ElMessage({
          message: err,
          type: 'error',
          duration: 2 * 1000
        })
      }
    } else {
      ElMessage({
        message: err,
        type: 'error',
        duration: 2 * 1000
      })
    }
    return Promise.reject(err)
  }
)

export default function khReqMethod({
  url,
  data,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg = true
}: AxiosConfigTy): any {
  return service({
    url: url,
    method: method ?? 'post',
    data: data ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? false,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL,
    timeout: timeout ?? 15000
  })
}
