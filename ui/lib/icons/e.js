
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M293.380967 0l437.238066 0 0 138.072067L440.086233 138.072067l0 300.585156 253.122267 0 0 138.072067L440.086233 576.729289l0 300.585156 290.513089 0 0 146.685556L293.380967 1024 293.380967 0z"/>
    </svg>
  )
}

Vue.component('icon-e', Icon)
export default Icon

