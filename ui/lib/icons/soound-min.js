
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M678 512.9c0-46.5-16.9-88.5-47.6-118.7V278.4c87.9 44.5 143.2 134.9 142.7 233.4 0.4 98.5-54.8 188.9-142.7 233.4V631.7c30.8-30.5 47.6-72.2 47.6-118.8zM487.7 869L202.2 678.7H11.9V345.6h190.4l285.5-190.3V869z"/>
    </svg>
  )
}

Vue.component('icon-soound-min', Icon)
export default Icon

