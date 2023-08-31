
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 192v640c0 70.7 57.3 128 128 128h352c17.7 0 32-14.3 32-32s-14.3-32-32-32H128c-35.3 0-64-28.7-64-64V192c0-35.3 28.7-64 64-64h352c17.7 0 32-14.3 32-32s-14.3-32-32-32H128C57.3 64 0 121.3 0 192zM1013.3 535.7L650.9 863.3c-41.1 37.2-106.9 8-106.9-47.5V685c0-4.4-3.6-8-8-8H224c-17.7 0-32-14.3-32-32V379c0-17.7 14.3-32 32-32h312c4.4 0 8-3.6 8-8V208.1c0-55.5 65.8-84.7 106.9-47.5l362.4 327.6c14.1 12.8 14.1 34.8 0 47.5z"/>
    </svg>
  )
}

Vue.component('icon-exit-fill', Icon)
export default Icon

