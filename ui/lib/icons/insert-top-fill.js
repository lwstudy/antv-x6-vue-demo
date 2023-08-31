
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M719.8 704H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-351.9c12.4-21 33.8-31.4 55.1-31.4 21.4 0 42.7 10.5 55.1 31.4l207.8 351.9c25.2 42.6-5.6 96.5-55.1 96.5z"/>
    </svg>
  )
}

Vue.component('icon-insert-top-fill', Icon)
export default Icon

