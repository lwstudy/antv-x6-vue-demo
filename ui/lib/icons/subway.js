
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M875.8 53.4C825.8 17.8 765.4 0 695 0L329 0.1c-70.5 0-130.7 17.8-180.9 53.4C98 89.1 73 132.2 73 182.9v511.9c0 49.7 23.8 91.8 71.7 126.9 10.5 7.6 21.4 14.5 32.8 20.5 56.3 29.9 66.5 106.4 20.2 150.3-6 5.8-7.6 12.4-4.5 20 3.1 7.5 8.7 11.5 17.2 11.5h603.3c8.3 0 14.1-4 17.2-11.5 3.1-7.7 1.7-14.2-4.5-20-46.3-43.9-36.1-120.4 20.2-150.3 11.4-6.1 22.3-12.9 32.8-20.5 47.6-35 71.6-77.4 71.6-126.9v-512c0-50.7-25-93.8-75.2-129.4zM887 694.8c0 18-4.7 45.4-45.5 75.2-7.9 5.8-16.3 11.1-24.9 15.6-44.5 23.6-75.2 67.6-82 117.6-2.6 19.2-1.6 38.4 2.6 56.8H286.8c4.3-18.4 5.2-37.6 2.6-56.7-6.8-50-37.4-94-81.9-117.6-8.7-4.6-17.1-9.9-25-15.7-16.5-12-28.5-24.8-35.9-37.8-6.5-11.4-9.6-23.7-9.6-37.4V182.9c0-14 3.3-26.5 10.1-38.3 7.8-13.5 20.6-26.6 38-39C224.6 77.6 271.6 64 329 64h366c28.9 0 55.8 3.6 79.9 10.7 23.2 6.8 44.7 17.2 63.8 30.8 17.4 12.4 30.2 25.5 38 39 6.8 11.7 10.1 24.2 10.1 38.3v512zM379.7 580.6c-21.4-21.3-47.2-32-77.7-32s-56.3 10.8-77.7 32c-21.4 21.4-32 47.2-32 77.7s10.6 56.5 32 77.7c21.3 21.4 47.2 32 77.7 32s56.3-10.8 77.7-32c21.2-21.3 32-47.2 32-77.7s-10.8-56.3-32-77.7z m-45.2 110.1C325.1 700 315.4 704 302 704c-13.5 0-23.2-3.9-32.3-13.1l-0.3-0.3c-9.2-9.1-13.1-18.8-13.1-32.3 0-13.4 3.9-23.1 13.2-32.4 9.4-9.3 19.2-13.3 32.5-13.3s23 4 32.4 13.3c9.3 9.4 13.3 19.1 13.3 32.4 0 13.4-3.9 23.1-13.2 32.4z m465.2-110.1c-21.4-21.3-47.2-32-77.7-32s-56.3 10.8-77.7 32c-21.4 21.4-32 47.2-32 77.7s10.6 56.5 32 77.7c21.3 21.4 47.2 32 77.7 32s56.3-10.8 77.7-32c21.2-21.3 32-47.2 32-77.7s-10.8-56.3-32-77.7z m-45.2 110.1C745.1 700 735.4 704 722 704c-13.5 0-23.2-3.9-32.3-13.1l-0.3-0.3c-9.2-9.1-13.1-18.8-13.1-32.3 0-13.4 3.9-23.1 13.2-32.4 9.4-9.3 19.2-13.3 32.5-13.3s23 4 32.4 13.3c9.3 9.4 13.3 19.1 13.3 32.4 0 13.4-3.9 23.1-13.2 32.4zM809.1 146.3H214.9c-17.7 0-32 14.3-32 32v228.5c0 17.7 14.3 32 32 32l594.2 0.1c17.7 0 32-14.3 32-32V178.3c0-17.7-14.3-32-32-32z m-562.2 64H480v164.5H246.9V210.3z m530.2 164.6H544V210.3h233.1v164.6z"/>
    </svg>
  )
}

Vue.component('icon-subway', Icon)
export default Icon

