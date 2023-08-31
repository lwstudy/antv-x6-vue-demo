
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 745.8c-34.1 0-66.9-12.3-92.6-34.7L16.6 362.5c-20-17.3-22.2-47.7-4.9-67.7 17.3-20 47.7-22.2 67.7-4.9l403.1 348.8c16.8 14.7 42.2 14.7 59 0l0.2-0.2 402.9-348.7c20-17.3 50.4-15.2 67.7 4.9 17.3 20 15.2 50.4-4.9 67.7L604.6 711.1c-25.7 22.4-58.5 34.7-92.6 34.7z"/>
    </svg>
  )
}

Vue.component('icon-mono-bottom-fill', Icon)
export default Icon

