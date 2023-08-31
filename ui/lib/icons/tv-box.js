
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 484v152c0 2.2-1.8 4-4 4H68c-2.2 0-4-1.8-4-4V484c0-2.2 1.8-4 4-4h888c2.2 0 4 1.8 4 4zM16 416c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h992c8.8 0 16-7.2 16-16V432c0-8.8-7.2-16-16-16H16zM1020 384H4c-2.2 0-4-1.8-4-4v-28c0-8.8 7.2-16 16-16h992c8.8 0 16 7.2 16 16v28c0 2.2-1.8 4-4 4zM848 512c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zM720 512c-26.5 0-48 21.5-48 48s21.5 48 48 48 48-21.5 48-48-21.5-48-48-48zM592 528c-17.7 0-32 14.3-32 32s14.3 32 32 32 32-14.3 32-32-14.3-32-32-32zM128 528h352v64H128z"/>
    </svg>
  )
}

Vue.component('icon-tv-box', Icon)
export default Icon

