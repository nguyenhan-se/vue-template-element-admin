const mixin = {
  data() {
    return {
      /* Router jump related*/
      queryParamsMixin: null
    }
  },
  created() {
    // General get page parameters
    if (this.$route && this.$route.query && this.$route.query.params) {
      this.queryParamsMixin = JSON.parse(this.$route.query.params)
    }
  },
  methods: {
    // vue router jump
    routerPushMixin(path, params) {
      let data = {}
      if (params) {
        data = {
          params: JSON.stringify(params)
        }
      } else {
        data = {}
      }
      this.$router.push({
        name: path,
        query: data
      })
    },
    routerReplaceMixin(path, params) {
      let data = {}
      if (params) {
        data = {
          params: JSON.stringify(params)
        }
      } else {
        data = {}
      }
      this.$router.replace({
        name: path,
        query: data
      })
    },
    routerBackMixin() {
      this.$router.go(-1)
    }
  }
}

export default mixin
