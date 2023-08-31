
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M544.5 854.7c0 2.2 1.8 4 4 4h52.8c3.1 0 5 3.3 3.5 6l-85.3 147.8c-3.1 5.3-10.8 5.3-13.9 0l-85.3-147.8c-1.5-2.7 0.4-6 3.5-6h52.8c2.2 0 4-1.8 4-4V169.3c0-2.2-1.8-4-4-4h-52.8c-3.1 0-5-3.3-3.5-6l85.3-147.8c3.1-5.3 10.8-5.3 13.9 0l85.3 147.8c1.5 2.7-0.4 6-3.5 6h-52.8c-2.2 0-4 1.8-4 4v685.4z"/>
    </svg>
  )
}

Vue.component('icon-link-arrow-v', Icon)
export default Icon

