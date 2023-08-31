
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M832 728V250.5c0-8.5 3.4-16.6 9.4-22.6L1001 68.3c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L796.1 182.6c-6 6-14.1 9.4-22.6 9.4H296c-4.4 0-8-3.6-8-8V8c0-4.4-3.6-8-8-8h-80c-4.4 0-8 3.6-8 8v176c0 4.4-3.6 8-8 8H8c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h176c4.4 0 8 3.6 8 8v472c0 35.3 28.7 64 64 64h472c4.4 0 8 3.6 8 8v176c0 4.4 3.6 8 8 8h80c4.4 0 8-3.6 8-8V840c0-4.4 3.6-8 8-8h176c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8H840c-4.4 0-8-3.6-8-8zM296 288h375.4c7.1 0 10.7 8.6 5.7 13.7L301.7 677.1c-5 5-13.7 1.5-13.7-5.7V296c0-4.4 3.6-8 8-8z m432 448H352.6c-7.1 0-10.7-8.6-5.7-13.7l375.4-375.4c5-5 13.7-1.5 13.7 5.7V728c0 4.4-3.6 8-8 8z"/>
    </svg>
  )
}

Vue.component('icon-crop-fill', Icon)
export default Icon

