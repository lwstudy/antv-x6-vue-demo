
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 128v192h1024V128H0z m320 112H96v-32h224v32zM0 416v192h1024V416H0z m320 112H96v-32h224v32zM0 704v192h1024V704H0z m320 112H96v-32h224v32z"/>
    </svg>
  )
}

Vue.component('icon-gantt-fill', Icon)
export default Icon

