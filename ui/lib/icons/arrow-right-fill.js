
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M779.8 240.9l225.9 225.9c25 25 25 65.5 0 90.5L779.8 783.1c-1.6 1.6-4.1 1.6-5.7 0l-62.2-62.2c-1.6-1.6-1.6-4.1 0-5.7l148.4-148.4c2.5-2.5 0.7-6.8-2.8-6.8H4c-2.2 0-4-1.8-4-4v-88c0-2.2 1.8-4 4-4h853.5c3.6 0 5.3-4.3 2.8-6.8L711.9 308.8c-1.6-1.6-1.6-4.1 0-5.7l62.2-62.2c1.6-1.6 4.1-1.6 5.7 0z"/>
    </svg>
  )
}

Vue.component('icon-arrow-right-fill', Icon)
export default Icon

