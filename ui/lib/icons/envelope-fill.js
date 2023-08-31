
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024.5 240v13.3L570.2 492.9c-36.9 19.5-81 19.7-118.2 0.7L0.5 261.8V240c0-35.3 28.7-64 64-64h896c35.3 0 64 28.7 64 64zM1024.5 325.7V784c0 35.3-28.7 64-64 64h-896c-35.3 0-64-28.7-64-64V333.7l452 232c37.1 19.1 81.2 18.8 118.1-0.7l453.9-239.3z"/>
    </svg>
  )
}

Vue.component('icon-envelope-fill', Icon)
export default Icon

