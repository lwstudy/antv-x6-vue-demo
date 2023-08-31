
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M125.109 893.435l334.74400001-265.387 133.539 142.032c0 0 55.744 15.19 59.175-26.999l-3.432-143.776 197.83099999-228.207 86.174-5.006c0 0 67.611-13.614 18.618-72.729l-241.763-243.39500001c0 0-65.868-8.439-60.861 52.36900001v65.926l-224.776 191.13699999-138.6 8.38100001c0 0-50.736 16.875-32.17599999 60.864l130.218 128.47599999-258.69400001 336.31900001z"/>
    </svg>
  )
}

Vue.component('icon-fix', Icon)
export default Icon

