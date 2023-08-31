
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M93.9 568.8l-4.9 28h148.4l6.6-28H93.9zM471.5 597l4.9-28H308.3l-6.6 28h169.8z m94-141.8L542.4 569l-6.6 28-23.1 113.8h-234l-4.9 26.3h273.7l36.3-168.2 23.1-113.8H935l-24.7 113.8H648l-59.4 281.9H248.9l-4.9 26.3h380.9l36.3-166.6 23.1-113.8h220.9l-23.1 113.8H725.4l-34.5 166.6L666.1 991H154.9l59.4-280.3H0l24.7-113.8 4.9-28 24.7-113.8H267l59.3-280.2h234.2L590.3 33H1024l-24.7 113.8H629.9l-4.9 28-23.1 113.8H367.7l-6.6 26.3h275.3l4.9-26.3 24.8-113.8h328.1l-24.7 113.8H707.3l-29.6 140.2H338l-6.6 26.4c0 0.1 234.1 0 234.1 0z"/>
    </svg>
  )
}

Vue.component('icon-chinapost', Icon)
export default Icon

