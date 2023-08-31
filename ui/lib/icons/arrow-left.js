
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M232.75 252.1l-214 214c-25 25-25 65.5 0 90.5l215 215c1.6 1.6 4.1 1.6 5.7 0L279.05 732c1.6-1.6 1.6-4.1 0-5.7L103.25 550.7c-2.5-2.5-0.7-6.8 2.8-6.8h914.1c2.2 0 4-1.8 4-4v-56c0-2.2-1.8-4-4-4H105.05c-3.6 0-5.3-4.3-2.8-6.8l175.7-175.7c1.6-1.6 1.6-4.1 0-5.7l-39.6-39.6c-1.5-1.6-4.1-1.6-5.6 0z"/>
    </svg>
  )
}

Vue.component('icon-arrow-left', Icon)
export default Icon

