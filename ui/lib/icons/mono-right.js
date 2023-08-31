
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M287.802467 992.000352c0-7.399919 2.599971-14.899836 7.799915-20.89977l360.796029-416.895412c20.999769-23.999736 20.999769-60.299336 0-84.299072l-0.099999-0.099999L295.602382 52.910688c-11.599872-13.399853-10.099889-33.59963 3.299963-45.099504 13.399853-11.599872 33.59963-10.099889 45.099504 3.299964l360.596031 416.695414c20.399775 23.299744 31.599652 53.199414 31.599653 84.199073s-11.199877 60.89933-31.599653 84.199073L344.001849 1012.900122c-11.599872 13.399853-31.79965 14.799837-45.099504 3.299964-7.399919-6.299931-11.099878-15.199833-11.099878-24.199734z"/>
    </svg>
  )
}

Vue.component('icon-mono-right', Icon)
export default Icon
