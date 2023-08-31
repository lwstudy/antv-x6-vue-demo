
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M828.9 641h-187c-2.8 0-4.7 2.7-3.8 5.3l107.1 304.2c2.9 8.3-1.5 17.5-9.8 20.4l-135.8 47.8c-8.3 2.9-17.5-1.5-20.4-9.8L480 727.3c-1-2.9-4.9-3.6-6.9-1.2L348.3 877.2C338.8 888.8 320 882 320 867V0.5l521.1 614.1c8.9 10.4 1.5 26.4-12.2 26.4z"/>
    </svg>
  )
}

Vue.component('icon-indicator-fill', Icon)
export default Icon

