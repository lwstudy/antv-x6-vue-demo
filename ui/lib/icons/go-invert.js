
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M-0.5,95.5v832c0,53,43,96,96,96h832c53,0,96-43,96-96v-832c0-53-43-96-96-96h-832C42.5-0.5-0.5,42.5-0.5,95.5z  M895.5,959.5h-768c-35.3,0-64-28.7-64-64v-768c0-35.3,28.7-64,64-64h768c35.3,0,64,28.7,64,64v768  C959.5,930.8,930.8,959.5,895.5,959.5z"/> <path d="M767.5,272.5v479c0,8.8-7.2,16-16,16h-479c-8.8,0-16-7.2-16-16v-479c0-8.8,7.2-16,16-16h479  C760.3,256.5,767.5,263.7,767.5,272.5z M256.5,192.5c-35.3,0-64,28.7-64,64v511c0,35.3,28.7,64,64,64h511c35.3,0,64-28.7,64-64v-511  c0-35.3-28.7-64-64-64H256.5z"/>
    </svg>
  )
}

Vue.component('icon-go-invert', Icon)
export default Icon

