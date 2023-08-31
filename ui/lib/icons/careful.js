
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M572.1 112.8l-24.4 512c-0.4 8.5-7.4 15.2-16 15.2h-39.4c-8.5 0-15.6-6.7-16-15.2l-24.4-512c-0.4-9.1 6.8-16.8 16-16.8h88.2c9.1 0 16.4 7.6 16 16.8zM434.3 32c-27.4 0-49.2 22.9-47.9 50.3L413.1 643c1.6 34.1 29.8 61 63.9 61h70c34.2 0 62.3-26.8 63.9-61l26.7-560.8c1.3-27.4-20.5-50.3-47.9-50.3H434.3zM576 864c0 35.3-28.7 64-64 64s-64-28.7-64-64 28.7-64 64-64 64 28.7 64 64z m-64-128c-70.7 0-128 57.3-128 128s57.3 128 128 128 128-57.3 128-128-57.3-128-128-128z"/>
    </svg>
  )
}

Vue.component('icon-careful', Icon)
export default Icon

