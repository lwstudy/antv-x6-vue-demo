
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M944 640h-64v258h64V640zM1023.3 897.7H802.7L913 1008l110.3-110.3zM880 128H64c-35.3 0-64 28.6-64 64v152c0 4.4 3.6 8 8 8h928c4.4 0 8-3.6 8-8V192c0-35.4-28.7-64-64-64z m-752 96h80v32h-80v-32zM936 384H8c-4.4 0-8 3.6-8 8v208c0 4.4 3.6 8 8 8h928c4.4 0 8-3.6 8-8V392c0-4.4-3.6-8-8-8zM208 512h-80v-32h80v32zM824 640H8c-4.4 0-8 3.6-8 8v208c0 4.4 3.6 8 8 8h816c4.4 0 8-3.6 8-8V648c0-4.4-3.6-8-8-8zM208 768h-80v-32h80v32z"/>
    </svg>
  )
}

Vue.component('icon-data-download-fill', Icon)
export default Icon

