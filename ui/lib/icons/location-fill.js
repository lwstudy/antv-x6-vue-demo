
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M782.8 112.2C713.5 42.9 617.7 0 512 0 300.5 0 129 171.5 129 383c0 84 27.1 161.8 73.2 225.3L512 1024l302.6-406.5c50.2-65 80.4-145.9 80.4-234.5 0-105.7-42.9-201.5-112.2-270.8zM512 563.2c-99.3 0-180.2-80.4-180.2-180.2 0-99.8 80.9-179.7 180.2-179.7s180.2 80.4 180.2 180.2S611.3 563.2 512 563.2z"/>
    </svg>
  )
}

Vue.component('icon-location-fill', Icon)
export default Icon

