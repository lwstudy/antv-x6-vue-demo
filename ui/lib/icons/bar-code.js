
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 256h64v512H0zM128 256h64v512h-64zM224 256h32v512h-32zM448 256h32v512h-32zM592 256h32v512h-32zM720 256h32v512h-32zM912 256h32v512h-32zM336 256h64v512h-64zM784 256h64v512h-64zM640 256h64v512h-64zM960 256h64v512h-64z"/>
    </svg>
  )
}

Vue.component('icon-bar-code', Icon)
export default Icon

