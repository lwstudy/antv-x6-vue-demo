
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 192v96H0v-96c0-17.7 14.3-32 32-32h960c17.7 0 32 14.3 32 32zM0 352v480c0 17.7 14.3 32 32 32h960c17.7 0 32-14.3 32-32V352H0z m576 192H464v48h112v32H464v48h112v32H432V512h144v32z m160 0h-96v64h96v96H608v-32h96v-32h-96V512h128v32z m192 160h-32V544h-32v160h-32V544h-32v160h-32V512h160v192z"/>
    </svg>
  )
}

Vue.component('icon-esm-fill', Icon)
export default Icon

