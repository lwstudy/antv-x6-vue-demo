
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M640 208c0 70.7-57.3 128-128 128-35.3 0-67.3-14.3-90.5-37.5-23.2-23.2-37.5-55.2-37.5-90.5s14.3-67.3 37.5-90.5C444.7 94.3 476.7 80 512 80s67.3 14.3 90.5 37.5c23.2 23.2 37.5 55.2 37.5 90.5zM640 464v416c0 35.3-28.7 64-64 64H448c-35.3 0-64-28.7-64-64V464c0-35.4 28.7-64 64-64h128c35.3 0 64 28.6 64 64z"/>
    </svg>
  )
}

Vue.component('icon-message-fill', Icon)
export default Icon

