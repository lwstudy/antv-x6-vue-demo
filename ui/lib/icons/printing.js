
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M864 352V154.7c0-17.1-6.8-33.4-18.9-45.4l-91.4-90.7C741.7 6.7 725.5 0 708.6 0H160v352H96c-53 0-96 43-96 96v384h160v128c0 35.3 28.7 64 64 64h576c35.3 0 64-28.7 64-64V832h160V352H864zM224 64h478c4.2 0 8.3 1.7 11.3 4.6l82 81.3c3 3 4.7 7.1 4.7 11.4V528H224V64z m544 896H256c-17.7 0-32-14.3-32-32V720h576v208c0 17.7-14.3 32-32 32z m192-192h-96V656H160v112H64V448c0-17.7 14.3-32 32-32h64v176h704V416h96v352zM912 432c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32z"/>
    </svg>
  )
}

Vue.component('icon-printing', Icon)
export default Icon

