
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m144 748c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V276c0-2.2 1.8-4 4-4h56c2.2 0 4 1.8 4 4v472z m-225 0c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V276c0-2.2 1.8-4 4-4h56c2.2 0 4 1.8 4 4v472z"/>
    </svg>
  )
}

Vue.component('icon-pause-circle-fill', Icon)
export default Icon

