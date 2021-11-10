const mixin = {
  data() {
    /* element form verification related*/
    // The password must be 6-18 letters and numbers
    let passwordValid = (rule, value, callback) => {
      if (!/^(?![^a-zA-Z]+$)(?!\D+$)/.test(value)) {
        callback(new Error('6-18 letters and numbers'))
      } else {
        callback()
      }
    }
    // Integer greater than 0
    let upZeroInt = (rule, value, callback) => {
      if (!/^\+?[1-9]\d*$/.test(value)) {
        callback(new Error('Integer greater than 0'))
      } else {
        callback()
      }
    }
    let upZeroIntCanNull = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        if (!/^\+?[1-9]\d*$/.test(value)) {
          callback(new Error('Integer greater than 0'))
        } else {
          callback()
        }
      }
    }
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter the password'))
      } else {
        callback()
      }
    }
    return {
      /* table*/
      pageNumMixin: 1,
      pageSizeMixin: 10,
      pageTotalMixin: 0,
      tableDataMixin: [],
      rowDeleteIdArrMixin: [],
      loadingIdMixin: null,
      /* Form*/
      formModelMixin: {},
      subFormMixin: {},
      searchFormMixin: {},
      /* Form validation*/
      formRulesMixin: {
        isNotNull: [{ required: true, message: 'This field cannot be empty', trigger: 'blur' }],
        isNotNullSecond: [{ required: true, message: 'Can not be empty', trigger: 'blur' }],
        mLength8: [
          { required: true, message: 'This field cannot be empty', trigger: 'blur' },
          { max: 8, message: 'The field cannot be a maximum of 8 characters', trigger: 'blur' }
        ],
        minLength7: [
          { required: true, message: 'This field cannot be empty', trigger: 'blur' },
          { min: 7, message: '7 characters minimum', trigger: 'blur' }
        ],
        length17: [
          { required: true, message: 'This field cannot be empty', trigger: 'blur' },
          { min: 17, max: 17, message: '17 characters in length', trigger: 'blur' }
        ],
        desc: [{ validator: validatePass, trigger: 'blur' }],
        upZeroInt: [{ validator: upZeroInt, trigger: 'blur' }],
        upZeroIntCanNull: [{ validator: upZeroIntCanNull, trigger: 'blur' }],
        passwordValid: [{ validator: passwordValid, trigger: 'blur' }]
      },
      /* Time packing related*/
      datePickerOptions: {
        disabledDate: (time) => {
          return time.getTime() < Date.now() - 86400000
        }
      },
      startEndArrMixin: [],
      startEndArrSubMixin: [],
      /* dialog related*/
      dialogTitleMixin: 'Add to',
      detailDialogMixin: false,
      isDialogEditMixin: false,
      dialogVisibleMixin: false,
      tableLoadingMixin: false,
      /* Cascade correlation*/
      cascaderKeyMixin: 1,
      SetKesDeptMixin: {
        value: 'id',
        expandTrigger: 'hover',
        label: 'label',
        children: 'children'
      },
      SetKesDeptMixinNoStrictlyMixin: {
        value: 'id',
        expandTrigger: 'hover',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      SetKesDeptMixinNoStrictly: {
        value: 'id',
        expandTrigger: 'hover',
        label: 'label',
        children: 'children',
        checkStrictly: true
      },
      cascaderOptionsMixinOne: [],
      cascaderOptionsMixin: [],
      /* Tree related*/
      treeDataMixin: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    // /* table and paging*/
    // handleSizeChangeMixin(val) {
    //   this.pageSizeMixin = val
    //   this.selectPageReq()
    // },
    // handleCurrentChangeMixin(val) {
    //   this.pageNumMixin = val
    //   this.selectPageReq()
    // },
    // selectPageReq() {
    //   console.log('我是mixin里的selectPageReq方法')
    // },
    /* cascade*/
    casHandleChangeMixin() {
      // Solve the current cascade selector search input error problem
      ++this.cascaderKey
    },
    /*
     * Notification popup
     * message：the content of the notification
     * type: Notification type
     * duration: notification display duration (ms)
     * */
    elMessageMixin(message, type) {
      type = type || 'success'
      this.$message({
        showClose: true,
        message: message || 'success',
        type: type,
        center: false
      })
    },
    /*
     * loading box
     * After calling, pass this.loadingIdMixin.close() to close
     * */
    elLoadingMixin() {
      this.loadingIdMixin = this.$loading({
        lock: true,
        text: 'Data loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.1)'
      })
    },
    /*
     * hint
     * message: Prompt content
     * type：Prompt type
     * title：Prompt title
     * duration：Prompt duration (ms)
     * */
    elNotifyMixin(message, type, title, duration) {
      type = type || 'success'
      this.$notify[type]({
        title: title || 'hint',
        message: message || 'Please enter a reminder message',
        position: 'top-right',
        duration: duration || 2500,
        offset: 40
      })
    },
    /*
    Confirm popup (no cancel button)
    * title:Prompt title
    * message:Prompt content
    * return Promise
    * */
    elConfirmNoCancelBtnMixin(title, message) {
      return new Promise((resolve, reject) => {
        this.$confirm(message || 'Are you sure you want to delete', title || 'Confirmation box', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          showCancelButton: false,
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    /*
     * Confirm popup
     * title:Prompt title
     * message:Prompt content
     * return Promise
     * */
    elConfirmMixin(title, message) {
      return new Promise((resolve, reject) => {
        this.$confirm(message || 'Are you sure you want to delete', title || 'Confirmation box', {
          confirmButtonText: 'Sure',
          cancelButtonText: 'Cancel',
          type: 'warning'
        })
          .then(() => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}

export default mixin
