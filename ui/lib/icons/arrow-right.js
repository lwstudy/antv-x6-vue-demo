
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M791.4 252.1l214 214c25 25 25 65.5 0 90.5l-215 215c-1.6 1.6-4.1 1.6-5.7 0L745.1 732c-1.6-1.6-1.6-4.1 0-5.7l175.7-175.7c2.5-2.5 0.7-6.8-2.8-6.8H4c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4H919.1c3.6 0 5.3-4.3 2.8-6.8L746.2 297.3c-1.6-1.6-1.6-4.1 0-5.7l39.6-39.6c1.5-1.5 4.1-1.5 5.6 0.1z"/>
    </svg>
  )
}

Vue.component('icon-arrow-right', Icon)
export default Icon

