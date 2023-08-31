
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M745.8 512c0-34.1-12.3-66.9-34.7-92.6L362.5 16.6c-17.3-20-47.7-22.2-67.7-4.9-20 17.3-22.2 47.7-4.9 67.7l348.8 403.1c14.7 16.8 14.7 42.2 0 59l-0.2 0.2-348.6 402.9c-17.3 20-15.2 50.4 4.9 67.7 20 17.3 50.4 15.2 67.7-4.9l348.6-402.8c22.4-25.7 34.7-58.5 34.7-92.6z"/>
    </svg>
  )
}

Vue.component('icon-mono-right-fill', Icon)
export default Icon

