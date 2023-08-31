
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M944.1 138.8L832 64H688c-8.8 0-16-7.2-16-16V0h-64v48c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16V0h-64v48c0 8.8-7.2 16-16 16H112v256h224c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H192L79.9 458.8c-38 25.3-38 81.2 0 106.5L192 640h144c8.8 0 16 7.2 16 16v368h64V656c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v368h64V656c0-8.8 7.2-16 16-16h224V384H688c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h144l112.1-74.8c38-25.3 38-81.1 0-106.4zM416 336c0-8.8 7.2-16 16-16h160c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H432c-8.8 0-16-7.2-16-16v-32z"/>
    </svg>
  )
}

Vue.component('icon-map-indicator-fill', Icon)
export default Icon

