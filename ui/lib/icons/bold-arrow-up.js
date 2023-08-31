
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 264.3c22 0 43.5 7.6 60.5 21.5L960.5 601v74.5L592.8 376.3c-22.8-18.5-51.4-28.7-80.8-28.7-29.3 0-58 10.2-80.7 28.7L64 674.7v-74L451.5 285.8c17-13.9 38.5-21.5 60.5-21.5m0-64c-35.8 0-71.5 11.9-100.9 35.8L11.8 560.6C4.3 566.7 0 575.8 0 585.4v206.9c0 4.8 3.9 8 8 8 1.7 0 3.5-0.6 5-1.8L471.6 426c11.8-9.6 26.1-14.3 40.4-14.3 14.3 0 28.6 4.8 40.4 14.4L1011.5 799.5c1.5 1.2 3.3 1.8 5 1.8 4.1 0 8-3.3 8-8V585.8c0-9.6-4.3-18.8-11.8-24.8L612.9 236.1c-29.4-23.9-65.1-35.8-100.9-35.8z"/>
    </svg>
  )
}

Vue.component('icon-bold-arrow-up', Icon)
export default Icon

