
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m272 704h-64V525.6L486.3 724.8c-5.2 4.4-13.2 0.7-13.2-6.1V551L269.2 724.8c-5.2 4.4-13.2 0.7-13.2-6.1V305.3c0-6.8 8-10.5 13.2-6.1L473.1 473V305.3c0-6.8 8-10.5 13.2-6.1L720 498.4V320h64v384z"/>
    </svg>
  )
}

Vue.component('icon-next-step-fill', Icon)
export default Icon

