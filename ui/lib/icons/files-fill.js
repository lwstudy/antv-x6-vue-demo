
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M848 224H731c-6.1 0-11-4.9-11-11V64c0-35.4-28.7-64-64-64H453c-34 0-66.5 13.5-90.5 37.5l-213 213c-24 24-37.5 56.6-37.5 90.5v395c0 35.3 28.7 64 64 64h112c8.8 0 16 7.2 16 16v144c0 35.3 28.7 64 64 64h480c35.3 0 64-28.7 64-64V288c0-35.4-28.7-64-64-64z m-256 90.5V448c0 35.3-28.7 64-64 64H394.5L592 314.5z m-192-224V224c0 35.3-28.7 64-64 64H202.5L400 90.5zM848 928c0 17.7-14.3 32-32 32H400c-17.7 0-32-14.3-32-32V576h160c70.7 0 128-57.3 128-128V288h160c17.7 0 32 14.3 32 32v608z"/>
    </svg>
  )
}

Vue.component('icon-files-fill', Icon)
export default Icon

