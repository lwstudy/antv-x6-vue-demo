
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M960 128H833c0-53-43-96-96-96h-16c-53 0-96 43-96 96H400c0-26.5-10.7-50.5-28.1-67.9C354.5 42.7 330.5 32 304 32h-16c-53 0-96 43-96 96H64c-35.3 0-64 28.6-64 64v736c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V192c0-35.4-28.7-64-64-64z m-271 8c0-22.1 17.9-40 40-40s40 17.9 40 40v80c0 22.1-17.9 40-40 40-11 0-21-4.5-28.3-11.7C693.5 237 689 227 689 216v-80z m-433 0c0-22.1 17.9-40 40-40s40 17.9 40 40v80c0 22.1-17.9 40-40 40-11 0-21-4.5-28.3-11.7C260.5 237 256 227 256 216v-80z m704 760c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V448h896v448z"/>
    </svg>
  )
}

Vue.component('icon-calendar-fill', Icon)
export default Icon

