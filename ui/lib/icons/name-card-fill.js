
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 128H64c-35.3 0-64 28.6-64 64v640c0 35.3 28.7 64 64 64h160c8.8 0 16-7.2 16-16v-12c0-2.2 1.8-4 4-4h151c2.2 0 4 1.8 4 4v12c0 8.8 7.2 16 16 16h193c8.8 0 16-7.2 16-16v-12c0-2.2 1.8-4 4-4h152c2.2 0 4 1.8 4 4v12c0 8.8 7.2 16 16 16h160c35.3 0 64-28.7 64-64V192c0-35.4-28.7-64-64-64zM576 680v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8z m0-128v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8z m320-128c0 4.4-3.6 8-8 8H584c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h304c4.4 0 8 3.6 8 8v48zM447.2 736h-288c-8.8 0-16.8-3.6-22.6-9.4-5.8-5.8-9.4-13.8-9.4-22.6 0-57.1 27.2-107.8 69.3-140 4-3.1 4.3-9 0.5-12.3-33-29.3-53.8-72.1-53.8-119.7 0-87.7 70.5-158.9 157.9-160 87.8-1.1 160.7 69.6 162 157.4 0.8 48.6-20.1 92.4-53.7 122.2-3.8 3.4-3.6 9.3 0.5 12.4 21.1 16.1 38.4 36.8 50.4 60.6 12.1 23.8 18.9 50.8 18.9 79.3 0 17.8-14.3 32.1-32 32.1z"/>
    </svg>
  )
}

Vue.component('icon-name-card-fill', Icon)
export default Icon

