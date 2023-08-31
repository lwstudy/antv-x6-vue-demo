
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 32v608H704c-35.3 0-64 28.6-64 64v320H32c-17.7 0-32-14.3-32-32V32C0 14.3 14.3 0 32 0h960c17.7 0 32 14.3 32 32zM1018.2 704c-3.1 6.9-7.5 13.3-13 18.8l-282.5 282.5c-5.5 5.5-11.8 9.8-18.8 13V704h314.3z"/>
    </svg>
  )
}

Vue.component('icon-note-fill', Icon)
export default Icon

