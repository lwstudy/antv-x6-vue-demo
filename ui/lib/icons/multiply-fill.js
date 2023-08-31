
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M930.6 794.8c6.2 6.2 6.2 16.4 0 22.6L817.5 930.6c-6.2 6.2-16.4 6.2-22.6 0L523.3 659.1c-6.2-6.2-16.4-6.2-22.6 0L229.2 930.6c-6.2 6.2-16.4 6.2-22.6 0L93.4 817.5c-6.2-6.2-6.2-16.4 0-22.6l271.5-271.5c6.2-6.2 6.2-16.4 0-22.6L93.4 229.1c-6.2-6.2-6.2-16.4 0-22.6L206.5 93.4c6.2-6.2 16.4-6.2 22.6 0l271.5 271.5c6.2 6.2 16.4 6.2 22.6 0L794.8 93.4c6.2-6.2 16.4-6.2 22.6 0l113.1 113.1c6.2 6.2 6.2 16.4 0 22.6L659.1 500.7c-6.2 6.2-6.2 16.4 0 22.6l271.5 271.5z"/>
    </svg>
  )
}

Vue.component('icon-multiply-fill', Icon)
export default Icon

