
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 144m-144 0a144 144 0 1 0 288 0 144 144 0 1 0-288 0ZM903.3 282.9L722.8 463.4c-12 12-18.8 28.3-18.8 45.3V1008c0 8.8-7.2 16-16 16H560c-8.8 0-16-7.2-16-16V736h-64v272c0 8.8-7.2 16-16 16H336c-8.8 0-16-7.2-16-16V508.6c0-17-6.7-33.3-18.8-45.3L120.7 282.9c-31.1-31.1-32.1-81.8-1.4-113.2 15.7-16 36.5-24.1 57.2-24.1 20.5 0 41 7.8 56.6 23.4l141.6 141.6c6 6 14.1 9.4 22.6 9.4h229.2c8.5 0 16.6-3.4 22.6-9.4L790.9 169c15.6-15.6 36.1-23.4 56.6-23.4 20.8 0 41.5 8 57.2 24.1 30.7 31.4 29.7 82.1-1.4 113.2z"/>
    </svg>
  )
}

Vue.component('icon-children-fill', Icon)
export default Icon

