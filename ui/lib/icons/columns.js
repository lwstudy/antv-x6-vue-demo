
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 160v752c0 8.8 7.2 16 16 16h992c8.8 0 16-7.2 16-16V160c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m68 128h408c2.2 0 4 1.8 4 4v568c0 2.2-1.8 4-4 4H68c-2.2 0-4-1.8-4-4V292c0-2.2 1.8-4 4-4z m888 576H548c-2.2 0-4-1.8-4-4V292c0-2.2 1.8-4 4-4h408c2.2 0 4 1.8 4 4v568c0 2.2-1.8 4-4 4z m4-640H64v-32c0-17.7 14.3-32 32-32h832c17.7 0 32 14.3 32 32v32z"/>
    </svg>
  )
}

Vue.component('icon-columns', Icon)
export default Icon

