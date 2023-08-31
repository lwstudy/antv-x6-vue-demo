
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M720 572c0 2.2-1.8 4-4 4h-56c-2.2 0-4-1.8-4-4V308c0-2.2 1.8-4 4-4h52c4.4 0 8 3.6 8 8v260zM608 240c-8.8 0-16 7.2-16 16v368c0 8.8 7.2 16 16 16h160c8.8 0 16-7.2 16-16V272c0-17.7-14.3-32-32-32H608zM448 128V64c0-35.3-28.7-64-64-64H256c-35.3 0-64 28.7-64 64v64h-32c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h704c17.7 0 32-14.3 32-32V256c0-70.7-57.3-128-128-128H448zM272 64h96c8.8 0 16 7.2 16 16v48H256V80c0-8.8 7.2-16 16-16z m556 896H196c-2.2 0-4-1.8-4-4V196c0-2.2 1.8-4 4-4h572c35.3 0 64 28.7 64 64v700c0 2.2-1.8 4-4 4z"/>
    </svg>
  )
}

Vue.component('icon-map-oil', Icon)
export default Icon

