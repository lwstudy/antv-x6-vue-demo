
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M368 196v632c0 2.2-1.8 4-4 4H244c-2.2 0-4-1.8-4-4V196c0-2.2 1.8-4 4-4h120c2.2 0 4 1.8 4 4z m-144-68c-26.5 0-48 21.5-48 48v672c0 26.5 21.5 48 48 48h160c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48H224zM784 196v632c0 2.2-1.8 4-4 4H660c-2.2 0-4-1.8-4-4V196c0-2.2 1.8-4 4-4h120c2.2 0 4 1.8 4 4z m-144-68c-26.5 0-48 21.5-48 48v672c0 26.5 21.5 48 48 48h160c26.5 0 48-21.5 48-48V176c0-26.5-21.5-48-48-48H640z"/>
    </svg>
  )
}

Vue.component('icon-pause', Icon)
export default Icon

