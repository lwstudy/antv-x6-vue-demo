
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M904.8 12.1L323.3 992.4c-11.5 19.4-32.4 31.3-54.9 31.3l-142.3 0.3c-6.2 0-10.1-6.7-6.9-12.1L701.4 31.3C712.9 11.9 733.8 0 756.4 0H898c6.2 0 10 6.8 6.8 12.1zM416 240v64c0 57.2-23.4 109.2-61.1 146.9S265.2 512 208 512C93.6 512 0 418.4 0 304v-64C0 125.6 93.6 32 208 32s208 93.6 208 208zM1024 752v64c0 57.2-23.4 109.2-61.1 146.9S873.2 1024 816 1024c-114.4 0-208-93.6-208-208v-64c0-114.4 93.6-208 208-208s208 93.6 208 208z"/>
    </svg>
  )
}

Vue.component('icon-percentage-fill', Icon)
export default Icon

