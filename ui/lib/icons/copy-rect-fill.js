
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 192H848c-8.8 0-16-7.2-16-16V64c0-35.4-28.7-64-64-64H64C28.7 0 0 28.6 0 64v704c0 35.3 28.7 64 64 64h112c8.8 0 16 7.2 16 16v112c0 35.3 28.7 64 64 64h704c35.3 0 64-28.7 64-64V256c0-35.4-28.7-64-64-64z m-768 64v496c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h672c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16H256c-35.3 0-64 28.6-64 64z"/>
    </svg>
  )
}

Vue.component('icon-copy-rect-fill', Icon)
export default Icon

