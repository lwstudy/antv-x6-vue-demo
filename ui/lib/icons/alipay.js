
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M653.8 615.5c70.2-125.4 95.7-244.6 95.7-244.6H513.4v-87.8h280.8v-37.6H513.4V113.8H385.8v131.7H130.5v37.6h255.3v87.8h-217v37.6h440.4c0 6.3 0 6.3-6.4 12.5 0 43.9-31.9 106.6-57.4 156.8-325.5-125.4-421.2-50.2-446.8-37.6-217 150.5-12.8 338.6 19.1 332.4 229.8 50.2 376.5-43.9 478.7-163.1 6.4 6.3 12.8 6.3 19.1 6.3 70.2 37.6 408.5 194.4 408.5 194.4V722.1c-51.1 0-236.1-62.7-370.2-106.6z m-165.9 56.4c-159.6 200.7-351 138-382.9 125.4-76.6-18.8-102.1-156.7-6.4-200.6 159.6-50.2 300 6.3 402.1 56.4-6.4 12.5-12.8 18.8-12.8 18.8z"/>
    </svg>
  )
}

Vue.component('icon-alipay', Icon)
export default Icon

