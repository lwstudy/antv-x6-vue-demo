
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M744.6 440.6H624c-8.8 0-16 7.2-16 16V765c0 35.3-28.7 64-64 64H292c-2.2 0-4-1.8-4-4v-88c0-2.2 1.8-4 4-4h204c8.8 0 16-7.2 16-16V456.6c0-8.8-7.2-16-16-16H375.4c-3.1 0-5-3.3-3.5-6L556.5 115c1.5-2.7 5.4-2.7 6.9 0L748 434.6c1.6 2.7-0.4 6-3.4 6z"/>
    </svg>
  )
}

Vue.component('icon-rise-full', Icon)
export default Icon

