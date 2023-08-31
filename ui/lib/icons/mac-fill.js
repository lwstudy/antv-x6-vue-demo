
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 160H64c-35.3 0-64 28.6-64 64v576c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V224c0-35.4-28.7-64-64-64z m0 624c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v544zM848 288H176c-8.8 0-16 7.2-16 16v432h64v-80h64v80h64v-80h64v80h64v-80h64v80h64v-80h64v80h64v-80h64v80h64V304c0-8.8-7.2-16-16-16zM432 544h-32V432h-32v112h-32V432h-32v112h-32V384h64l16 15 16-15h64v160z m160 0h-32v-48h-64v48h-32V384h96l32 32v128z m160 0H624V384h112v32h-80v96h96v32zM496 416h64v48h-64z"/>
    </svg>
  )
}

Vue.component('icon-mac-fill', Icon)
export default Icon

