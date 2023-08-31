
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M860.3 975.5v-44.2h-68.1V1.5H727c0-0.5-0.1-1-0.1-1.5H272.1c0 0.5-0.1 1-0.1 1.5h-40.2v929.9h-68.1v44.2H98.6v48.4h826.9v-48.5h-65.2zM452 57.5h115v92.2H452V57.5z m0 122.7h115v92H452v-92z m0 122.8h115v92H452v-92z m0 122.9h115v92H452v-92z m0 122.7h115v92H452v-92z m0 122.8h115v92H452v-92zM301.8 57.5h115.1v92.2H301.8V57.5z m0 122.7h115.1v92H301.8v-92z m0 122.8h115.1v92H301.8v-92z m0 122.9h115.1v92H301.8v-92z m0 122.7h115.1v92H301.8v-92z m0 122.8h115.1v92H301.8v-92zM503 931.3h-92V810.2h92v121.1z m110 0h-92V810.2h92v121.1z m104.2-167.9H602.1v-92h115.1v92z m0-122.8H602.1v-92h115.1v92z m0-122.7H602.1v-92h115.1v92z m0-122.9H602.1v-92h115.1v92z m0-122.7H602.1v-92h115.1v92z m0-122.7H602.1V57.5h115.1v92.1z"/>
    </svg>
  )
}

Vue.component('icon-high-building-fill', Icon)
export default Icon

