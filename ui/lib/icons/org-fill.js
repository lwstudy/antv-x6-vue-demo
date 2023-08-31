
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 733v131c0 53-43 96-96 96h-96c-53 0-96-43-96-96V733c0-53 43-96 96-96 8.8 0 16-7.2 16-16v-77c0-17.7-14.3-32-32-32H560c-8.8 0-16 7.2-16 16v94c0 8.3 6.7 15 15 15h1c53 0 96 43 96 96v131c0 53-43 96-96 96h-96c-53 0-96-43-96-96V733c0-53 43-96 96-96h1c8.3 0 15-6.7 15-15v-94c0-8.8-7.2-16-16-16H208c-17.7 0-32 14.3-32 32v77c0 8.8 7.2 16 16 16 53 0 96 43 96 96v131c0 53-43 96-96 96H96c-53 0-96-43-96-96V733c0-53 43-96 96-96 8.8 0 16-7.2 16-16v-77c0-53 43-96 96-96h256c8.8 0 16-7.2 16-16v-48h-96c-53 0-96-43-96-96V144c0-53 43-96 96-96h256c53 0 96 43 96 96v144c0 53-43 96-96 96h-96v48c0 8.8 7.2 16 16 16h256c53 0 96 43 96 96v77c0 8.8 7.2 16 16 16 53 0 96 43 96 96z"/>
    </svg>
  )
}

Vue.component('icon-org-fill', Icon)
export default Icon

