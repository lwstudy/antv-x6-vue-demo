
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M845.3 978.7c-8.7-8.7-19.9-14.9-32.4-17.4-7.5-1.5-12.9-7.9-12.9-15.5V578.2c0-159-130.1-290.8-289.1-290.2-158.5 0.6-286.9 129.3-286.9 288v369.8c0 7.6-5.4 14-12.9 15.5-29.2 6-51.1 31.8-51.1 62.7h704c0-17.7-7.2-33.7-18.7-45.3zM720 960H304c-8.8 0-16-7.2-16-16V577.8c0-59.3 22.7-116.7 64.4-159 42.2-42.8 98.5-66.6 158.5-66.8 59.2-0.3 115.8 22.7 158 64.1C712.2 458.6 736 515.5 736 576v368c0 8.8-7.2 16-16 16zM512 208c-17.7 0-32-14.3-32-32V32c0-17.7 14.3-32 32-32s32 14.3 32 32v144c0 17.7-14.3 32-32 32zM280 296.1c-15.3 8.8-34.9 3.6-43.7-11.7l-72-124.7c-8.8-15.3-3.6-34.9 11.7-43.7 15.3-8.8 34.9-3.6 43.7 11.7l72 124.7c8.8 15.3 3.6 34.8-11.7 43.7zM744 296.1c15.3 8.8 34.9 3.6 43.7-11.7l72-124.7c8.8-15.3 3.6-34.9-11.7-43.7-15.3-8.8-34.9-3.6-43.7 11.7l-72 124.7c-8.8 15.3-3.6 34.8 11.7 43.7zM202.5 444.9c-4.6 17.1-22.1 27.2-39.2 22.6L24.2 430.3C7.1 425.7-3 408.2 1.5 391.1c4.6-17.1 22.1-27.2 39.2-22.6l139.1 37.3c17.1 4.5 27.2 22 22.7 39.1zM821.5 444.9c4.6 17.1 22.1 27.2 39.2 22.6l139.1-37.3c17.1-4.6 27.2-22.1 22.6-39.2-4.6-17.1-22.1-27.2-39.2-22.6l-139.1 37.3c-17 4.6-27.1 22.1-22.6 39.2zM456.7 880l19.4-173.3H400L567.3 464l-19.4 173.3H624L456.7 880z"/>
    </svg>
  )
}

Vue.component('icon-alarm', Icon)
export default Icon

