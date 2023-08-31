
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0 704h208v192H0zM272 512h208v384H272zM544 288h208v608H544zM816 128h208v768H816z"/>
    </svg>
  )
}

Vue.component('icon-phone-signal-fill', Icon)
export default Icon

