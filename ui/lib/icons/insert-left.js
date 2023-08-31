
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M640 304.2v415.6L288 512l352-207.8m-0.2-64.1c-10.8 0-22 2.8-32.4 9L255.5 456.9c-41.9 24.8-41.9 85.4 0 110.2l351.9 207.8c10.5 6.2 21.6 9 32.4 9 33.4 0 64.1-26.7 64.1-64.1V304.2c0.1-37.4-30.7-64.1-64.1-64.1z"/>
    </svg>
  )
}

Vue.component('icon-insert-left', Icon)
export default Icon

