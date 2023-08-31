
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1020 240H4c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h1016c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM1020 655.3H324c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h696c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM1020 448.7H324c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h696c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM1020 864H4c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h1016c2.2 0 4 1.8 4 4v56c0 2.2-1.8 4-4 4zM192 472.1V582l-79.5-55 79.5-54.9M19 513.8c-9.2 6.4-9.2 20 0 26.3l211.9 146.5c10.6 7.3 25.1-0.3 25.1-13.2v-293c0-12.9-14.5-20.5-25.1-13.2L19 513.8z"/>
    </svg>
  )
}

Vue.component('icon-indent-remove', Icon)
export default Icon

