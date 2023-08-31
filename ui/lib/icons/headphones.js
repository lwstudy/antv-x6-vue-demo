
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 64c60.5 0 119.1 11.8 174.3 35.2 53.4 22.6 101.2 54.9 142.3 96 11.8 11.8 22.9 24.2 33.2 37 5.4 6.8-4.1 15.3-10.3 9.1-0.3-0.3-0.5-0.6-0.8-0.8-90.5-90.5-210.9-140.4-338.9-140.4h-2.1c-131.4 0.6-250.6 54.8-337 141.8-6.1 6.2-15.8-2.4-10.3-9.2 10.1-12.7 21-24.8 32.5-36.5 41.1-41.5 89-74 142.2-96.8C392.4 76 451 64.1 511.5 64h0.5M64 679.9c9.8 7.5 21.4 12.9 34.2 15.3 13.7 2.5 23.6 14.5 23.6 28.4v200.2c0 0.4-0.1 1.5-0.1 2.4-1.2 14.9-13.8 26.5-28.8 26.5s-27.6-11.6-28.8-26.5c0-0.8-0.1-2-0.1-2.4V679.9m896 0.2v243.6c0 0.4-0.1 1.5-0.1 2.4-1.2 14.9-13.8 26.5-28.8 26.5s-27.6-11.6-28.8-26.5c0-0.8-0.1-2-0.1-2.4V723.8c0-14 9.9-25.9 23.5-28.4 12.8-2.4 24.5-7.7 34.3-15.3M511.9 0h-0.5C228.4 0.3 0 231.7 0 514.6v409.1c0 2.2 0.1 4.5 0.3 6.7 3.5 48.1 43.6 86.2 92.7 86.2s89.2-38 92.7-86.2c0.1-2.2 0.3-4.4 0.3-6.7V723.5c0-45.5-32.7-83.4-76-91.3-7.6-1.4-13-8.1-13-15.8v-34.6c0-229 184.4-416.5 413.3-417.5h1.8c114.6 0 218.4 46.5 293.6 121.6 75.2 75.2 121.6 179 121.6 293.6v37.1c0 7.7-5.4 14.4-13 15.8-43.3 7.9-76 45.7-76 91.4v199.9c0 2.2 0.1 4.5 0.3 6.7 3.5 48.1 43.6 86.2 92.7 86.2 49 0 89.2-38 92.7-86.2 0.1-2.2 0.3-4.4 0.3-6.7V511.9c0-141.3-57.3-269.3-150.1-362C781.4 57.3 653.3 0 511.9 0zM0.1 928.2c0 2.3 0.1 4.5 0.3 6.7H0.1v-6.7z m1023.9 0v6.7h-0.3c0.3-2.1 0.3-4.3 0.3-6.7z"/>
    </svg>
  )
}

Vue.component('icon-headphones', Icon)
export default Icon

