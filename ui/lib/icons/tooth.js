
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M739.5 64c30.2 0 59.6 6.1 87.3 18 26.9 11.6 50.9 28.1 71.5 49 20 20.4 35.6 43.9 46.3 69.9 11 26.8 16.3 55 15.8 84V329.3c-6.4 102.3-26.7 202-60.3 296.4-0.5 1.4-50.1 138.4-180.9 293-8.6 10.1-34.7 41-56.5 41.3h-0.1c-0.6 0-6.1-0.1-11.3-2.7-9-4.6-14.4-15.7-14.4-23.7 0-26.4 0-75.4-8.7-120.6-20.9-108-81.6-124.1-115.9-124.1-34.3 0-95 16.1-115.9 124.1-8.7 45.2-8.7 94.2-8.7 120.6 0 8-5.4 19-14.4 23.7l-0.5 0.2c-4.1 2.1-9.5 2.5-12.4 2.5h-0.2c-20.8 0-45.7-14.9-74-44.4-101.4-105.4-160.3-284.4-161.2-287-31-96.2-51.5-197.2-60.9-300.2v-42.3c0-29.5 5.9-58.3 17.6-85.5 11.4-26.4 27.6-50.3 48.3-70.9 20.7-20.6 44.8-36.8 71.5-48.1C228.9 69.9 258 64 287.9 64c24 0 46 2.3 54.1 3.3 13 3.6 25.5 9.3 37 17 22.9 16.8 69.4 43.7 133 43.7 27.5 0 81-5.7 132.4-43.3 12.7-8.1 26.4-14 40.7-17.6 8-0.9 30.3-3.1 54.4-3.1m0-64C704.8 0 674 3.9 674 3.9c-29.6 6.7-52 18.9-66 28.1-40.4 30.3-82.5 32-96 32-50.5 0-85.2-23.9-96-32-13.1-8.9-34.1-20.8-61.9-27.7 0 0-30.8-4.3-66.2-4.3C130.3 0 0 129.5 0 286.1v45.2c12 134.9 40.1 242.7 64 317 0 0 62.4 193.6 176 311.7 24.2 25.1 67.2 64 120.1 64h0.5c23.7-0.1 38.4-8 41.6-9.7 31.7-16.2 49.3-50 49.3-80.6 0-48.2 0-180.7 60.6-180.7s60.6 132.5 60.6 180.7c0 30.6 17.6 64.4 49.3 80.6 17.1 8.8 33.5 9.7 40.4 9.7h1.2c48.4-0.8 84.9-41.1 104.3-64 139.8-165.3 192.3-312.8 192.3-312.8 25.7-72.1 55.7-179.7 64-315.9v-45.2C1027.3 129.5 897 0 739.5 0z"/>
    </svg>
  )
}

Vue.component('icon-tooth', Icon)
export default Icon
