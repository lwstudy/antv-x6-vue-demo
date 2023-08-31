
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 318.5H479.2c-12.6 0-24.9-3.7-35.4-10.7-35.5-23.6-78-37.3-123.8-37.3s-88.3 13.7-123.8 37.3c-10.5 7-22.8 10.7-35.4 10.7H64c-35.3 0-64 28.6-64 64v304h96v67h48c8.8 0 16-7.2 16-16v-19c0-17.7 14.3-32 32-32h12.6c33.7 20.3 73.2 32 115.4 32s81.7-11.7 115.4-32H832c17.7 0 32 14.3 32 32v19c0 8.8 7.2 16 16 16h48v-67h96v-304c0-35.4-28.7-64-64-64zM736 432c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zM433.1 607.6C427.7 613 422 618 416 622.5c-27.5 20.8-60.9 32-96 32s-68.5-11.2-96-32c-6-4.5-11.7-9.5-17.1-14.9-30.2-30.2-46.9-70.4-46.9-113.1 0-42.2 16.2-81.9 45.7-112l1.1-1.1c30.2-30.2 70.4-46.9 113.1-46.9s82.9 16.6 113.1 46.9l1.1 1.1c29.5 30.1 45.7 69.8 45.7 112 0.2 42.7-16.4 82.9-46.7 113.1zM896 576c0 8.8-7.2 16-16 16H624c-8.8 0-16-7.2-16-16v-32c0-8.8 7.2-16 16-16h256c8.8 0 16 7.2 16 16v32z m-48-64c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zM320 496m-112 0a112 112 0 1 0 224 0 112 112 0 1 0-224 0Z"/>
    </svg>
  )
}

Vue.component('icon-projector-fill', Icon)
export default Icon

