
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 272c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z m0 64c70.7 0 128-57.3 128-128S582.7 80 512 80s-128 57.3-128 128 57.3 128 128 128zM576 480v384c0 8.8-7.2 16-16 16h-96c-8.8 0-16-7.2-16-16V480c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16z m-192-16v416c0 35.3 28.7 64 64 64h128c35.3 0 64-28.7 64-64V464c0-35.3-28.7-64-64-64H448c-35.3 0-64 28.7-64 64z"/>
    </svg>
  )
}

Vue.component('icon-message', Icon)
export default Icon

