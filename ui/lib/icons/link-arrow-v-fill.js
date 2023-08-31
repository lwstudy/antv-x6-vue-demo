
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M560 771.8c0 2.2 1.8 4 4 4h84.7c3.1 0 5 3.3 3.5 6L519 1012.5c-3.1 5.3-10.8 5.3-13.9 0L371.9 781.8c-1.5-2.7 0.4-6 3.5-6H460c2.2 0 4-1.8 4-4V252.2c0-2.2-1.8-4-4-4h-84.7c-3.1 0-5-3.3-3.5-6L505.1 11.5c3.1-5.3 10.8-5.3 13.9 0l133.2 230.7c1.5 2.7-0.4 6-3.5 6H564c-2.2 0-4 1.8-4 4v519.6z"/>
    </svg>
  )
}

Vue.component('icon-link-arrow-v-fill', Icon)
export default Icon

