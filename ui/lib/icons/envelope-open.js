
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M469.9 25.1l-415 288.7C20.5 337.7 0 377 0 418.9V960c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V419.8c0-42.4-21-82-56.1-105.9L542.4 24.7c-21.9-14.9-50.8-14.7-72.5 0.4z m-351 322.1l369.5-257c10.9-7.6 25.3-7.6 36.3-0.2L904 347.8c35 23.8 56 63.5 56 105.9V468L570.3 669.6c-36.9 19.1-80.7 19.1-117.6 0L64 468.5v-16.2c0-41.9 20.5-81.1 54.9-105.1zM952 960H72c-4.4 0-8-3.6-8-8V540.6l388.7 201.1c36.9 19.1 80.7 19.1 117.6 0L960 540v412c0 4.4-3.6 8-8 8z"/>
    </svg>
  )
}

Vue.component('icon-envelope-open', Icon)
export default Icon

