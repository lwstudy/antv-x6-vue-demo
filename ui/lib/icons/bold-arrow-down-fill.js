
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024.5 208.3v207.5c0 9.6-4.3 18.8-11.8 24.8L612.9 765.5c-29.4 23.9-65.1 35.8-100.9 35.8-35.8 0-71.5-11.9-100.9-35.8L11.8 441C4.3 435 0 425.8 0 416.2V209.3c0-4.8 3.9-8 8-8 1.7 0 3.5 0.6 5 1.8l458.6 372.6c11.8 9.5 26.1 14.3 40.4 14.3 14.3 0 28.6-4.8 40.4-14.4L1011.5 202.1c1.5-1.3 3.3-1.8 5-1.8 4.1 0 8 3.3 8 8z"/>
    </svg>
  )
}

Vue.component('icon-bold-arrow-down-fill', Icon)
export default Icon

