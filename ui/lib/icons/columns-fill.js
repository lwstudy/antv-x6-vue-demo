
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 96H64c-35.3 0-64 28.6-64 64v752c0 8.8 7.2 16 16 16h992c8.8 0 16-7.2 16-16V160c0-35.4-28.7-64-64-64zM480 860c0 2.2-1.8 4-4 4H68c-2.2 0-4-1.8-4-4V292c0-2.2 1.8-4 4-4h408c2.2 0 4 1.8 4 4v568z m480 0c0 2.2-1.8 4-4 4H548c-2.2 0-4-1.8-4-4V292c0-2.2 1.8-4 4-4h408c2.2 0 4 1.8 4 4v568z"/>
    </svg>
  )
}

Vue.component('icon-columns-fill', Icon)
export default Icon

