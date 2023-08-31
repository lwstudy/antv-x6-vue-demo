
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M792 224.7v574.6H232V224.7h560m16-64H216c-26.5 0-48 21.5-48 48v606.6c0 26.5 21.5 48 48 48h592c26.5 0 48-21.5 48-48V208.7c0-26.5-21.5-48-48-48z"/>
    </svg>
  )
}

Vue.component('icon-stop', Icon)
export default Icon

