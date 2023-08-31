
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 352c0 337-512 592-512 592S0 690 0 352C0 201.8 121.8 80 272 80c101.3 0 189.7 55.4 236.5 137.6 1.5 2.7 5.4 2.7 6.9 0C562.3 135.4 650.7 80 752 80c150.2 0 272 121.8 272 272z"/>
    </svg>
  )
}

Vue.component('icon-hear-fill', Icon)
export default Icon

