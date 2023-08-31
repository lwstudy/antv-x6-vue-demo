
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 336v512c0 70.7-57.3 128-128 128H128C57.3 976 0 918.7 0 848V112c0-35.4 28.7-64 64-64h287.1c20.7 0 40.1 10 52.1 26.8l76 106.4c12 16.8 31.4 26.8 52.1 26.8H896c70.7 0 128 57.3 128 128z"/>
    </svg>
  )
}

Vue.component('icon-folder-fill', Icon)
export default Icon

