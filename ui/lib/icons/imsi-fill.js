
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M976 162c-5.1-1.3-10.5-2-16-2H261.6c-24.5 0-48.6 7.1-69.2 20.3L58.8 266.2c-3.8 2.4-7.4 5-10.8 7.8-30.2 24.1-48 60.8-48 99.9V800c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V224c0-29.8-20.4-54.9-48-62zM64 373.9c0-21.8 11.1-42.1 29.4-53.8l49.8-32H960v160H64v-74.2zM256 768v-32h32v32h-32z m64 0v-32h32v32h-32z m64 0v-32h32v32h-32z m64 0v-32h32v32h-32z m64-64h-32V512h32v192z m32 32v32h-32v-32h32z m160-32h-32V544h-32v160h-32V544h-32v160h-32V512h160v192z m32 32v32h-32v-32h32z m-64 0v32h-32v-32h32z m-64 0v32h-32v-32h32z m128-96V512h128v32h-96v64h96v96H736v-32h96v-32h-96z m128 96v32h-32v-32h32z m-64 0v32h-32v-32h32z m128 0v32h-32v-32h32z m-32-32V512h32v192h-32z"/>
    </svg>
  )
}

Vue.component('icon-imsi-fill', Icon)
export default Icon

