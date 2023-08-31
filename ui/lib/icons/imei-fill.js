
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 160H64c-35.3 0-64 28.6-64 64v576c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V224c0-35.4-28.7-64-64-64zM800 412c0 2.2-1.8 4-4 4H644c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h152c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4H644c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h152c2.2 0 4 1.8 4 4v44c0 8.8-7.2 16-16 16H608c-17.7 0-32-14.3-32-32V384c0-17.7 14.3-32 32-32h176c8.8 0 16 7.2 16 16v44z m48-60h64v320h-64V352zM464 668V420c0-2.2-1.8-4-4-4h-55c-2.2 0-4 1.8-4 4v248c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V420c0-2.2-1.8-4-4-4h-41c-2.2 0-4 1.8-4 4v248c0 2.2-1.8 4-4 4h-44c-8.8 0-16-7.2-16-16V384c0-17.7 14.3-32 32-32h240c17.7 0 32 14.3 32 32v272c0 8.8-7.2 16-16 16h-44c-2.2 0-4-1.8-4-4z m-352 4V352h64v320h-64z"/>
    </svg>
  )
}

Vue.component('icon-imei-fill', Icon)
export default Icon
