
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M768 80v821.1L548.7 747.6c-22-15.4-51.4-15.4-73.4 0L256 901.1V80c0-8.8 7.2-16 16-16h480c8.8 0 16 7.2 16 16zM256 0c-35.3 0-64 28.7-64 64v960l301.6-211.2c11-7.7 25.7-7.7 36.7 0L832 1024V64c0-35.3-28.7-64-64-64H256z"/>
    </svg>
  )
}

Vue.component('icon-bookmark', Icon)
export default Icon

