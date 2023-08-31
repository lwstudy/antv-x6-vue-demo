
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 900v24c0 2.2-1.8 4-4 4H32c-17.7 0-32-14.3-32-32V100c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v788c0 4.4 3.6 8 8 8h980c2.2 0 4 1.8 4 4zM128 792V409.2c0-4.9 4.3-8.6 9.1-7.9L330.8 429c13.7 2 27.7-0.6 39.9-7.3l287.5-158.1c8.7-4.8 19.1-5.3 28.2-1.3l232 101.5c5.8 2.5 9.6 8.3 9.6 14.7V792c0 4.4-3.6 8-8 8H136c-4.4 0-8-3.6-8-8z"/>
    </svg>
  )
}

Vue.component('icon-chart-line-fill', Icon)
export default Icon

