
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024.00324 511.1c0.5 71.1-57 128.9-128 128.9-55.7 0-103.1-35.6-120.7-85.3-2.3-6.4-8.3-10.7-15.1-10.7H263.80324c-6.8 0-12.8 4.3-15.1 10.7-17.6 49.7-65 85.3-120.7 85.3C57.00324 640-0.49676 582.2 0.00324 511.1 0.50324 440.6 59.90324 382.7 130.40324 384c54.7 1 101.1 36.4 118.4 85.4 2.2 6.4 8.3 10.6 15 10.6h496.4c6.7 0 12.8-4.2 15-10.6 17.3-49.1 63.6-84.4 118.4-85.4 70.5-1.3 129.9 56.6 130.4 127.1z"/>
    </svg>
  )
}

Vue.component('icon-map-connect-fill', Icon)
export default Icon

