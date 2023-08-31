
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 0C229.2 0 0 229.2 0 512s229.2 512 512 512 512-229.2 512-512S794.8 0 512 0z m297.7 515.5L357.9 764.7c-2.7 1.5-5.9-0.5-5.9-3.5V262.8c0-3 3.3-5 5.9-3.5l451.7 249.2c2.8 1.5 2.8 5.5 0.1 7z"/>
    </svg>
  )
}

Vue.component('icon-start-fill', Icon)
export default Icon

