
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m240 767.2c0 6.7-7.8 10.5-13 6.2L480 563.8v202.9c0 6.8-8 10.5-13.2 6.1L167.2 518.1c-3.8-3.2-3.8-9 0-12.2l299.7-254.7c5.2-4.4 13.2-0.7 13.2 6.1v202.9l259-209.6c5.2-4.2 13-0.5 13 6.2v510.4z"/>
    </svg>
  )
}

Vue.component('icon-backward-fill', Icon)
export default Icon

