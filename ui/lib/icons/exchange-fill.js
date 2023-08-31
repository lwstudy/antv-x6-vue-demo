
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M692.4 559.5V432c0-8.8-7.2-16-16-16H48c-26.5 0-48-21.5-48-48s21.5-48 48-48h628.4c8.8 0 16-7.2 16-16V176.5L1024 368 692.4 559.5zM1024 656c0 26.5-21.5 48-48 48H347.6c-8.8 0-16 7.2-16 16v127.5L0 656l331.6-191.5V592c0 8.8 7.2 16 16 16H976c26.5 0 48 21.5 48 48z"/>
    </svg>
  )
}

Vue.component('icon-exchange-fill', Icon)
export default Icon

