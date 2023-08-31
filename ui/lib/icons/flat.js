
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 224v576c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V224c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m512-48c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z m432 624H80c-8.8 0-16-7.2-16-16V240c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v544c0 8.8-7.2 16-16 16z"/>
    </svg>
  )
}

Vue.component('icon-flat', Icon)
export default Icon

