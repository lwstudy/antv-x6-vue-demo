
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 256h128v512H0zM160 256h64v512h-64zM256 256h32v512h-32zM416 256h64v512h-64zM512 256h128v512H512zM912 256h112v512H912zM304 256h96v512h-96zM784 256h96v512h-96zM736 256h32v512h-32zM672 256h32v512h-32z"/>
    </svg>
  )
}

Vue.component('icon-bar-code-fill', Icon)
export default Icon

