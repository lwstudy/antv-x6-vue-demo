
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M805.3 760.1c12.5 12.5 12.5 32.8 0 45.3-6.3 6.3-14.4 9.4-22.6 9.4s-16.4-3.1-22.6-9.4L517.7 562.9c-3.1-3.1-8.2-3.1-11.3 0L263.9 805.3c-6.3 6.3-14.4 9.4-22.6 9.4s-16.4-3.1-22.6-9.4c-12.5-12.5-12.5-32.8 0-45.3l242.4-242.4c3.1-3.1 3.1-8.2 0-11.3L218.7 263.9c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L506.4 461c3.1 3.1 8.2 3.1 11.3 0l242.4-242.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3L562.9 506.3c-3.1 3.1-3.1 8.2 0 11.3l242.4 242.5zM64 352H0V0h352v64H64zM1024 352h-64V64H672V0h352zM352 1024H0V672h64v288h288zM1024 1024H672v-64h288V672h64z"/>
    </svg>
  )
}

Vue.component('icon-full', Icon)
export default Icon

