
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M880 192H768c-8.8 0-16-7.2-16-16V64c0-35.4-28.7-64-64-64H144c-35.3 0-64 28.6-64 64v704c0 35.3 28.7 64 64 64h112c8.8 0 16 7.2 16 16v112c0 35.3 28.7 64 64 64h544c35.3 0 64-28.7 64-64V256c0-35.4-28.7-64-64-64z m0 752c0 8.8-7.2 16-16 16H352c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h512c8.8 0 16 7.2 16 16v672zM704 352H512c-17.7 0-32-14.3-32-32s14.3-32 32-32h192c17.7 0 32 14.3 32 32s-14.3 32-32 32z"/>
    </svg>
  )
}

Vue.component('icon-copy-fill', Icon)
export default Icon

