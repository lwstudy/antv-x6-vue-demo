
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M832 64v960L530.3 812.8c-11-7.7-25.7-7.7-36.7 0L192 1024V64c0-35.4 28.7-64 64-64h512c35.3 0 64 28.6 64 64z"/>
    </svg>
  )
}

Vue.component('icon-bookmark-fill', Icon)
export default Icon

