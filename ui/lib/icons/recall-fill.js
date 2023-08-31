
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M992 541.2c1.5 264.1-210.2 479-473.1 482.7C251.2 1027.7 33 813.5 32 545.7c-0.1-14.5 0.5-28.9 1.8-43.1 4.2-49 45-86.7 94.1-86.7 10.7 0 18.3 10.3 15.3 20.6C133.1 471.2 128 507.2 128 544c0 51.9 10.1 102.2 30.1 149.4 19.3 45.7 47 86.8 82.3 122.1s76.4 63 122.1 82.3c47.3 20 97.6 30.1 149.4 30.1s102.2-10.1 149.4-30.1c45.7-19.3 86.8-47 122.1-82.3s63-76.4 82.3-122.1c20-47.3 30.1-97.6 30.1-149.4s-10.1-102.2-30.1-149.4c-19.3-45.7-47-86.8-82.3-122.1s-76.4-63-122.1-82.3c-47.3-20-97.6-30.1-149.4-30.1s-102.2 10.1-149.4 30.1c-17.9 7.6-35 16.4-51.4 26.5-3.4 2.1-1.9 7.4 2.1 7.4h63.2c4.7 0 9.3 2.1 12.3 5.8l69.7 83.7c2.2 2.6 0.3 6.6-3.1 6.6H256c-70.7 0-128-57.3-128-128V9.7c0-3.6 4.3-5.3 6.8-2.8l84.5 84.5c3 3 4.7 7.1 4.7 11.3v49.4c0 3.3 3.7 5.2 6.3 3.2C309.6 97.8 407.1 63.9 512.5 64c264.4 0.2 478 212.8 479.5 477.2z"/>
    </svg>
  )
}

Vue.component('icon-recall-fill', Icon)
export default Icon

