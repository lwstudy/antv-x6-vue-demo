
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M771.3 465.8L256 1024l150.1-450.3c1.7-5.2-2.1-10.5-7.6-10.5H253c-46.5 0-77.5-48.1-58.3-90.5L392.5 37.5C402.9 14.7 425.7 0 450.8 0h419.6L672.5 346.4c-3 5.3 0.8 12 6.9 12h44.8c55.8 0 84.9 66.4 47.1 107.4z"/>
    </svg>
  )
}

Vue.component('icon-lightning-fill', Icon)
export default Icon

