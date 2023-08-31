
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M566.6 853.4c-5.8-5.8-13.8-9.4-22.6-9.4-13.3 0-25.3-5.4-33.9-14.1l-0.4-0.4c-26.5-27-78.8-49.6-116.6-49.6H182.9c-37.9 0-90.1 22.5-116.6 49.6l-0.4 0.4C57.3 838.6 45.3 844 32 844c-8.8 0-16.8 3.6-22.6 9.4C3.6 859.2 0 867.2 0 876v32c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48v-32c0-8.8-3.6-16.8-9.4-22.6z m-453 38.6c-7.3 0-10.8-8.9-5.4-13.9 1-1 2.1-2 3.1-3l0.8-0.8c5.3-5.5 16.9-13.8 33.5-20.8 16.4-7 30.1-9.5 37.4-9.5h210.2c7.3 0 21 2.5 37.4 9.5 16.5 7.1 28.1 15.4 33.5 20.8l0.8 0.8c1 1 2 2 3.1 3 5.3 4.9 1.8 13.9-5.4 13.9h-349zM1000.1 746.9L672.7 419.5c3.1-3.1 4.7-7.2 4.7-11.3 0-4.1-1.6-8.2-4.7-11.3l-11.3-11.3c6.3-6.3 14.4-9.4 22.6-9.4 2.7 0 5.5 0.3 8.1 1 11 2.9 22.8 0.1 30.9-8l74.2-74.2c18.7-18.7 18.7-49.1 0-67.9l-181-181c-18.7-18.7-49.1-18.7-67.9 0l-74.2 74.2c-8.1 8.1-10.9 19.8-8 30.9 0.7 2.7 1 5.4 1 8.1 0 8.2-3.1 16.4-9.4 22.6L322 317.7c-8.3 8.3-20.1 11.1-30.7 8.3-11-2.9-22.8-0.1-30.9 8l-74.2 74.2c-18.7 18.7-18.7 49.1 0 67.9l181 181c18.7 18.7 49.1 18.7 67.9 0l74.2-74.2c8.1-8.1 10.9-19.8 8-30.9-0.7-2.7-1-5.4-1-8.1 0-8.2 3.1-16.4 9.4-22.6l11.3 11.3c6.3 6.3 16.4 6.3 22.6 0l328.1 328.1c31.4 31.4 82.4 31.2 113.6-0.4 30.9-31.4 30-82.2-1.2-113.4zM412.5 589.3c-6.3 6.3-16.4 6.3-22.6 0L254.1 453.5c-6.3-6.3-6.3-16.4 0-22.6l11.3-11.3c6.3-6.3 16.4-6.3 22.6 0l135.8 135.8c6.3 6.3 6.3 16.4 0 22.6l-11.3 11.3z m-56.6-215l158.4-158.4c6.3-6.3 16.4-6.3 22.6 0l90.5 90.5c6.3 6.3 6.3 16.4 0 22.6L469 487.4c-6.3 6.3-16.4 6.3-22.6 0l-90.5-90.5c-6.2-6.2-6.2-16.4 0-22.6z m362-90.5c-6.3 6.3-16.4 6.3-22.6 0L559.5 148c-6.3-6.3-6.3-16.4 0-22.6l11.3-11.3c6.3-6.3 16.4-6.3 22.6 0l135.8 135.8c6.3 6.3 6.3 16.4 0 22.6l-11.3 11.3z m215 531.7L604.8 487.4l22.6-22.6 328.1 328.1c6.2 6.2 6.2 16.4 0 22.6-6.2 6.3-16.4 6.3-22.6 0z"/>
    </svg>
  )
}

Vue.component('icon-judge', Icon)
export default Icon
