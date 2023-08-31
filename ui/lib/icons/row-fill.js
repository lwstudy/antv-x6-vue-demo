
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 287.8H64c-35.3 0-64-28.7-64-64s28.7-64 64-64h896c35.3 0 64 28.7 64 64s-28.7 64-64 64zM960 576H64c-35.3 0-64-28.7-64-64s28.7-64 64-64h896c35.3 0 64 28.7 64 64s-28.7 64-64 64zM960 864.3H64c-35.3 0-64-28.7-64-64s28.7-64 64-64h896c35.3 0 64 28.7 64 64s-28.7 64-64 64z"/>
    </svg>
  )
}

Vue.component('icon-row-fill', Icon)
export default Icon

