
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M944 73.2v774.5c0 79.4-71.6 143.7-160 143.7s-160-64.3-160-143.7c0-79.4 71.6-143.7 160-143.7h80c8.8 0 16-7.2 16-16V289.4c0-2.5-2.2-4.4-4.7-3.9l-568 97c-1.9 0.3-3.3 2-3.3 3.9v341.3c0 75-68 135.7-152 135.7S0 802.7 0 727.7C0 652.8 68 592 152 592h72c8.8 0 16-7.2 16-16V159.6c0-31.7 23.2-58.6 54.5-63.3l576-86.4C909.2 4.1 944 34 944 73.2z"/>
    </svg>
  )
}

Vue.component('icon-music-fill', Icon)
export default Icon

