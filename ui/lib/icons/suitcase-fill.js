
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M744 177c-4.4 0-8-3.6-8-8v-25c0-53-43-96-96-96H384c-53 0-96 43-96 96v25c0 4.4-3.6 8-8 8h-16c-4.4 0-8 3.6-8 8v784c0 4.4 3.6 8 8 8h494c4.4 0 8-3.6 8-8V185c0-4.4-3.6-8-8-8h-14z m-392-33c0-17.7 14.3-32 32-32h256c17.7 0 32 14.3 32 32v24c0 4.4-3.6 8-8 8H360c-4.4 0-8-3.6-8-8v-24zM192 185v784c0 4.4-3.6 8-8 8H64c-35.3 0-64-28.7-64-64V305c0-70.7 57.3-128 128-128h56c4.4 0 8 3.6 8 8zM1024 305v608c0 35.3-28.7 64-64 64H838c-4.4 0-8-3.6-8-8V185c0-4.4 3.6-8 8-8h58c70.7 0 128 57.3 128 128z"/>
    </svg>
  )
}

Vue.component('icon-suitcase-fill', Icon)
export default Icon

