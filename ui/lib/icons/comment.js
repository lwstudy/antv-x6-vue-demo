
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 96C229.2 96 0 282.3 0 512c0 92.1 36.8 177.1 99.1 246 4.1 4.5 5.3 10.9 3.1 16.5-5.7 14.7-12 29.2-19 43.3-12.9 26.3-28.2 51.7-45.3 75.5-6.2 8.6-7.7 19.7-4.1 29.6 3.6 10 11.9 17.5 22.2 20.1 9.4 2.4 25.2 5.4 44.8 5.4 26 0 58.7-5.4 91.5-25 21.4-12.8 37.5-28.6 49.3-44 4.5-5.9 12.5-7.9 19.3-4.8 74.2 34 159.8 53.3 251 53.3 282.8 0 512-186.3 512-416S794.8 96 512 96z m321.7 660.5c-41.2 33.5-89.3 59.8-143.2 78.3C634.1 854.2 574 864 512 864s-122.1-9.8-178.5-29.2c-20.2-6.9-39.5-15-58-24l-0.6-0.3c-28.7-14.2-63.2-3.7-79.5 23.9-0.7 1.2-1.4 2.3-2.1 3.2-7.8 10.8-18.6 22-33.6 31-13.1 7.8-26.3 12.1-38.5 14.2 7-12 13.5-24.2 19.6-36.5 5.6-11.4 10.9-23 15.7-34.8 2.4-5.8 6-15.7 9.6-26 7.8-22.3 2.3-46.9-13.9-64.1l-0.3-0.3c-22.3-23.6-40.7-49.2-54.9-76.6-21.9-42.2-33-86.7-33-132.5s11.1-90.3 33-132.4c21.7-41.7 53.1-79.5 93.3-112.1 41.2-33.5 89.3-59.8 143.2-78.3C389.9 169.8 450 160 512 160s122.1 9.8 178.5 29.2c53.8 18.5 102 44.8 143.2 78.3 40.2 32.7 71.6 70.4 93.3 112.1 21.9 42.1 33 86.6 33 132.4 0 45.8-11.1 90.3-33 132.4-21.7 41.7-53.1 79.4-93.3 112.1zM320 504m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0ZM512 504m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0ZM704 504m-56 0a56 56 0 1 0 112 0 56 56 0 1 0-112 0Z"/>
    </svg>
  )
}

Vue.component('icon-comment', Icon)
export default Icon

