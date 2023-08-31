
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 12C235.9 12 12 235.9 12 512s223.9 500 500 500 500-223.9 500-500S788.1 12 512 12z m0 930C274.5 942 82 749.5 82 512S274.5 82 512 82s430 192.5 430 430-192.5 430-430 430z"/><path d="M806.4 512L350.9 249v526z"/>
    </svg>
  )
}

Vue.component('icon-inside-play', Icon)
export default Icon

