
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M976 736H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h928c26.5 0 48-21.5 48-48V784c0-26.5-21.5-48-48-48zM736 896c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32z m128 32c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zM696.6 344.4H592c-17.7 0-32-14.3-32-32V4h-96v308.4c0 17.7-14.3 32-32 32H327.4c-3.1 0-5 3.3-3.5 6L508.5 670c1.5 2.7 5.4 2.7 6.9 0L700 350.4c1.6-2.7-0.4-6-3.4-6z"/>
    </svg>
  )
}

Vue.component('icon-download-fill', Icon)
export default Icon

