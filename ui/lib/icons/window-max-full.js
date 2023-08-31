
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m224 512c0 26.5-21.5 48-48 48H336c-26.5 0-48-21.5-48-48V352c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v288zM672 404v24c0 2.2-1.8 4-4 4H356c-2.2 0-4-1.8-4-4v-24c0-2.2 1.8-4 4-4h312c2.2 0 4 1.8 4 4zM672 500v108c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V500c0-2.2 1.8-4 4-4h312c2.2 0 4 1.8 4 4z"/>
    </svg>
  )
}

Vue.component('icon-window-max-full', Icon)
export default Icon

