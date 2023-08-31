
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M976 0H48c-8.8 0-16 7.2-16 16v880c0 70.7 57.3 128 128 128h816c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM256 80c0-8.8 7.2-16 16-16h480c8.8 0 16 7.2 16 16v296c0 4.4-3.6 8-8 8H264c-4.4 0-8-3.6-8-8V80z m480 880H448V832h-64v128h-96V704h448v256z"/>
    </svg>
  )
}

Vue.component('icon-save-fill', Icon)
export default Icon

