
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 944c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V816c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v128zM48 736c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h928c26.5 0 48-21.5 48-48V784c0-26.5-21.5-48-48-48H48zM664.6 276.3H576c-17.7 0-32 14.3-32 32V672h-64V308.3c0-17.7-14.3-32-32-32h-88.6c-3.1 0-5-3.3-3.5-6L508.5 6c1.5-2.7 5.4-2.7 6.9 0L668 270.3c1.6 2.7-0.3 6-3.4 6zM768 864c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM864 864c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"/>
    </svg>
  )
}

Vue.component('icon-upload', Icon)
export default Icon

