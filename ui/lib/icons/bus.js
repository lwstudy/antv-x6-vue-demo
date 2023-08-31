
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M937.8 405.9l-60-259.4c-3.6-29.8-22-55.8-55.8-78.3s-77.4-39.4-131.4-50.8C636.6 6 577.2 0.2 512.1 0.2S387.6 6 333.7 17.4 236 45.6 202.2 68.2c-33.8 22.5-52.2 48.6-55.8 78.3L87.6 405.9c-9.5 42.2-14.3 84.7-14.3 127.3v344.5h73.2v73.2c0 20.2 7 37.4 21.4 51.7 14.3 14.3 31.5 21.4 51.7 21.4 20.2 0 37.4-7 51.7-21.4 14.3-14.3 21.4-31.5 21.4-51.7v-73.2h438.8v73.2c0 20.2 7 37.4 21.4 51.7 14.3 14.3 31.5 21.4 51.7 21.4 20.2 0 37.4-7 51.7-21.4 14.3-14.3 21.4-31.5 21.4-51.7v-73.2h73.2V533.2c-0.1-46.1-4.7-88.5-13.1-127.3z m-51 407.8H137.2V533.2c0-37.3 4.3-75.4 12.8-113.2l58.8-259.3 0.7-3.2 0.4-3.3c1.2-10.3 10.6-21.3 27.8-32.7 26.8-17.8 63.5-31.8 109.2-41.4C396.4 69.5 452 64.2 512.1 64.2c60.1 0 115.7 5.3 165.3 15.8 45.6 9.6 82.3 23.5 109.1 41.4 10.1 6.8 18 13.8 22.6 20.3 3.9 5.5 4.8 9.5 5.2 12.4l0.4 3.4 0.8 3.4 59.9 258.9c7.6 35.4 11.4 73.6 11.4 113.4v280.5zM714.1 99.6c-5.4-5.4-11.8-8.1-19.5-8.1H328.9c-7.5 0-14.1 2.7-19.5 8.1-5.4 5.4-8.1 11.8-8.1 19.5 0 7.5 2.7 14.1 8.1 19.5 5.4 5.4 11.8 8.1 19.5 8.1h365.6c7.8-0.1 14.3-2.7 19.6-8.1 5.4-5.4 8.1-11.8 8.1-19.5 0-7.6-2.7-14.1-8.1-19.5z m137.1 369.1l-41.1-219.3c-1.9-8.7-6.1-15.9-12.9-21.4-6.5-5.5-14.5-8.3-23.2-8.3H249.7c-8.7 0-16.4 2.8-23.2 8.3-6.5 5.5-10.9 12.7-12.9 21.4l-41.1 219.3c-1.9 11.4 0.8 21.5 8.1 30.2 7.2 8.7 16.5 13.2 27.9 13.2h606.6c11.4 0 20.7-4.3 27.9-13.2 7.4-8.7 10.1-18.8 8.2-30.2z m-609.7-20.6l30.8-164.4h479.1l30.8 164.4H241.5zM292.5 695c0 20.2-7 37.4-21.4 51.7-14.2 14.2-31.2 21.4-51.2 21.4h-0.5c-20.2 0-37.4-6.9-51.7-21.4-14.3-14.3-21.4-31.5-21.4-51.7 0-20.2 7-37.4 21.4-51.7 14.3-14.3 31.5-21.4 51.7-21.4 20.2 0 37.4 7 51.7 21.4 14.3 14.3 21.4 31.5 21.4 51.7zM877.6 695c0 20.2-7 37.4-21.4 51.7-14.2 14.2-31.3 21.4-51.2 21.4h-0.5c-20.2 0-37.4-6.9-51.7-21.4-14.3-14.3-21.4-31.5-21.4-51.7 0-20.2 7-37.4 21.4-51.7 14.3-14.3 31.5-21.4 51.7-21.4 20.2 0 37.4 7 51.7 21.4 14.3 14.3 21.4 31.5 21.4 51.7z"/>
    </svg>
  )
}

Vue.component('icon-bus', Icon)
export default Icon

