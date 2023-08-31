
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024.5 585.8v207.5c0 4.8-3.9 8-8 8-1.7 0-3.5-0.6-5-1.8L552.4 426c-11.8-9.6-26.1-14.4-40.4-14.4-14.3 0-28.6 4.8-40.4 14.3L13 798.5c-1.5 1.3-3.3 1.8-5 1.8-4.1 0-8-3.3-8-8V585.4c0-9.6 4.3-18.8 11.8-24.8l399.3-324.5c29.4-23.9 65.2-35.8 100.9-35.8 35.8 0 71.5 11.9 100.9 35.8L1012.7 561c7.5 6 11.8 15.2 11.8 24.8z"/>
    </svg>
  )
}

Vue.component('icon-bold-arrow-up-fill', Icon)
export default Icon

