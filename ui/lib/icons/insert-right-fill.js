
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M768.5 567.1l-352 207.8c-10.4 6.2-21.6 9-32.4 9-33.4 0-64.1-26.7-64.1-64.1V304.2c0-37.4 30.7-64.1 64.1-64.1 10.8 0 22 2.8 32.4 9l351.9 207.8c42 24.8 42 85.4 0.1 110.2z"/>
    </svg>
  )
}

Vue.component('icon-insert-right-fill', Icon)
export default Icon

