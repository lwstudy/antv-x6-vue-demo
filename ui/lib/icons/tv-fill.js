
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 128v640c0 17.7-14.3 32-32 32H552c-4.4 0-8 3.6-8 8v24c0 17.7 14.3 32 32 32h176c8.8 0 16.8 3.6 22.6 9.4 5.8 5.8 9.4 13.8 9.4 22.6 0 17.7-14.3 32-32 32H272c-8.8 0-16.8-3.6-22.6-9.4-5.8-5.8-9.4-13.8-9.4-22.6 0-17.7 14.3-32 32-32h176c17.7 0 32-14.3 32-32v-24c0-4.4-3.6-8-8-8H32c-17.7 0-32-14.3-32-32V128c0-17.7 14.3-32 32-32h960c17.7 0 32 14.3 32 32z"/>
    </svg>
  )
}

Vue.component('icon-tv-fill', Icon)
export default Icon

