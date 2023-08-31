
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 384c55.6 0 107.8 21.6 147.1 60.9S720 536.4 720 592s-21.6 107.8-60.9 147.1S567.6 800 512 800s-107.8-21.6-147.1-60.9S304 647.6 304 592s21.6-107.8 60.9-147.1S456.4 384 512 384z m0-64c-150.2 0-272 121.8-272 272s121.8 272 272 272 272-121.8 272-272-121.8-272-272-272zM650.9 128l4.4 23.6C666.7 212.1 719.6 256 781.1 256H896c35.3 0 64 28.7 64 64v512c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V320c0-35.3 28.7-64 64-64h114.9c61.6 0 114.5-43.9 125.8-104.4l4.4-23.6h277.8z m39.8-64H333.3c-7.7 0-14.3 5.5-15.7 13.1l-11.8 62.7c-5.7 30.3-32.1 52.2-62.9 52.2H128C57.3 192 0 249.3 0 320v512c0 70.7 57.3 128 128 128h768c70.7 0 128-57.3 128-128V320c0-70.7-57.3-128-128-128H781.1c-30.8 0-57.2-21.9-62.9-52.2l-11.8-62.7c-1.4-7.6-8-13.1-15.7-13.1zM224 352h-64c-17.7 0-32-14.3-32-32s14.3-32 32-32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32zM512 560c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32z m0-64c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96z"/>
    </svg>
  )
}

Vue.component('icon-camera', Icon)
export default Icon

