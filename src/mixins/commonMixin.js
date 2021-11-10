import { getToken } from '@/utils/auth'
const mixin = {
  data() {
    return {
      /* File upload related*/
      fileListMixin: [],
      chooseFileNameMixin: '',
      /* Multi-environment configuration and token information*/
      commonValueMixin: '',
      modalShowTitleMixin: '',
      VITE_APP_IMAGE_URL_PRE: '', // Picture prefix address
      VITE_APP_BASE_URL: '', // Requested url address
      VITE_APP_BASE_WS_URL: '', // Requested url address
      accessTokenMixin: '', // The token of the request header
      userBaseInfoMixin: {}, // User Info
      /* Time point related*/
      todayTimeMixin: '',
      currentTimeMixin: '',
      todayTimeMixinLast: '',
      yesterdayTimeMixin: null,
      beforeThreeDateTimeMixin: ''
    }
  },
  created() {
    /* Get url connection domain name for multi-platform migration*/
    const localUrl = window.location.href.slice(0, window.location.href.indexOf('/', 9) + 1)
    const socketUrl = localUrl.replace(/http|https/gi, 'ws')
    // Read data in .env multi-environment
    this.VITE_APP_IMAGE_URL_PRE = import.meta.env.VITE_APP_BASE_URL
    this.VITE_APP_BASE_URL = import.meta.env.VITE_APP_BASE_URL
    this.VITE_APP_BASE_WS_URL =
      import.meta.env.VITE_APP_ENV === 'serve' ? import.meta.env.VITE_APP_BASE_WS_URL : socketUrl
    // Get token and basic personal information
    this.accessTokenMixin = getToken()
    this.userBaseInfoMixin = JSON.parse(localStorage.getItem('L_userBaseInfo'))
    /* Get the time point*/
    this.todayTimeMixin = this.$momentMini().startOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.currentTimeMixin = this.$momentMini(new Date()).format('YYYY-MM-DD HH:mm:ss')
    this.todayTimeMixinLast = this.$momentMini().endOf('day').format('YYYY-MM-DD HH:mm:ss')
    this.beforeThreeDateTimeMixin = this.$momentMini().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
    this.yesterdayTimeMixin = this.$momentMini().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')
  },
  methods: {
    /* Array operation related api*/
    /*
     * Filter the array based on the key name
     * arr:Array
     * key：The total key of the numeric object
     * */
    filterArrMixin(arr, key) {
      const hash = {}
      return arr.reduce((ss, item) => {
        hash[item[key]] ? '' : (hash[item[key]] = ss.push(item))
        return ss
      }, [])
    },
    /*
     * Empty parameter items
     * objParam：Incoming parameters
     * */
    clearParamsIsNullMixin(objParam) {
      const obj = Object.keys(objParam)
      obj.forEach((fItem) => {
        if (objParam[fItem] === '' || objParam[fItem] === null || objParam[fItem] === undefined) delete objParam[fItem]
      })
      return objParam
    },

    /*File Upload*/
    handleChangeMixin(file, fileListMixin) {
      console.log('file, fileListMixin', file, fileListMixin)
      this.fileListMixin = fileListMixin
    },
    goUploadFileMixin() {
      this.$refs.refSettingFile.click()
    },

    sleepMixin(time) {
      return new Promise((resolve) => {
        const timer = setTimeout(() => {
          clearTimeout(timer)
          resolve()
        }, time)
      })
    },
    resetDataMixin(form) {
      Object.keys(form).forEach((sItem) => {
        form[sItem] = ''
      })
    },
    reshowDataMixin(row, form) {
      Object.keys(row).forEach((fItem) => {
        Object.keys(form).forEach((sItem) => {
          if (fItem === sItem) {
            form[sItem] = row[sItem]
          }
        })
      })
    }
  }
}

export default mixin
