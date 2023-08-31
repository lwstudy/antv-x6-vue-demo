
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M696 647H328c-11 0-20-9-20-20s9-20 20-20h368c11 0 20 9 20 20s-9 20-20 20z" p-id="13748"></path>
    </svg>
  )
}

Vue.component('icon-dialog-minimize', Icon)
export default Icon

