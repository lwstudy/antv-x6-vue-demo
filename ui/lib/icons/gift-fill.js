
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M544 560v377c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V560H64v385c0 35.3 28.7 64 64 64h768c35.4 0 64-28.7 64-64V560H544zM896 209h-42c-6.4 0-10.2-7.2-6.6-12.5 15.6-23.2 23.2-48.7 21.6-74-1.9-30.2-17.1-56.4-43.8-75.8-19.2-13.9-44.7-24-71.7-28.6-49-8.2-100.9 5.7-146.3 39.3-24.4 18.1-46.6 41.2-66.4 69.2-12.7 17.9-39.4 17.9-52.1 0-19.8-28-42-51.2-66.4-69.2C377 23.8 325.1 9.8 276.1 18.1c-27 4.6-52.5 14.7-71.7 28.6-26.7 19.3-41.9 45.5-43.8 75.8-1.6 25.3 5.9 50.8 21.6 74 3.6 5.3-0.1 12.5-6.6 12.5H128C57.3 209 0 266.3 0 337v128c0 14.9 10.2 27.5 24 31h976c13.8-3.5 24-16.1 24-31V337c0-70.7-57.3-128-128-128z m-323.9-11.9c53.2-96.5 120.6-124.4 170.7-115.9 6.1 1 60 11.1 62.3 45.4 1.9 29.9-31.1 69.5-88 82.4h-138c-6.1 0-9.9-6.5-7-11.9z m-347.7-70.5c2.2-34.3 56.1-44.3 62.3-45.4 50.2-8.4 117.6 19.4 170.7 115.9 3 5.3-0.9 11.9-7 11.9h-138c-56.8-13-89.9-52.5-88-82.4z"/>
    </svg>
  )
}

Vue.component('icon-gift-fill', Icon)
export default Icon
