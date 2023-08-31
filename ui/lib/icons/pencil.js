
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M938 67.2c3.8 0 11.1 1 16.8 7.8 6.8 8.1 6.9 19.8 0.3 27.9-8.7 9.5-17.8 18.8-27.3 28.2l-31.7-31.7c9.4-9.6 18.7-18.8 28.3-27.5 4.9-3.8 10.1-4.7 13.6-4.7M767.5 228.1l31.6 31.8C591.9 466.9 383 675.8 177.5 881.3l-0.2 0.2-0.2 0.2c-12.9 13.2-28.1 23.6-45.1 31-9.5 4.1-19.1 8.1-28.7 12 1.5-3.6 3-7.3 4.5-10.9 12.6-30.7 31-58 54.6-81.3l0.1-0.1 0.1-0.1c201.1-200 404.4-403.1 604.9-604.2M938 3.2c-19.6 0-39.2 6.6-55.3 20.2-26.9 24.1-51.1 51.3-76.2 76.9L927.2 221l0.1-0.3c25.2-24.8 52.2-49.2 76.2-75.7 27.3-32 27.5-79.1 0.4-111.2C986.8 13.6 962.5 3.2 938 3.2zM766.8 136.6c-2.8 3-5.5 7-8.7 10.3-213.1 213.8-426.6 427.2-640.5 640-29.7 29.2-53.1 64.1-69 102.6-15.4 37.5-30.3 75.1-45.5 112.7l-0.1-0.4v8.5c6.7 9 11.8 13.2 19.4 13.2 4.4 0 9.6-1.4 16.4-4.1 39.6-15.5 79.3-31.1 118.5-47.9a206.5 206.5 0 0 0 65.5-45c219.4-219.4 438.8-438.8 658.4-658.2 3.1-2.6 6.6-4.7 10.3-6.4L766.8 136.6z"/>
    </svg>
  )
}

Vue.component('icon-pencil', Icon)
export default Icon

