
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1005.7 611.3C859 629 693.4 641 512 641h-16c-174.9-0.7-335-12.5-477.7-29.7-7-0.9-9.5-9.6-4.1-14.1C94 530.7 175.8 465.3 255.5 398.8c11.5-9.6 26-14.8 41-14.8h435c15 0 29.5 5.3 41 14.8 79.8 66.5 157.6 131.9 237.3 198.3 5.4 4.5 2.8 13.3-4.1 14.2z"/>
    </svg>
  )
}

Vue.component('icon-moustache-fill', Icon)
export default Icon

