
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M674.1 645.9c7.8 7.8 7.8 20.5 0 28.3-3.9 3.9-9 5.9-14.1 5.9s-10.2-2-14.1-5.9L512 540.3 378.1 674.1c-3.9 3.9-9 5.9-14.1 5.9s-10.2-2-14.1-5.9c-7.8-7.8-7.8-20.5 0-28.3L483.7 512 349.9 378.1c-7.8-7.8-7.8-20.5 0-28.3s20.5-7.8 28.3 0L512 483.7l133.9-133.9c7.8-7.8 20.5-7.8 28.3 0s7.8 20.5 0 28.3L540.3 512l133.8 133.9z" p-id="13410"></path>
    </svg>
  )
}

Vue.component('icon-dialog-close', Icon)
export default Icon

