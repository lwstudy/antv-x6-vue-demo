
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M800 349.4V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h672c35.3 0 64-28.7 64-64v-93.4c0-2.9 3-4.8 5.6-3.7L934 728c42.3 18.8 90-12.2 90-58.5v-315c0-46.3-47.7-77.3-90-58.5l-128.4 57.1c-2.6 1.1-5.6-0.8-5.6-3.7zM720 768H80c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h640c8.8 0 16 7.2 16 16v480c0 8.8-7.2 16-16 16z m217.5-108.5l-128-56.9c-5.8-2.6-9.5-8.3-9.5-14.6V436c0-6.3 3.7-12.1 9.5-14.6l128-56.9c10.6-4.7 22.5 3 22.5 14.6v265.8c0 11.6-11.9 19.3-22.5 14.6z"/>
    </svg>
  )
}

Vue.component('icon-vcr', Icon)
export default Icon

