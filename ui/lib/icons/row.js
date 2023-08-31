
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M992 255.8H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h960c17.7 0 32 14.3 32 32 0 17.6-14.3 32-32 32zM992 544H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h960c17.7 0 32 14.3 32 32s-14.3 32-32 32zM992 832.3H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h960c17.7 0 32 14.3 32 32 0 17.6-14.3 32-32 32z"/>
    </svg>
  )
}

Vue.component('icon-row', Icon)
export default Icon

