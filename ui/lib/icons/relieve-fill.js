
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M771.798516 586.270988c-6.897306 8.296759-17.293245 12.894963-27.989067 12.894963h-0.299882l-175.931277-1.199532-55.178446 422.834831-0.399844 3.19875-0.399844-3.19875-55.178446-422.834831-175.931277 1.199532h-0.299882c-10.795783 0-21.191722-4.598204-27.989067-12.894963-6.897306-8.39672-8.796564-18.292854-8.596642-27.28934 0.399844-13.094885 5.697774-25.590004 14.394377-35.386177l61.87583-69.872706c15.393987-17.393206 24.790316-39.284654 26.589613-62.475596l20.292074-250.402187c0.599766-7.796954-2.199141-15.593909-7.796955-21.091761l-38.584927-38.584927c-19.692308-16.693479-21.891449-33.58688-17.79305-47.581414 5.897696-20.092152 24.690355-33.58688 45.582194-33.58688h0.199922l163.236236 0.499805h0.799688l163.236236-0.499805h0.199922c20.891839 0 39.684498 13.494729 45.582194 33.58688 4.098399 13.994533 1.899258 30.887934-17.79305 47.581414L664.940258 119.753221c-5.597813 5.597813-8.39672 13.294807-7.796955 21.091761L677.435377 391.247169c1.899258 23.190941 11.195627 45.08239 26.589613 62.475596l61.87583 69.872706c8.696603 9.796173 13.894572 22.291292 14.394377 35.386177 0.299883 8.996486-1.599375 18.89262-8.496681 27.28934z"/>
    </svg>
  )
}

Vue.component('icon-relieve-fill', Icon)
export default Icon

