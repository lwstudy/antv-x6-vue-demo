
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M976.3 817.8c-6.7-7.5-10.3-17.2-10.3-27.3V97c0-17.7-14.3-32-32-32H328.4c-11.8 0-23-5.1-30.8-13.9l-2.2-2.5-13.9-15.7c-15.4-17.4-43.8-13.1-53.2 8.2-2.8 6.3-5.5 12.7-8.1 19.1C191.7 130.5 176 207.4 176 288c0 123.9 37 239.1 100.7 335.2 12.6 19.1 14 43.4 3.8 63.9L112 1023.5v0.5h92.2c13 0 25.6-3.9 36.3-11.3l70.3-48.4 70.3 48.4c10.7 7.4 23.3 11.3 36.3 11.3H512v-0.5L362.1 747.2c-4.3-8 5.8-15.8 12.5-9.7C482.6 836 626.3 896 784 896c54.6 0 107.5-7.2 157.8-20.7 6.7-1.8 13.3-3.7 19.9-5.7 22.3-6.8 30.1-34.4 14.6-51.8zM380.9 916l16.3 30-30-20.6 13.7-9.4zM902 186.8v536.4c0 3.7-4.6 5.4-7 2.7L622.2 417.8c-1.5-1.7-1.3-4.2 0.4-5.7l266.2-231.3c5.1-4.5 13.2-0.8 13.2 6zM829.4 129c7.4 0 10.8 9.2 5.2 14L580.1 364.2c-1.7 1.4-4.2 1.3-5.6-0.4l-202-228.2c-2.3-2.6-0.5-6.7 3-6.7h453.9zM221.3 948.2l17-33.9 16.1 11.1-33.1 22.8z m89.5-61.6l-43.6-30 39.1-78.1 43.9 81-39.4 27.1zM784 832c-73.5 0-144.7-14.4-211.7-42.7-32.2-13.6-63.3-30.5-92.4-50.1-28.8-19.5-55.9-41.8-80.6-66.5-24.6-24.6-47-51.7-66.5-80.6-19.7-29.1-36.5-60.2-50.2-92.4-28.2-67-42.6-138.2-42.6-211.7 0-59.7 9.5-117.8 28.2-173.5L553.7 437l17.5 19.8L893.7 821c-35.8 7.3-72.5 11-109.7 11zM571.2 456.7l-0.2 0.2-17.3-19.9z"/>
    </svg>
  )
}

Vue.component('icon-satellite-signal', Icon)
export default Icon

