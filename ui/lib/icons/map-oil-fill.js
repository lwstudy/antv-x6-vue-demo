
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M768 128H448V64c0-35.4-28.7-64-64-64H256c-35.3 0-64 28.6-64 64v64h-32c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h704c17.7 0 32-14.3 32-32V256c0-70.7-57.3-128-128-128zM656 308c0-2.2 1.8-4 4-4h52c4.4 0 8 3.6 8 8v260c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V308z"/>
    </svg>
  )
}

Vue.component('icon-map-oil-fill', Icon)
export default Icon

