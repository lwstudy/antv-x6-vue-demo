
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M624 34.7v120h182.1l-132 131.1c-70.2-59.2-161-95-260-95C192.4 190.8 12 369.9 12 590c0 220.2 180.3 399.3 402.1 399.3 221.7 0 402.1-179.1 402.1-399.2 0-78.7-23.1-152.2-62.8-214.1L892 238.3v184.4h120v-388H624zM414.1 870c-155.4 0-281.9-125.5-281.8-279.9-0.1-154.4 126.3-279.9 281.8-279.9 155.4 0 281.8 125.5 281.8 279.9 0 154.3-126.5 279.9-281.8 279.9z"/>
    </svg>
  )
}

Vue.component('icon-men', Icon)
export default Icon

