
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M224 448v544c0 17.7-14.3 32-32 32H96c-53 0-96-43-96-96V512c0-53 43-96 96-96h96c17.7 0 32 14.3 32 32zM1023.1 510.1l-47.9 303.4C956.1 934.7 851.6 1024 728.9 1024h-317c-68.4 0-123.9-55.5-123.9-123.9V416c72.9-104.1 112-228.2 112-355.3C400 27.2 427.2 0 460.7 0h44.9c63.1 0 112.1 55 104.9 117.7L587 321c-5.8 50.6 33.7 95 84.6 95h271.2c50 0 88.1 44.7 80.3 94.1z"/>
    </svg>
  )
}

Vue.component('icon-like-fill', Icon)
export default Icon

