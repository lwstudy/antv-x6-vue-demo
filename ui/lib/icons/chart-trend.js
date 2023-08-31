
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 900v24c0 2.2-1.8 4-4 4H32c-17.7 0-32-14.3-32-32V100c0-2.2 1.8-4 4-4h24c2.2 0 4 1.8 4 4v788c0 4.4 3.6 8 8 8h980c2.2 0 4 1.8 4 4zM624.7 698.6L446.4 319.8c-1-2.1-3.5-2.9-5.5-1.8L290 398.1c-2.3 1.2-4.9 1.9-7.5 1.9H136c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h133.6c0.7 0 1.3-0.2 1.9-0.5l195-103.6c4-2.1 9-0.5 11 3.7l171 363.3c1.1 2.4 4.3 3.1 6.3 1.3l170.4-150.9c4.2-3.7 10.7-2.1 12.8 3.1l84.9 216.5c1.6 4.1-0.4 8.8-4.5 10.4l-44.7 17.5c-4.1 1.6-8.8-0.4-10.4-4.5l-53.6-136.6c-1-2.6-4.3-3.4-6.4-1.5l-166.1 147c-4 3.5-10.2 2.2-12.5-2.6z"/>
    </svg>
  )
}

Vue.component('icon-chart-trend', Icon)
export default Icon

