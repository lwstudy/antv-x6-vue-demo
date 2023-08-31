
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 256v120c0 4.4 3.6 8 8 8h1008c4.4 0 8-3.6 8-8V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m496 56v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H504c-4.4 0-8-3.6-8-8zM0 440v176c0 4.4 3.6 8 8 8h1008c4.4 0 8-3.6 8-8V440c0-4.4-3.6-8-8-8H8c-4.4 0-8 3.6-8 8z m846 120H504c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM0 680v120c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V680c0-4.4-3.6-8-8-8H8c-4.4 0-8 3.6-8 8z m496 112v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H504c-4.4 0-8-3.6-8-8z"/>
    </svg>
  )
}

Vue.component('icon-server-fill', Icon)
export default Icon

