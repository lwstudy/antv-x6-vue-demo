
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M704 304.2v415.6c0 37.4-30.7 64.1-64.1 64.1-10.8 0-22-2.8-32.4-9l-352-207.8c-41.9-24.8-41.9-85.5 0-110.2l351.9-207.8c10.5-6.2 21.6-9 32.4-9 33.5 0 64.2 26.7 64.2 64.1z"/>
    </svg>
  )
}

Vue.component('icon-insert-left-fill', Icon)
export default Icon

