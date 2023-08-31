
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1017.1 360.2L470.8 906.5c-25 25-65.5 25-90.5 0L6.9 533.1c-6.2-6.2-6.2-16.4 0-22.6L120 397.4c6.2-6.2 16.4-6.2 22.6 0l277.2 277.2c3.1 3.1 8.2 3.1 11.3 0l450.2-450.1c6.2-6.2 16.4-6.2 22.6 0L1017 337.6c6.3 6.2 6.3 16.4 0.1 22.6z"/>
    </svg>
  )
}

Vue.component('icon-ok-fill', Icon)
export default Icon

