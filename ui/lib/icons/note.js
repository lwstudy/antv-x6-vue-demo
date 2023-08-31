
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 32v960c0 17.7 14.3 32 32 32h645.5c17 0 33.3-6.7 45.3-18.7l282.5-282.5c12-12 18.7-28.3 18.7-45.3V32c0-17.7-14.3-32-32-32H32C14.3 0 0 14.3 0 32z m704 864V768c0-35.3 28.7-64 64-64h128L704 896z m240-256H768c-70.7 0-128 57.3-128 128v176c0 8.8-7.2 16-16 16H68c-2.2 0-4-1.8-4-4V68c0-2.2 1.8-4 4-4h888c2.2 0 4 1.8 4 4v556c0 8.8-7.2 16-16 16z"/>
    </svg>
  )
}

Vue.component('icon-note', Icon)
export default Icon

