
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M112 336h80v384h-80zM0 451h80v186H0zM224 272h80v512h-80zM352 448h80v160h-80zM480 400h80v256h-80zM608 336h80v384h-80zM720 464h80v128h-80zM832 400h80v256h-80zM944 448h80v160h-80z"/>
    </svg>
  )
}

Vue.component('icon-voiceprint-fill', Icon)
export default Icon

