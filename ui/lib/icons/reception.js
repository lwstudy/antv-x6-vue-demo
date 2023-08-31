
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M508.6 64c32 0 62.1 9 84.8 25.3 18.4 13.3 29.6 30 31.6 46.9l4.4 38.4 36.1 14c43.9 17 80 40.4 110.2 71.6 31.9 32.9 56.4 73.1 72.5 119.3 16.8 47.9 24.8 102 23.8 161V599.4l5.2 4.6-1.4 1.7c-57.7-67.5-136.5-84.4-206.5-99.4-2.9-0.6-5.9-1.3-8.8-1.9-30.3-6.6-58.9-12.8-85.8-23.3h-0.2c-33.6-13-65.7-32.8-95.4-58.8-25.9-22.7-44.5-45.2-55.5-60.2L365.2 283l-48.7 85.5c-11.1 19.5-34.2 57.6-63.9 93.2-29.2 35-57.8 58.8-80.6 67.1l-26.7 9.7c-0.9-58.4 7-111.9 23.6-159.2 16.2-46 40.6-86.1 72.6-119.1 30.3-31.2 66.3-54.6 110.2-71.6l36.5-14.1 4.1-38.9c1.7-16.6 12.8-33.1 31.2-46.3C446.2 73 476.5 64 508.6 64M128.2 620.4c-0.4 9.7-0.6 16-0.6 20.2v2l0.5 17.8c0 3.2 0 6.3 0.1 9.5-3.8-3.6-7.3-8.6-9.2-15.6-3.9-14.3-1.8-22.6 8.1-32.8l1.1-1.1M508.6 0c-94.3 0-172.3 56.8-179.9 129-51.6 20-96.2 48.7-133.1 86.7C118.3 295.5 78.9 407.4 81.3 541v35.8c-20 20.5-35.8 50.9-24 94.3 8.8 32.2 32.2 55.7 60.9 66.2 14.7 9.4 31.7 14.7 50.4 14.7 37 161.8 170 272 344.2 272 174.1 0 307.2-110.2 344.1-272.5 1.1 0 2.3 0.6 3.6 0.6 22.8 0 43.9-8.3 60.9-21.7 21.7-12.3 38.7-33.4 45.7-59.8 12.3-47-8.3-79.3-31.1-99.7v-29.3c2.3-133.7-36.9-246.1-114.3-325.9-36.9-38.1-81.5-66.8-133.1-86.7C680.3 56.9 603 0 508.6 0z m4.7 991.1c-189.3 0-321.2-136.5-321.2-331.7l-0.6-18.7c0-8.3 1.1-30.5 2.3-51.6 78.6-28.7 149.5-138.4 178.2-188.8 26.4 35.8 86.7 104.9 179.3 140.7 34.5 13.4 69.8 20.5 104.3 28.1 68.6 14.7 133.7 28.7 177.6 86.2l1.7 1.7-1.1 2.4c0 21.7-1.7 42.2-4.7 62.1-56.7 91.4-150.5 151.1-267.1 164-8.8-11.7-26.4-19.4-46.9-19.4-29.3 0-52.8 15.8-52.8 35.8 0 19.4 23.4 35.8 52.8 35.8 26.4 0 47.5-12.9 52.2-29.9 37.5-4.1 73.3-13.4 107.3-27 48.1-19.4 90.3-48.1 126-84.5 5.9-5.9 11.1-11.7 16.4-18.1-42.2 129.7-155.4 212.9-302.5 212.9h-1.2z"/>
    </svg>
  )
}

Vue.component('icon-reception', Icon)
export default Icon
