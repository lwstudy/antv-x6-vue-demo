
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M856 208.7v606.6c0 26.5-21.5 48-48 48H216c-26.5 0-48-21.5-48-48V208.7c0-26.5 21.5-48 48-48h592c26.5 0 48 21.5 48 48z"/>
    </svg>
  )
}

Vue.component('icon-stop-fill', Icon)
export default Icon

