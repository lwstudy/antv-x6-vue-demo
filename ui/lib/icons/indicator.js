
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M384 174.8L725.3 577H551.6c-2.8 0-4.7 2.7-3.8 5.3l28.1 79.9 93 264.3-45.3 15.9-85.5-243-35.2-100.1c-1-2.9-4.9-3.6-6.9-1.2l-67.6 81.8-44.4 53.7V174.8zM320 0.5V867c0 15 18.8 21.8 28.3 10.2l124.8-151.1c2-2.4 5.8-1.7 6.9 1.2l99.1 281.6c2.9 8.3 12.1 12.7 20.4 9.8l135.8-47.8c8.3-2.9 12.7-12.1 9.8-20.4l-107-304.2c-0.9-2.6 1-5.3 3.8-5.3H829c13.6 0 21-16 12.2-26.4L320 0.5z"/>
    </svg>
  )
}

Vue.component('icon-indicator', Icon)
export default Icon

