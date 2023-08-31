
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M890.5 250.5l-213-213C653.5 13.5 620.9 0 587 0H160c-35.3 0-64 28.6-64 64v896c0 35.3 28.7 64 64 64h704c35.3 0 64-28.7 64-64V341c0-33.9-13.5-66.5-37.5-90.5zM640 90.5L837.5 288H704c-35.3 0-64-28.7-64-64V90.5z"/>
    </svg>
  )
}

Vue.component('icon-file-fill', Icon)
export default Icon

