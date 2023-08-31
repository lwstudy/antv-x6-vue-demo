
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M144 768v64H64v-64h80m64-64H0v192h208V704zM416 576v256h-80V576h80m64-64H272v384h208V512zM688 352v480h-80V352h80m64-64H544v608h208V288zM960 192v640h-80V192h80m64-64H816v768h208V128z"/>
    </svg>
  )
}

Vue.component('icon-phone-signal', Icon)
export default Icon

