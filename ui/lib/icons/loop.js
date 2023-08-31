
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1019.7229 566.9H947.0229c-8.8 0-16-7.2-16-16V244c0-35.3-28.7-64-64-64H196.0229c-2.2 0-4 1.8-4 4v56c0 2.2 1.8 4 4 4h655c8.8 0 16 7.2 16 16v290.9c0 8.8-7.2 16-16 16h-72.7c-3.1 0-5 3.3-3.5 6L895.5229 782c1.5 2.7 5.4 2.7 6.9 0l120.7-209.1c1.6-2.6-0.3-6-3.4-6zM4.0229 462.1h72.7c8.8 0 16 7.2 16 16V785c0 35.3 28.7 64 64 64h639c2.2 0 4-1.8 4-4v-56c0-2.2-1.8-4-4-4h-623c-8.8 0-16-7.2-16-16V478.1c0-8.8 7.2-16 16-16h72.7c3.1 0 5-3.3 3.5-6L128.2229 247c-1.5-2.7-5.4-2.7-6.9 0L0.5229 456.1c-1.5 2.6 0.4 6 3.5 6z"/>
    </svg>
  )
}

Vue.component('icon-loop', Icon)
export default Icon

