
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 592V432c0-8.8-7.2-16-16-16H624c-8.8 0-16-7.2-16-16V16c0-8.8-7.2-16-16-16H432c-8.8 0-16 7.2-16 16v384c0 8.8-7.2 16-16 16H16c-8.8 0-16 7.2-16 16v160c0 8.8 7.2 16 16 16h384c8.8 0 16 7.2 16 16v384c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V624c0-8.8 7.2-16 16-16h384c8.8 0 16-7.2 16-16zM536 960h-48c-4.4 0-8-3.6-8-8V560c0-8.8-7.2-16-16-16H72c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h392c8.8 0 16-7.2 16-16V72c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v392c0 8.8 7.2 16 16 16h392c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H560c-8.8 0-16 7.2-16 16v392c0 4.4-3.6 8-8 8z"/>
    </svg>
  )
}

Vue.component('icon-plus', Icon)
export default Icon

