
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1019.6 549.4H899c-8.8 0-16-7.2-16-16V257c0-35.3-28.7-64-64-64H324c-2.2 0-4 1.8-4 4v88c0 2.2 1.8 4 4 4h447c8.8 0 16 7.2 16 16v228.4c0 8.8-7.2 16-16 16H650.4c-3.1 0-5 3.3-3.5 6L831.5 875c1.5 2.7 5.4 2.7 6.9 0L1023 555.4c1.6-2.7-0.4-6-3.4-6zM5 475.6h120.6c8.8 0 16 7.2 16 16V768c0 35.3 28.7 64 64 64h495c2.2 0 4-1.8 4-4v-88c0-2.2-1.8-4-4-4h-447c-8.8 0-16-7.2-16-16V491.6c0-8.8 7.2-16 16-16h120.6c3.1 0 5-3.3 3.5-6L193 150c-1.5-2.7-5.4-2.7-6.9 0L1.5 469.6c-1.5 2.7 0.4 6 3.5 6z"/>
    </svg>
  )
}

Vue.component('icon-loop-fill', Icon)
export default Icon

