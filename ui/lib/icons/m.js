
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M181.198645 0l140.9498 0 188.412689 542.196489 2.877733 0L700.412689 0l142.388666 0 0 1024-146.685556 0L696.115799 401.246689l-2.877733 0-145.246689 440.096089-73.362488 0L330.781645 401.246689 327.903911 401.246689l0 622.753311L181.198645 1024 181.198645 0z"/>
    </svg>
  )
}

Vue.component('icon-m', Icon)
export default Icon

