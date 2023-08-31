
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M257 214l539.6 298L257 810V214m-15.9-75.2c-25.1 0-48.1 20.1-48.1 48.1v650.2c0 28 22.9 48.1 48.1 48.1 7.7 0 15.6-1.9 23.1-6.1L852.9 554c33.1-18.3 33.1-65.8 0-84L264.2 144.9c-7.5-4.2-15.4-6.1-23.1-6.1z"/>
    </svg>
  )
}

Vue.component('icon-play', Icon)
export default Icon

