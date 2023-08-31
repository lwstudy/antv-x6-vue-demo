
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M992.01127 287.8c-7.4 0-14.9 2.6-20.9 7.8l-417 360.8c-24 21-60.3 21-84.3 0l-0.1-0.1L52.91127 295.6c-13.4-11.6-33.6-10.1-45.1 3.3-11.6 13.4-10.1 33.6 3.3 45.1l416.7 360.6c23.3 20.4 53.2 31.6 84.2 31.6s60.9-11.2 84.2-31.6L1012.91127 344c13.4-11.6 14.8-31.8 3.3-45.1-6.3-7.4-15.2-11.1-24.2-11.1z"/>
    </svg>
  )
}

Vue.component('icon-mono-bottom', Icon)
export default Icon

