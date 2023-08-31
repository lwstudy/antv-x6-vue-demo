
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1009.95955 561.3H433.65955c-35.5 0-48.3-13.5-48-48V299.4c0-32-12.2-54.4-46.1-54.4h-55.1c-58.4 0-113.5 27.3-148.8 73.8C96.75955 370 48.25955 434.4 26.45955 466.2c-13.2 19-21.4 41-23.7 64C-0.64045 578.6 0.05955 673 0.05955 673v52c0 17.7 14.3 32 32 32h48c0-22.6 5.2-44.4 14.9-64 6.9-13.8 16-26.6 27.2-37.8C149.45955 628 185.55955 613 224.05955 613s74.6 15 101.8 42.2c11.2 11.2 20.4 24 27.2 37.8h317.9c6.9-13.8 16-26.6 27.2-37.8 12.8-12.8 27.5-22.8 43.5-29.9 18.1-8 37.9-12.3 58.3-12.3s40.2 4.2 58.3 12.3c16 7.1 30.7 17.2 43.5 29.9 11.2 11.2 20.4 24 27.2 37.8 9.8 19.6 14.9 41.4 14.9 64h16c35.4 0 64-28.7 64-64V574.7c-1.8-6.6-7.2-11.7-13.9-13.4zM351.75955 452c0 8.8-7.2 15.9-16 16l-264 0.5c-3.3 0-5.2-3.7-3.3-6.3 24.9-34.5 62.5-84.4 92.6-124 14.4-18.9 33.2-34.5 54.5-45 21.3-10.6 45.1-16.1 68.8-16.1H320.05955c17.7 0 32.1 14.4 32 32.1l-0.3 142.8zM224.05955 757m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0ZM800.05955 757m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0ZM1016.05955 531H448.05955c-17.7 0-32-14.3-32-32V205c0-4.4 3.6-8 8-8h592c4.4 0 8 3.6 8 8v318c0 4.4-3.6 8-8 8z"/>
    </svg>
  )
}

Vue.component('icon-truck-fill', Icon)
export default Icon
