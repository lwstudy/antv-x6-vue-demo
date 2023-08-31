
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 160v704c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m944 704H80c-8.8 0-16-7.2-16-16V360c0-4.4 3.6-8 8-8h880c4.4 0 8 3.6 8 8v488c0 8.8-7.2 16-16 16z m8-576H72c-4.4 0-8-3.6-8-8V176c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v104c0 4.4-3.6 8-8 8zM848 256c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zM720 256c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32zM592 256c-17.7 0-32-14.3-32-32s14.3-32 32-32 32 14.3 32 32-14.3 32-32 32z"/>
    </svg>
  )
}

Vue.component('icon-window', Icon)
export default Icon

