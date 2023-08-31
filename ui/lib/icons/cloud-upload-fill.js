
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M767.6 317.3c-18.1-2.7-34.1-13-44.2-28.2-51-77.5-140.8-129-243.4-129-139.3 0-255.2 94.9-281.8 220.8-4.4 20.8-18.5 38.3-38.2 46.3C65.8 465.6 0.2 551.2 0.2 650.7 0.2 781.3 113.4 888.6 256.1 896H736c158.9 0 287.9-130.5 287.9-291.3-0.1-145.4-111.1-265.5-256.3-287.4zM386.7 525.8l98.5-98.5c6.3-6.3 16.4-6.3 22.6 0l98.5 98.5c2.5 2.5 0.7 6.8-2.8 6.8h-71c-2.2 0-4 1.8-4 4V748c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V536.6c0-2.2-1.8-4-4-4h-71c-3.5 0-5.3-4.3-2.8-6.8z"/>
    </svg>
  )
}

Vue.component('icon-cloud-upload-fill', Icon)
export default Icon

