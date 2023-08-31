
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M480 96v288c0 53-43 96-96 96H96c-53 0-96-43-96-96V96C0 43 43 0 96 0h288c53 0 96 43 96 96zM1024 96v288c0 53-43 96-96 96H640c-53 0-96-43-96-96V96c0-53 43-96 96-96h288c53 0 96 43 96 96zM480 640v288c0 53-43 96-96 96H96c-53 0-96-43-96-96V640c0-53 43-96 96-96h288c53 0 96 43 96 96zM1024 640v288c0 53-43 96-96 96H640c-53 0-96-43-96-96V640c0-53 43-96 96-96h288c53 0 96 43 96 96z"/>
    </svg>
  )
}

Vue.component('icon-split-screen-compare-fill', Icon)
export default Icon

