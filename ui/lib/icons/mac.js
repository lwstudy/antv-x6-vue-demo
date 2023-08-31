
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 224v576c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m944 576H80c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v544c0 8.8-7.2 16-16 16zM160 304v432h64v-80h64v80h64v-80h64v80h64v-80h64v80h64v-80h64v80h64v-80h64v80h64V304c0-8.8-7.2-16-16-16H176c-8.8 0-16 7.2-16 16z m636 288H228c-2.2 0-4-1.8-4-4V356c0-2.2 1.8-4 4-4h568c2.2 0 4 1.8 4 4v232c0 2.2-1.8 4-4 4zM432 384h-64l-16 15-16-15h-64v160h32V432h32v112h32V432h32v112h32V384zM752 512v32H624V384h112v32h-80v96zM560 384h-96v160h32v-48h64v48h32V416l-32-32z m0 80h-64v-48h64v48z"/>
    </svg>
  )
}

Vue.component('icon-mac', Icon)
export default Icon

