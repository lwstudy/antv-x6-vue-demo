
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M965.5 9.8c-0.2 0.6-0.4 1.2-0.7 1.8-13.4 26.6-26 50.8-38 72.9-53.7 99.2-94.6 156.2-135.4 197l-23.6 23.6c-14.3 14.3-11.9 38 4.9 49.3l23.4 15.6c12.6 8.4 17.5 24.5 11.9 38.6-58.6 147.5-206.7 309.5-400.6 333.8-95.9 12-166.6 61.8-212 149.5-14.2 27.5-26 58.7-35.2 93.6-3 11.4-9.6 21-18.5 27.8-8.8 6.8-19.8 10.7-31.6 10.7-8.9 0-17.2-2.2-24.4-6.1-18.8-10.1-30.5-31.5-26.6-54.3C114.8 634.1 247.8 7.6 957.5 0h0.1c5.3 0 9 5 7.9 9.8z"/>
    </svg>
  )
}

Vue.component('icon-sign-review-fill', Icon)
export default Icon

