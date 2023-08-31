
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1008 416H16c-8.8 0-16 7.2-16 16v256c0 8.8 7.2 16 16 16h992c8.8 0 16-7.2 16-16V432c0-8.8-7.2-16-16-16zM128 592v-64h352v64H128z m432-32c0-17.7 14.3-32 32-32s32 14.3 32 32-14.3 32-32 32-32-14.3-32-32z m112 0c0-26.5 21.5-48 48-48s48 21.5 48 48-21.5 48-48 48-48-21.5-48-48z m176 48c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM1020 384H4c-2.2 0-4-1.8-4-4v-28c0-8.8 7.2-16 16-16h992c8.8 0 16 7.2 16 16v28c0 2.2-1.8 4-4 4z"/>
    </svg>
  )
}

Vue.component('icon-tv-box-fill', Icon)
export default Icon

