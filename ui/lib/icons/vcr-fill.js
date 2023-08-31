
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 354.5v315c0 46.3-47.7 77.3-90 58.5l-128.4-57.1c-2.6-1.2-5.6 0.8-5.6 3.7V768c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V256c0-35.4 28.7-64 64-64h672c35.3 0 64 28.6 64 64v93.4c0 2.9 3 4.8 5.6 3.7L934 296c42.3-18.8 90 12.2 90 58.5z"/>
    </svg>
  )
}

Vue.component('icon-vcr-fill', Icon)
export default Icon

