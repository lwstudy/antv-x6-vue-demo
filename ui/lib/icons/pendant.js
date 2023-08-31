
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M544 388.5V32c0-17.7-14.3-32-32-32s-32 14.3-32 32v356.5c0 42.2-21.2 81.3-55.9 105.2-86.6 59.4-147.7 195.6-147.7 294.7 0 130.1 105.5 235.6 235.6 235.6s235.6-105.5 235.6-235.6c0-99-61.1-235.2-147.7-294.7-34.7-23.8-55.9-63-55.9-105.2z m89.3 521.2C600.9 942.1 557.8 960 512 960s-88.9-17.9-121.3-50.3c-32.4-32.4-50.3-75.5-50.3-121.3 0-52.8 23-121.8 58.5-175.8 17.9-27.3 38.3-49.5 58.8-64.2 18.8-13.5 37.1-20.4 54.4-20.4s35.5 6.8 54.4 20.4c20.5 14.7 40.8 36.9 58.8 64.2 35.5 54 58.5 123 58.5 175.8-0.2 45.8-18 88.9-50.5 121.3z"/>
    </svg>
  )
}

Vue.component('icon-pendant', Icon)
export default Icon

