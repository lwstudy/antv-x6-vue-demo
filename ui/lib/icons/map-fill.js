
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 148.5v660c0 58-39 108.8-95.1 123.7l-172.8 45.9c-10.2 2.7-20.1-5-20.1-15.5V162c0-7 4.6-13.2 11.3-15.3l193.9-59.4c41.2-12.6 82.8 18.2 82.8 61.2zM672 176.4V963c0 10.5-9.9 18.1-20 15.5l-260-67.8a32 32 0 0 1-23.9-31V93.1c0-10.5 9.9-18.1 20-15.5l260 67.8a32 32 0 0 1 23.9 31zM304 93.4v795.8c0 7.6-5.4 14.2-12.9 15.7L76.5 947.7C36.9 955.6 0 925.3 0 885V252.2c0-57.9 38.9-108.7 94.9-123.6l189-50.6C294 75.2 304 82.9 304 93.4z"/>
    </svg>
  )
}

Vue.component('icon-map-fill', Icon)
export default Icon

