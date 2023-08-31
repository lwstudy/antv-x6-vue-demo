
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M940.4 352H928v-48c0-35.4-28.7-64-64-64H485.2c-21 0-40.7-10.3-52.6-27.6l-61.5-88.9c-12-17.3-31.6-27.6-52.6-27.6H64c-35.3 0-64 28.6-64 64v656c0 70.7 57.3 128 128 128h638c57.8 0 108.5-38.8 123.6-94.6L928 707.2l74.2-274.5c11-40.7-19.7-80.7-61.8-80.7zM64 176c0-8.8 7.2-16 16-16h230.1c5.3 0 10.2 2.6 13.1 6.9l50.6 73.1H80c-8.8 0-16-7.2-16-16v-48z m0 470.9V320c0-8.8 7.2-16 16-16h768c8.8 0 16 7.2 16 16v32H209c-28.9 0-54.2 19.4-61.8 47.3L79.7 649c-2.4 9-15.7 7.3-15.7-2.1z"/>
    </svg>
  )
}

Vue.component('icon-folder-open-fill', Icon)
export default Icon

