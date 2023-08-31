
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 720V144c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v576c0 35.3 28.7 64 64 64h312c4.4 0 8 3.6 8 8v84c0 2.2-1.8 4-4 4h-60c-17.7 0-32 14.3-32 32v32h448v-32c0-17.7-14.3-32-32-32h-60c-2.2 0-4-1.8-4-4v-84c0-4.4 3.6-8 8-8h312c35.3 0 64-28.7 64-64zM572 880H452c-2.2 0-4-1.8-4-4v-52c0-4.4 3.6-8 8-8h112c4.4 0 8 3.6 8 8v52c0 2.2-1.8 4-4 4zM64 704V160c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v544c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16z"/>
    </svg>
  )
}

Vue.component('icon-pc', Icon)
export default Icon

