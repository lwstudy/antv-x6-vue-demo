
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M0.5 240v544c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V240c0-35.3-28.7-64-64-64h-896c-35.3 0-64 28.7-64 64z m72 0h880c4.4 0 8 3.6 8 8v44L570.8 493.6c-36.9 19.1-80.7 19.1-117.6 0l-388.7-201V248c0-4.4 3.6-8 8-8z m880 544h-880c-4.4 0-8-3.6-8-8V364.6l388.7 201.1c36.9 19.1 80.7 19.1 117.6 0L960.5 364v412c0 4.4-3.6 8-8 8z"/>
    </svg>
  )
}

Vue.component('icon-envelope', Icon)
export default Icon

