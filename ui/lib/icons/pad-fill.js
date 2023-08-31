
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M128.187408 63.968765v895.562714c0 35.282772 28.685993 63.968765 63.968766 63.968765h639.687652c35.282772 0 63.968765-28.685993 63.968766-63.968765v-895.562714c0-35.282772-28.685993-63.968765-63.968766-63.968765H192.156174c-35.282772 0-63.968765 28.685993-63.968766 63.968765z m79.960957 0h607.70327c8.795705 0 15.992191 7.196486 15.992191 15.992192V844.087848c0 2.198926-1.799122 3.998048-3.998048 3.998048H196.154222c-2.198926 0-3.998048-1.799122-3.998048-3.998048V79.960957c0-8.795705 7.196486-15.992191 15.992191-15.992192z m253.076428 895.562714c-3.298389-7.196486-5.197462-15.092631-5.197463-23.488531 0-30.884919 25.08775-55.97267 55.97267-55.97267s55.97267 25.08775 55.97267 55.97267c0 8.3959-1.799122 16.292045-5.197463 23.488531C553.979502 978.722108 534.489019 992.015617 512 992.015617s-41.979502-13.293509-50.775207-32.484138zM775.871157 800.109322H248.128843c-4.397853 0-7.996096-3.598243-7.996095-7.996096V128.437286c0-8.795705 7.196486-15.992191 15.992191-15.992191h511.750122c8.795705 0 15.992191 7.196486 15.992191 15.992191v663.67594c0 4.397853-3.598243 7.996096-7.996095 7.996096z"/>
    </svg>
  )
}

Vue.component('icon-pad-fill', Icon)
export default Icon
