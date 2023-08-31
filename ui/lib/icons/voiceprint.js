
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M96 336h64v384H96zM0 451h64v186H0zM224 272h64v512h-64zM352 448h64v160h-64zM480 400h64v256h-64zM608 336h64v384h-64zM736 464h64v128h-64zM864 400h64v256h-64zM960 448h64v160h-64z"/>
    </svg>
  )
}

Vue.component('icon-voiceprint', Icon)
export default Icon

