
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1023.976411 534.211283c-0.899979-65.0985-54.398747-117.997282-119.497248-118.197277-41.499044-0.199995-78.198199 20.799521-99.797701 52.698786-4.499896 6.699846-13.299694 9.09979-20.499527 5.399876L398.590818 280.017139c-6.999839-3.499919-10.39976-11.69973-7.999816-19.199557 6.099859-19.199558 9.399783-39.599088 9.399783-60.7986C399.990785 88.721546 308.092902-1.676371 196.795466 0.023589 87.797977 1.72355 0 90.621502 0 200.018982c0 92.597867 62.898551 170.396075 148.196586 193.195549 6.999839 1.899956 11.799728 8.199811 11.799728 15.399646v253.994148c0 7.199834-4.799889 13.399691-11.599733 15.399646C81.198129 697.007533 31.999263 758.806109 31.999263 832.004423c0 88.597959 71.998341 160.296307 160.5963 159.996314 88.09797-0.299993 159.396328-71.798346 159.396328-159.996314v-1.399968c0-6.099859 3.399922-11.69973 8.799797-14.399668l425.990187-214.495059c6.999839-3.499919 15.499643-1.499965 20.099537 4.79989 21.799498 29.999309 57.198682 49.598857 97.197761 49.598857 66.798461-0.099998 120.897215-54.798738 119.897238-121.897192z m-282.59349 18.599572l-393.990924 198.395429c-7.299832 3.699915-16.299625 1.199972-20.699523-5.699868-20.799521-32.399254-52.998779-56.698694-90.897906-67.498445-6.899841-1.999954-11.799728-8.199811-11.799728-15.399646V412.314091c0-7.699823 5.499873-14.299671 12.9997-15.699638 42.299026-7.899818 79.898159-29.09933 108.297505-59.098638 4.799889-5.099883 12.499712-6.399853 18.799567-3.199927l377.291309 189.995623c11.69973 5.899864 11.69973 22.599479 0 28.499344z"/>
    </svg>
  )
}

Vue.component('icon-collaboration-fill', Icon)
export default Icon
