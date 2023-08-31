
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M719.8 480H304.2c-49.5 0-80.3-53.9-55.1-96.5l207.8-352C469.3 10.5 490.7 0 512 0s42.7 10.5 55.1 31.5l207.8 351.9c25.2 42.7-5.5 96.6-55.1 96.6z"/>
    </svg>
  )
}

Vue.component('icon-sort-up-fill', Icon)
export default Icon

