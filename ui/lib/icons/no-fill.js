
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M906.9 184.9c-20.5-24.7-43.3-47.4-68-67.8C750.4 44 636.8 0 513 0 230.2 0 1 229.2 1 512c0 123.8 44 237.4 117.2 326 20.4 24.7 43.1 47.5 67.8 68 88.6 73.7 202.6 118 327 118 282.8 0 512-229.2 512-512 0-124.4-44.3-238.4-118.1-327.1z m-777.2 489C108 622.7 97 568.2 97 512s11-110.7 32.7-161.9c20.9-49.5 51-94 89.2-132.3 38.2-38.2 82.7-68.2 132.3-89.2C402.3 107 456.8 96 513 96s110.7 11 161.9 32.6c22.5 9.5 43.9 20.9 64.2 34 17 11 19.4 35 5 49.4L213 743.1c-14.3 14.3-38.3 12-49.4-5-13.1-20.3-24.4-41.7-33.9-64.2z m677.5 132.3c-38.2 38.2-82.7 68.2-132.3 89.2C623.7 917 569.2 928 513 928s-110.7-11-161.9-32.7c-22.9-9.7-44.8-21.3-65.4-34.8-16.9-11.1-19.3-35-5-49.3l531.5-531.5c14.3-14.3 38.2-12 49.3 5 13.5 20.7 25.1 42.5 34.8 65.4C918 401.3 929 455.8 929 512s-11 110.7-32.7 161.9c-20.9 49.5-50.9 94-89.1 132.3z"/>
    </svg>
  )
}

Vue.component('icon-no-fill', Icon)
export default Icon
