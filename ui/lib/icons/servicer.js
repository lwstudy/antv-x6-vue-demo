
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M766 256H424c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM766 448H424c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM766 640H424c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM766 832H424c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h342c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM888 256h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM888 448h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM888 640h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM888 832h-48c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v48c0 4.4-3.6 8-8 8zM0 160v704c0 35.3 28.7 64 64 64h896c35.3 0 64-28.7 64-64V160c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64z m944 704H80c-8.8 0-16-7.2-16-16V740c0-2.2 1.8-4 4-4h888c2.2 0 4 1.8 4 4v108c0 8.8-7.2 16-16 16z m12-192H68c-2.2 0-4-1.8-4-4V548c0-2.2 1.8-4 4-4h888c2.2 0 4 1.8 4 4v120c0 2.2-1.8 4-4 4z m0-192H68c-2.2 0-4-1.8-4-4V356c0-2.2 1.8-4 4-4h888c2.2 0 4 1.8 4 4v120c0 2.2-1.8 4-4 4z m0-192H68c-2.2 0-4-1.8-4-4V176c0-8.8 7.2-16 16-16h864c8.8 0 16 7.2 16 16v108c0 2.2-1.8 4-4 4z"/>
    </svg>
  )
}

Vue.component('icon-servicer', Icon)
export default Icon
