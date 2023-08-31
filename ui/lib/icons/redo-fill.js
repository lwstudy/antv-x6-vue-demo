
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 447.9L666.8 775.4c-10.3 9.4-26.8 2.1-26.8-11.8V584c0-4.4-3.6-8-8-8H320c-61.9 0-117.9 25.1-158.4 65.6C121 682.1 96 738.1 96 800v98.5c0 17-22.9 22.2-30.4 7C31.1 835.6 9.9 759.6 3.4 681.6L0 640c0-97.2 39.4-185.2 103.1-248.9S254.8 288 352 288h280c4.4 0 8-3.6 8-8V87.8c0-14.4 17.6-21.5 27.5-11.1L1024 447.9z"/>
    </svg>
  )
}

Vue.component('icon-redo-fill', Icon)
export default Icon

