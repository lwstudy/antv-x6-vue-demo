
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M760.1 64l-150 262.7-41 71.8c-6.1 10.7 1.6 23.9 13.9 23.9h104.7c13.9 0 21.2 16.6 11.8 26.9L410.8 761.9l59.5-178.5 21.1-63.2c3.5-10.4-4.3-21.1-15.2-21.1H277.8c-11.6 0-19.4-12-14.6-22.6l179-393.8c5.2-11.4 16.6-18.8 29.1-18.8h288.8M450.8 0c-25.1 0-47.9 14.7-58.3 37.5L194.7 472.7c-19.3 42.4 11.7 90.5 58.3 90.5h145.5c5.5 0 9.3 5.3 7.6 10.5L256 1024l515.3-558.2c37.8-41 8.8-107.4-47-107.4h-44.8c-6.1 0-10-6.6-6.9-12L870.4 0H450.8z"/>
    </svg>
  )
}

Vue.component('icon-lightning', Icon)
export default Icon
