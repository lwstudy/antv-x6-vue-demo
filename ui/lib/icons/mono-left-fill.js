
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M278.2 512c0-34.1 12.3-66.9 34.7-92.6L661.5 16.6c17.3-20 47.7-22.2 67.7-4.9 20 17.3 22.2 47.7 4.9 67.7L385.3 482.5c-14.7 16.8-14.7 42.2 0 59l0.2 0.2 348.7 402.9c17.3 20 15.2 50.4-4.9 67.7-20 17.3-50.4 15.2-67.7-4.9L312.9 604.6c-22.4-25.7-34.7-58.5-34.7-92.6z"/>
    </svg>
  )
}

Vue.component('icon-mono-left-fill', Icon)
export default Icon

