
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M208 436m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0ZM959.4 548H368c-8.8 0-16-7.2-16-16V340c0-8.8 7.2-16 16-16h384c117.9 0 214.6 91.1 223.3 206.8 0.7 9.3-6.6 17.2-15.9 17.2zM1024 596v216c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V644c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16v168c0 2.2-1.8 4-4 4H4c-2.2 0-4-1.8-4-4V212c0-2.2 1.8-4 4-4h44c8.8 0 16 7.2 16 16v308c0 17.7 14.3 32 32 32h896c17.7 0 32 14.3 32 32z"/>
    </svg>
  )
}

Vue.component('icon-bed-fill', Icon)
export default Icon

