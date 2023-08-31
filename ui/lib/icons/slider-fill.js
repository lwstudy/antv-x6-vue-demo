
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 191.8v64H388c-2.2 0-4 1.8-4 4V288c0 17.7-14.3 32-32 32H160c-17.7 0-32-14.3-32-32v-28.3c0-2.2-1.8-4-4-4H0v-64h124c2.2 0 4-1.8 4-4V160c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32v27.8c0 2.2 1.8 4 4 4h636zM1024 480v64H772c-2.2 0-4 1.8-4 4v28c0 17.7-14.3 32-32 32H544c-17.7 0-32-14.3-32-32v-28c0-2.2-1.8-4-4-4H0v-64h508c2.2 0 4-1.8 4-4v-28c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32v28c0 2.2 1.8 4 4 4h252zM1024 768.3v64H484c-2.2 0-4 1.8-4 4V864c0 17.7-14.3 32-32 32H256c-17.7 0-32-14.3-32-32v-27.8c0-2.2-1.8-4-4-4H0v-64h220c2.2 0 4-1.8 4-4V736c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32v28.3c0 2.2 1.8 4 4 4h540z"/>
    </svg>
  )
}

Vue.component('icon-slider-fill', Icon)
export default Icon

