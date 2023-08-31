
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M480 64v352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64C0 28.6 28.7 0 64 0h352c35.3 0 64 28.6 64 64zM1024 64v352c0 35.3-28.7 64-64 64H608c-35.3 0-64-28.7-64-64V64c0-35.4 28.7-64 64-64h352c35.3 0 64 28.6 64 64zM480 608v352c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V608c0-35.4 28.7-64 64-64h352c35.3 0 64 28.6 64 64zM1024 608v352c0 35.3-28.7 64-64 64H608c-35.3 0-64-28.7-64-64V608c0-35.4 28.7-64 64-64h352c35.3 0 64 28.6 64 64z"/>
    </svg>
  )
}

Vue.component('icon-four-squares-fill', Icon)
export default Icon

