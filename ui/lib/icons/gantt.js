
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 192v64H64v-64h896m64-64H0v192h1024V128zM960 480v64H64v-64h896m64-64H0v192h1024V416zM960 768v64H64v-64h896m64-64H0v192h1024V704zM96 208h224v32H96zM96 496h224v32H96zM96 784h224v32H96z"/>
    </svg>
  )
}

Vue.component('icon-gantt', Icon)
export default Icon

