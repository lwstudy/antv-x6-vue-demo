
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 512c0 229.8-229.2 416-512 416-91.2 0-176.8-19.4-251-53.4-6.8-3.1-14.7-1.1-19.3 4.8-11.8 15.4-27.9 31.2-49.3 44-32.8 19.6-65.4 25-91.5 25-19.6 0-35.5-3.1-44.8-5.4a31.82 31.82 0 0 1-22.2-20.1c-3.6-9.9-2.1-21 4.1-29.6 17.1-23.8 32.3-49.2 45.3-75.5 6.9-14.1 13.3-28.6 19-43.3 2.2-5.6 0.9-12-3.1-16.5C36.8 689.1 0 604.1 0 512 0 282.3 229.2 96 512 96s512 186.3 512 416z"/>
    </svg>
  )
}

Vue.component('icon-comment2-fill', Icon)
export default Icon

