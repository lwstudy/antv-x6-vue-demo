
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M800 0h-32c-35.3 0-64 28.7-64 64v32c0 35.3-28.7 64-64 64H384c-35.3 0-64-28.7-64-64V64c0-35.3-28.7-64-64-64h-32C153.3 0 96 57.3 96 128v768c0 70.7 57.3 128 128 128h576c70.7 0 128-57.3 128-128V128C928 57.3 870.7 0 800 0z m-66.3 435.7L507.4 662c-25 25-65.5 25-90.5 0l-90.5-90.5c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l79.2 79.2c6.2 6.3 16.4 6.2 22.6 0l215-215c12.5-12.5 32.8-12.5 45.3 0 6.3 6.3 9.4 14.4 9.4 22.6s-3.3 16.5-9.5 22.7zM448 96h128c35.3 0 64-28.7 64-64 0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32 0 35.3 28.7 64 64 64z"/>
    </svg>
  )
}

Vue.component('icon-approval-fill', Icon)
export default Icon

