
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 176v144c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h768c8.8 0 16 7.2 16 16zM1024 432v144c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V432c0-8.8 7.2-16 16-16h768c8.8 0 16 7.2 16 16zM1024 688v144c0 8.8-7.2 16-16 16H240c-8.8 0-16-7.2-16-16V688c0-8.8 7.2-16 16-16h768c8.8 0 16 7.2 16 16zM176 176v144c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h144c8.8 0 16 7.2 16 16zM176 432v144c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V432c0-8.8 7.2-16 16-16h144c8.8 0 16 7.2 16 16zM176 688v144c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16V688c0-8.8 7.2-16 16-16h144c8.8 0 16 7.2 16 16z"/>
    </svg>
  )
}

Vue.component('icon-list4-fill', Icon)
export default Icon

