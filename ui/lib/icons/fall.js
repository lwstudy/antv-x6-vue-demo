
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M680.7 608.9H608c-8.8 0-16-7.2-16-16V286c0-35.3-28.7-64-64-64H324c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h188c8.8 0 16 7.2 16 16v290.9c0 8.8-7.2 16-16 16h-72.7c-3.1 0-5 3.3-3.5 6L556.5 824c1.5 2.7 5.4 2.7 6.9 0l120.7-209.1c1.6-2.6-0.3-6-3.4-6z"/>
    </svg>
  )
}

Vue.component('icon-fall', Icon)
export default Icon

