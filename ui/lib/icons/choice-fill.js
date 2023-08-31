
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M927.54734 0h-831.593948c-52.974134 0-95.953148 42.979014-95.953148 95.953148v831.593948c0 52.974134 42.979014 95.953148 95.953148 95.953148h831.593948c52.974134 0 95.953148-42.979014 95.953148-95.953148v-831.593948c0-52.974134-42.979014-95.953148-95.953148-95.953148zM825.896974 352.128062L486.662616 691.362421c-24.987799 24.987799-65.468033 24.987799-90.455832 0L260.573011 555.728648c-12.493899-12.493899-12.493899-32.783992 0-45.277892 6.296925-6.296925 14.392972-9.395412 22.58897-9.395412 8.195998 0 16.391996 3.098487 22.588971 9.395412l124.439238 124.439239c6.196974 6.196974 16.391996 6.196974 22.588971 0l327.939873-327.939873c12.493899-12.493899 32.783992-12.493899 45.277891 0 6.296925 6.296925 9.395412 14.392972 9.395413 22.58897s-3.198438 16.391996-9.495364 22.58897z"/>
    </svg>
  )
}

Vue.component('icon-choice-fill', Icon)
export default Icon
