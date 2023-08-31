
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M775.8 648.7V564c0-2.2-1.8-4-4-4H252.2c-2.2 0-4 1.8-4 4v84.7c0 3.1-3.3 5-6 3.5L11.5 518.9c-5.3-3.1-5.3-10.8 0-13.9l230.7-133.2c2.7-1.5 6 0.4 6 3.5V460c0 2.2 1.8 4 4 4h519.6c2.2 0 4-1.8 4-4v-84.7c0-3.1 3.3-5 6-3.5L1012.5 505c5.3 3.1 5.3 10.8 0 13.9L781.8 652.1c-2.7 1.6-6-0.3-6-3.4z"/>
    </svg>
  )
}

Vue.component('icon-link-arrow-h-fill', Icon)
export default Icon

