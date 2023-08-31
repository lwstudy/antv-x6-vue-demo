
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M715.8 0C585.9 0 483.7 91.4 483.7 221.3c0 107 64.5 174.5 159.8 195.1v496.4H673v111.1h63.3V912.8h22.1V419c102.1-18.1 167.8-93.9 167.8-206.6C926.1 82.5 845.8 0 715.8 0z m109.9 246.8c16.8 0 27.7-2.5 34.6-6.6-1.4 10.3-3.7 20.1-6.7 29.3-5.2 15.5-12.7 29.3-22.4 41-9.5 11.4-21.1 21.1-34.7 28.6-14.4 8-31 13.7-49.4 17l-44.1 7.8-46.1-10c-21.5-4.6-44.7-13.2-64.2-28.5 23-10.6 40.2-54.3 40.2-106.6 0-53.1-17.7-97.3-41.3-107.1 1-1 2-2 3-2.9C625.5 79.9 668.5 64 715.8 64c24.2 0 46.1 3.6 65 10.8 17 6.4 31.5 15.7 43.3 27.6 22.3 22.6 35.1 55.4 37.6 95.6-6.8-4.6-18-7.4-36-7.4-38.2 0-47.9 12.6-47.9 28.1s9.7 28.1 47.9 28.1zM283 292.3c-114.3 0-185.1 72.5-185.1 186.8 0 99.1 57.8 165.8 147.7 181.7V1024h101V658.7c83.9-18.1 140.7-77.5 140.7-171.6-0.1-114.4-90-194.8-204.3-194.8zM384.2 574c-13.8 10.2-31.1 17.7-51.2 22.1l-39 8.4-37.3-6.6c-29.9-5.3-53.3-17.9-69.4-37.5-11.9-14.4-19.7-32.3-23.2-53.4 5.6 1.5 12.9 2.4 22.2 2.4 33.6 0 42.2-11.1 42.2-24.7s-8.6-24.7-42.2-24.7c-10.2 0-17.9 1-23.7 2.8 2.6-31.5 13.1-57.2 30.6-74.9 9.6-9.7 21.4-17.3 35.3-22.5 15.8-6 34.1-9 54.5-9 39.6 0 75.6 13.2 101.3 37.2 0.3 0.3 0.7 0.6 1 1-17.2 13.5-29.5 48.7-29.5 90.2-0.1 40.5 11.7 75.2 28.4 89.2z"/>
    </svg>
  )
}

Vue.component('icon-headset', Icon)
export default Icon

