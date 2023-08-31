
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M990.09842358 265.40842716c13.71338369 14.08738511 20.69474273 30.79277981 20.69474271 50.36551842 0 19.44807148-6.98135898 36.2781333-20.69474271 50.3655184L766.81960306 588.79494889l83.52697364 83.52697358-89.01232713 89.13699425c-60.46355553 60.46355553-132.7704879 95.12101623-216.79613 103.72304781-84.02564212 8.72669874-160.4465896-9.97336998-229.01350825-55.85087191L114.06253766 1010.66849916H13.33150084v-100.73103682l201.46207367-201.46207366c-46.00216905-68.56691864-64.57757064-144.98786614-55.85087191-229.01350825s43.25949231-156.20790737 103.84771494-216.79613l89.01232712-89.01232713 83.5269736 83.52697364 222.65548488-223.15415341c14.08738511-13.71338369 30.91744695-20.69474273 50.73951978-20.69474269 19.69740571 0 36.40280044 6.98135898 50.11618416 20.69474269 13.71338369 13.71338369 20.69474273 30.54344558 20.69474273 50.36551844 0 19.94673996-6.98135898 36.65213467-20.69474273 50.36551842L535.93608795 357.78676664l130.27714541 130.27714541 223.27882052-222.65548489c14.08738511-13.71338369 30.91744695-20.69474273 50.73951977-20.69474271 19.32340434 0.12466711 36.02879907 6.98135898 49.86684993 20.69474271z"/>
    </svg>
  )
}

Vue.component('icon-plug', Icon)
export default Icon
