
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M752.8 143.2c3.2 0 6.3 1.3 8.5 3.5L955.6 341c5.5 5.5 5.5 14.3 0 19.8L864 452.5l-96-96V895H448v1H256V357.5l-96 96-91.6-91.6c-5.5-5.5-5.5-14.3 0-19.8L263 147.5c2.3-2.3 5.3-3.5 8.5-3.5H351c33.4 26.9 92.6 64 164.6 64 72.1 0 131.4-37.2 164.8-64.2l72.3-0.6h0.1z m0-64h-0.6l-83.8 0.7c-7.6 0.1-15 2.8-20.7 7.8-19.6 17-71.3 56.3-132.1 56.3-60.6 0-112.3-39.1-132-56.2-5.8-5.1-13.3-7.8-21-7.8h-91c-20.2 0-39.5 8-53.7 22.3L23.1 296.8c-30.5 30.5-30.5 79.8 0 110.3L128 512c8.8 8.8 20.4 13.3 32 13.3s23.2-4.4 32-13.3v416c0 17.7 14.3 32 32 32h288v-1h288c17.7 0 32-14.3 32-32V511c8.8 8.8 20.4 13.3 32 13.3s23.2-4.4 32-13.3l104.8-104.8c30.5-30.5 30.5-79.8 0-110.3L806.5 101.5c-14.2-14.2-33.6-22.3-53.7-22.3z"/>
    </svg>
  )
}

Vue.component('icon-clothes', Icon)
export default Icon

