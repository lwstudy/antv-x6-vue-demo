
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M689.7 324.6H334.3c-33.4 0-60.5 27.1-60.5 60.5v253.8c0 33.4 27.1 60.5 60.5 60.5h355.5c33.4 0 60.5-27.1 60.5-60.5V385.1c-0.1-33.4-27.2-60.5-60.6-60.5z m-375.9 60.5c0-11.3 9.2-20.5 20.5-20.5h355.5c11.3 0 20.5 9.2 20.5 20.5v26.5H313.8v-26.5z m396.4 253.8c0 11.3-9.2 20.5-20.5 20.5H334.3c-11.3 0-20.5-9.2-20.5-20.5V451.6h396.5v187.3z" p-id="26741"></path>
    </svg>
  )
}

Vue.component('icon-dialog-window', Icon)
export default Icon

