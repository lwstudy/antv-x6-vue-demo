
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M560 504v32c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-32c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8zM1024 504v409c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V504c0-4.4 3.6-8 8-8h384c4.4 0 8 3.6 8 8v40c0 35.3 28.7 64 64 64h96c35.3 0 64-28.7 64-64v-40c0-4.4 3.6-8 8-8h384c4.4 0 8 3.6 8 8zM896 177H744c-4.4 0-8-3.6-8-8v-25c0-53-43-96-96-96H384c-53 0-96 43-96 96v25c0 4.4-3.6 8-8 8H128C57.3 177 0 234.3 0 305v119c0 4.4 3.6 8 8 8h1008c4.4 0 8-3.6 8-8V305c0-70.7-57.3-128-128-128z m-544-33c0-17.7 14.3-32 32-32h256c17.7 0 32 14.3 32 32v24c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-24z"/>
    </svg>
  )
}

Vue.component('icon-briefcase-fill', Icon)
export default Icon

