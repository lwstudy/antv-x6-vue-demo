
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M880.9 143.1l-334.5 669-35-245.2c-4-28.2-26.1-50.3-54.3-54.3l-245.2-35 669-334.5M1024 0L0 512l436.1 62.3c7 1 12.6 6.5 13.6 13.6L512 1024 1024 0z"/>
    </svg>
  )
}

Vue.component('icon-direction', Icon)
export default Icon

