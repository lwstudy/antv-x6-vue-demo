
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 128c-212.1 0-384 171.9-384 384s171.9 384 384 384 384-171.9 384-384-171.9-384-384-384z m224 397.3L557.3 704c-25 25-65.5 25-90.5 0L288 525.3c-6.3-6.3-9.4-14.4-9.4-22.6s3.1-16.4 9.4-22.6c12.5-12.5 32.8-12.5 45.3 0l167.4 167.4c6.2 6.2 16.4 6.2 22.6 0L690.7 480c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/>
    </svg>
  )
}

Vue.component('icon-window-down-fill', Icon)
export default Icon

