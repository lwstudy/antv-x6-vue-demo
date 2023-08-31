
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 592V432c0-8.8-7.2-16-16-16H16c-8.8 0-16 7.2-16 16v160c0 8.8 7.2 16 16 16h992c8.8 0 16-7.2 16-16zM72 544c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h880c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H72z"/>
    </svg>
  )
}

Vue.component('icon-minus', Icon)
export default Icon

