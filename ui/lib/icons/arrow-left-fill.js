
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M244.55 240.9L18.75 466.7c-25 25-25 65.5 0 90.5l225.9 225.9c1.6 1.6 4.1 1.6 5.7 0l62.2-62.2c1.6-1.6 1.6-4.1 0-5.7L164.05 566.8c-2.5-2.5-0.7-6.8 2.8-6.8H1020.35c2.2 0 4-1.8 4-4v-88c0-2.2-1.8-4-4-4H166.85c-3.6 0-5.3-4.3-2.8-6.8l148.4-148.4c1.6-1.6 1.6-4.1 0-5.7l-62.2-62.2c-1.6-1.6-4.1-1.6-5.7 0z"/>
    </svg>
  )
}

Vue.component('icon-arrow-left-fill', Icon)
export default Icon

