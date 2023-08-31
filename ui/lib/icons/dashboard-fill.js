
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M514.60052 137C229.50052 137.5-0.39948 368.2 0.00052 653.3 0.10052 729.2 16.60052 801.2 46.20052 866c8.5 18.7 18.2 36.9 28.8 54.3 2.9 4.8 8.1 7.7 13.7 7.7h853.7c5.6 0 10.8-2.9 13.7-7.7 10.6-17.5 20.3-35.6 28.8-54.3 29.6-65 46.2-137.4 46.2-213.5-0.1-285-231.4-516-516.5-515.5z m167.3 397.7c-41 88-90 186-116 212-25 25-57.8 37.5-90.5 37.5s-65.5-12.5-90.5-37.5c-50-50-50-131 0-181 26-26 124-75 212-116 9.2-4.3 18.5-6.2 27.4-6.2 43.4-0.1 78.5 46.2 57.6 91.2z m219.9 208.5c-1.7 7.3-5.8 13.5-11.3 17.8s-12.5 7-19.9 7c-20.6 0-35.8-19.1-31.2-39.2 5.7-24.5 8.5-49.7 8.5-75.3 0-44.9-8.8-88.5-26.1-129.4-16.8-39.6-40.7-75.2-71.3-105.7-30.5-30.6-66.1-54.5-105.7-71.3-41-17.3-84.5-26.1-129.4-26.1s-88.5 8.8-129.4 26.1c-39.6 16.8-75.2 40.7-105.7 71.3-30.6 30.5-54.5 66.1-71.3 105.7-17.3 41-26.1 84.5-26.1 129.4 0 25.6 2.9 50.8 8.5 75.3 0.6 2.5 0.8 4.9 0.8 7.3 0 17.2-13.9 31.9-32 31.9-14.8 0-27.8-10.2-31.1-24.6-6.3-27.4-9.8-55.9-10.2-85.1-2.6-219.1 176.8-401 395.9-401.3C734.20052 256.7 912.00052 434.3 912.00052 653.5c0 30.8-3.5 60.9-10.2 89.7z"/>
    </svg>
  )
}

Vue.component('icon-dashboard-fill', Icon)
export default Icon
