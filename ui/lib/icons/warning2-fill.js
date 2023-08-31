
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1014.9 864.7L791.1 477.1 567.3 89.5c-12.3-21.3-33.9-32-55.4-32-21.6 0-43.1 10.7-55.4 32L232.7 477.1 8.9 864.7c-24.6 42.7 6.2 96 55.4 96h895.2c49.3 0 80-53.3 55.4-96z m-558.4-77.4v-55.5c0-15.3 12.4-27.7 27.7-27.7h55.5c15.3 0 27.7 12.4 27.7 27.7v55.5c0 15.3-12.4 27.7-27.7 27.7h-55.5c-15.2 0-27.7-12.4-27.7-27.7z m110.3-388.8l-12.9 270.1c-0.2 3.7-3.2 6.6-6.9 6.6h-70c-3.7 0-6.8-2.9-6.9-6.6l-12.9-270.1c-0.4-7.9 5.9-14.5 13.9-14.5h81.8c7.9 0 14.3 6.6 13.9 14.5z"/>
    </svg>
  )
}

Vue.component('icon-warning2-fill', Icon)
export default Icon

