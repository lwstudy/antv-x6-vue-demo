
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M464 544v48h112v32H464v48h112v32H432V512h144v32zM928 512v192h-32V544h-32v160h-32V544h-32v160h-32V512zM640 544v64h96v96H608v-32h96v-32h-96V512h128v32zM0 192v640c0 17.7 14.3 32 32 32h960c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32z m72 32h880c4.4 0 8 3.6 8 8v56H64v-56c0-4.4 3.6-8 8-8z m884 576H68c-2.2 0-4-1.8-4-4V352h896v444c0 2.2-1.8 4-4 4z"/>
    </svg>
  )
}

Vue.component('icon-esm', Icon)
export default Icon

