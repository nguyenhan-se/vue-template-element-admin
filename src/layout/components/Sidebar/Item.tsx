/*Use vue3.0 jsx syntax to write*/
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    elIcon: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    /*The writing here is very much like react*/
    // let {proxy} = getCurrentInstance();
    const { icon } = props
    const renderItem = () => {
      if (icon) {
        // element-plus remove el-icon
        // view https://element-plus.org/zh-CN/component/icon.html
        // if (icon.includes('el-icon')) {
        //   return <i className={[icon, 'sub-el-icon']} />
        // } else {
        //   return <svg-icon icon-class={icon} className="nav-icon" />
        // }
        return <svg-icon icon-class={icon} className="nav-icon" />
      }
    }
    return () => {
      return renderItem()
    }
    // return () => (
    //   <div>{renderItem()}</div>
    // )
  }
})
