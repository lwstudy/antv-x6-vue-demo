
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M288 352v288c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V352c0-8.8-7.2-16-16-16H304c-8.8 0-16 7.2-16 16z m68 48h312c2.2 0 4 1.8 4 4v24c0 2.2-1.8 4-4 4H356c-2.2 0-4-1.8-4-4v-24c0-2.2 1.8-4 4-4z m300 224H368c-8.8 0-16-7.2-16-16V500c0-2.2 1.8-4 4-4h312c2.2 0 4 1.8 4 4v108c0 8.8-7.2 16-16 16z"/>
    </svg>
  )
}

Vue.component('icon-window-max', Icon)
export default Icon

