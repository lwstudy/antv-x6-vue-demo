
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1020 256H4c-2.2 0-4-1.8-4-4v-88c0-2.2 1.8-4 4-4h1016c2.2 0 4 1.8 4 4v88c0 2.2-1.8 4-4 4zM1020 671.3H324c-2.2 0-4-1.8-4-4v-88c0-2.2 1.8-4 4-4h696c2.2 0 4 1.8 4 4v88c0 2.2-1.8 4-4 4zM1020 464.7H324c-2.2 0-4-1.8-4-4v-88c0-2.2 1.8-4 4-4h696c2.2 0 4 1.8 4 4v88c0 2.2-1.8 4-4 4zM1020 880H4c-2.2 0-4-1.8-4-4v-88c0-2.2 1.8-4 4-4h1016c2.2 0 4 1.8 4 4v88c0 2.2-1.8 4-4 4zM19 513.8c-9.2 6.4-9.2 20 0 26.3l211.9 146.5c10.6 7.3 25.1-0.3 25.1-13.2v-293c0-12.9-14.5-20.5-25.1-13.2L19 513.8z"/>
    </svg>
  )
}

Vue.component('icon-indent-remove-fill', Icon)
export default Icon

