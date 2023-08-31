
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 768V128c0-17.7-14.3-32-32-32H32c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h440c4.4 0 8 3.6 8 8v24c0 17.7-14.3 32-32 32H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h480c17.7 0 32-14.3 32-32s-14.3-32-32-32H576c-17.7 0-32-14.3-32-32v-24c0-4.4 3.6-8 8-8h440c17.7 0 32-14.3 32-32zM64 720V176c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v544c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16z"/>
    </svg>
  )
}

Vue.component('icon-tv', Icon)
export default Icon

