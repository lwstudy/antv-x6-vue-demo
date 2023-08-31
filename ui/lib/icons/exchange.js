
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M802.9 495.6V408c0-4.4-3.6-8-8-8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h762.9c4.4 0 8-3.6 8-8v-87.7L1024 368 802.9 495.6zM1024 656c0 17.7-14.3 32-32 32H229.1c-4.4 0-8 3.6-8 8v87.6L0 656l221.1-127.7V616c0 4.4 3.6 8 8 8H992c17.7 0 32 14.3 32 32z"/>
    </svg>
  )
}

Vue.component('icon-exchange', Icon)
export default Icon

