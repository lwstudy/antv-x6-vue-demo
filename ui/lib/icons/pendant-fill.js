
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M747.6 788.4c0 130.1-105.5 235.6-235.6 235.6S276.4 918.5 276.4 788.4c0-99 61.1-235.2 147.7-294.6 34.8-23.9 55.9-63 55.9-105.2V32c0-8.8 3.6-16.8 9.4-22.6C495.2 3.6 503.2 0 512 0c17.7 0 32 14.3 32 32v356.5c0 42.2 21.2 81.4 55.9 105.2 86.6 59.5 147.7 195.7 147.7 294.7z"/>
    </svg>
  )
}

Vue.component('icon-pendant-fill', Icon)
export default Icon

