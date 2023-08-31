
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512c0 272 212.1 494.5 480 511 10.6 0.7 21.3 1 32 1s21.4-0.3 32-1c267.9-16.5 480-239 480-511C1024 229.2 794.8 0 512 0z m-32 941.4c0 9.5-8.3 17-17.8 15.9-42.9-4.7-84.7-15.6-124.6-32.5-53.3-22.6-101.3-54.9-142.4-96-41.2-41.2-73.5-89.1-96-142.4C75.8 631.2 64 572.5 64 512s11.8-119.2 35.2-174.4c22.6-53.3 54.9-101.3 96-142.4 41.2-41.2 89.1-73.5 142.4-96 39.9-16.9 81.7-27.8 124.6-32.5 9.5-1 17.8 6.4 17.8 15.9v858.8z"/>
    </svg>
  )
}

Vue.component('icon-adjust-fill', Icon)
export default Icon

