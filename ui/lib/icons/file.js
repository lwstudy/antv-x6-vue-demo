
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M587 0H160c-35.3 0-64 28.7-64 64v896c0 35.3 28.7 64 64 64h704c35.3 0 64-28.7 64-64V341c0-33.9-13.5-66.5-37.5-90.5l-213-213C653.5 13.5 620.9 0 587 0z m53 90.5L837.5 288H704c-35.3 0-64-28.7-64-64V90.5zM832 960H192c-17.7 0-32-14.3-32-32V96c0-17.7 14.3-32 32-32h384v160c0 70.7 57.3 128 128 128h160v576c0 17.7-14.3 32-32 32z"/>
    </svg>
  )
}

Vue.component('icon-file', Icon)
export default Icon

