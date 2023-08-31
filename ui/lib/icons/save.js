
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M32 16v880c0 70.7 57.3 128 128 128h816c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16H48c-8.8 0-16 7.2-16 16z m240 48h480c8.8 0 16 7.2 16 16v296c0 4.4-3.6 8-8 8H264c-4.4 0-8-3.6-8-8V80c0-8.8 7.2-16 16-16z m464 896H448V832h-64v128h-96V704h448v256z m192 0H800V648c0-4.4-3.6-8-8-8H232c-4.4 0-8 3.6-8 8v312h-64c-35.3 0-64-28.7-64-64V64h80c8.8 0 16 7.2 16 16v304c0 35.3 28.7 64 64 64h512c35.3 0 64-28.7 64-64V80c0-8.8 7.2-16 16-16h80v896z"/>
    </svg>
  )
}

Vue.component('icon-save', Icon)
export default Icon

