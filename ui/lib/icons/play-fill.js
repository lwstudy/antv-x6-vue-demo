
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M852.9 554L264.2 879.1c-7.5 4.1-15.4 6-23.1 6C216 885.1 193 865 193 837V186.9c0-28 23-48.1 48.1-48.1 7.7 0 15.6 1.9 23.1 6L852.9 470c33.1 18.2 33.1 65.8 0 84z"/>
    </svg>
  )
}

Vue.component('icon-play-fill', Icon)
export default Icon

