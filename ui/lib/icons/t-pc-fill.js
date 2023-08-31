
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M800 256h-44c-2.2 0-4-1.8-4-4V64c0-35.4-28.7-64-64-64H336c-35.3 0-64 28.6-64 64v188c0 2.2-1.8 4-4 4h-44c-35.3 0-64 28.6-64 64v672c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V320c0-35.4-28.7-64-64-64zM336 80c0-8.8 7.2-16 16-16h320c8.8 0 16 7.2 16 16v172c0 2.2-1.8 4-4 4H340c-2.2 0-4-1.8-4-4V80z"/>
    </svg>
  )
}

Vue.component('icon-t-pc-fill', Icon)
export default Icon

