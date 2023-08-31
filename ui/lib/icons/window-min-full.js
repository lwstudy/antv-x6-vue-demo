
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m150.6 534.6c-5.8 5.8-13.8 9.4-22.6 9.4H384c-17.7 0-32-14.3-32-32 0-8.8 3.6-16.8 9.4-22.6 5.8-5.8 13.8-9.4 22.6-9.4h256c17.7 0 32 14.3 32 32 0 8.8-3.6 16.8-9.4 22.6z"/>
    </svg>
  )
}

Vue.component('icon-window-min-full', Icon)
export default Icon

