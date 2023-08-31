
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 900v24c0 2.2-1.8 4-4 4H32c-17.7 0-32-14.3-32-32V100c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v788c0 4.4 3.6 8 8 8h84c2.2 0 4-1.8 4-4V432c0-26.5 21.5-48 48-48h128c26.5 0 48 21.5 48 48v460c0 2.2 1.8 4 4 4h56c2.2 0 4-1.8 4-4V128c0-26.5 21.5-48 48-48h128c26.5 0 48 21.5 48 48v764c0 2.2 1.8 4 4 4h56c2.2 0 4-1.8 4-4V240c0-26.5 21.5-48 48-48h128c26.5 0 48 21.5 48 48v652c0 2.2 1.8 4 4 4h88c2.2 0 4 1.8 4 4z"/>
    </svg>
  )
}

Vue.component('icon-histogram-fill', Icon)
export default Icon

