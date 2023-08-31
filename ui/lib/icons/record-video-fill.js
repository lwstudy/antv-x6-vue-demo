
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M934 296l-111.5 49.6c-10.6 4.7-22.5-3-22.5-14.6v-75c0-35.4-28.7-64-64-64H64c-35.3 0-64 28.6-64 64v512c0 35.3 28.7 64 64 64h672c35.3 0 64-28.7 64-64v-74.9c0-11.6 11.9-19.3 22.5-14.6L934 728c42.3 18.8 90-12.2 90-58.5v-315c0-46.3-47.7-77.3-90-58.5zM503.9 553.6L340.5 648c-7.7 4.5-15.9 6.5-23.9 6.5-25.1 0-48.1-20-48.1-48.1V417.6c0-28 23-48.1 48.1-48.1 8 0 16.2 2 23.9 6.5l163.4 94.4c32 18.5 32 64.7 0 83.2zM447.9 512l-115.5 66.6V445.3z"/>
    </svg>
  )
}

Vue.component('icon-record-video-fill', Icon)
export default Icon

