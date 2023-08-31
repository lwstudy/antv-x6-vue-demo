
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m208 704h-64V522.7l-307.6 205c-5.3 3.5-12.4-0.3-12.4-6.7V303c0-6.4 7.1-10.2 12.4-6.7l307.6 205V320h64v384z"/>
    </svg>
  )
}

Vue.component('icon-next-fill', Icon)
export default Icon

