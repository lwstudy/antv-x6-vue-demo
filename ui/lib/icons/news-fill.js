
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M890.7 187.5L741.5 37.7C717.5 13.6 684.9 0 650.8 0H128c-17.7 0-32 14.3-32 32v960c0 17.7 14.3 32 32 32h768c17.7 0 32-14.3 32-32V277.8c0-33.8-13.4-66.3-37.3-90.3zM768 824c0 4.4-3.6 8-8 8H264c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h496c4.4 0 8 3.6 8 8v48z m0-144c0 4.4-3.6 8-8 8H264c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h496c4.4 0 8 3.6 8 8v48z m0-144c0 4.4-3.6 8-8 8H264c-4.4 0-8-3.6-8-8V360c0-4.4 3.6-8 8-8h496c4.4 0 8 3.6 8 8v176z m59.1-312H712c-4.4 0-8-3.6-8-8V100.4c0-3.6 4.3-5.3 6.8-2.8l119.1 119.6c2.5 2.5 0.7 6.8-2.8 6.8zM704 420v56c0 2.2-1.8 4-4 4H324c-2.2 0-4-1.8-4-4v-56c0-2.2 1.8-4 4-4h376c2.2 0 4 1.8 4 4z"/>
    </svg>
  )
}

Vue.component('icon-news-fill', Icon)
export default Icon

