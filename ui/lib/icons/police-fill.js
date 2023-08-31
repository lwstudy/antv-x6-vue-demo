
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1017.609616 197.046058h-0.099922c-207.537861 0-310.657299-79.138173-386.09836-136.893053C587.645526 26.479313 553.072536 0 512.604152 0c-38.869633 0-68.446526 25.080406-105.817331 56.75566-69.845433 59.35363-165.470726 140.39032-399.088212 140.39032-4.996097 0-6.794692 0.999219-6.994535 1.498829-0.399688 0.699454-1.698673 4.796253 6.994535 20.284153 6.494926 11.590945 16.786885 26.279469 27.478532 41.767369C60.957001 297.667447 128.304386 448.449649 128.304386 448.449649c0.899297 1.298985 5.195941 4.096799 9.29274 6.494926 5.295863 3.197502 8.593286 8.992974 8.593286 15.188134l-0.799375 1.398907c-4.996097 10.092116-4.996097 20.583919-4.996097 31.675254v2.797814l-1.898517 2.09836c-5.495706 5.595628-9.492584 9.592506-9.492584 18.385637v10.691647l-4.596409 1.598751c-0.099922 0-0.099922 0-0.199844 0.099922-49.261514 16.686963-81.236534 66.448087-81.236534 126.701015 0 37.870414 23.381733 68.246682 43.166277 87.032006 24.880562 23.781421 57.555035 42.366901 89.729898 51.359875l3.297424 0.899297 1.199063 3.197502C211.239593 892.103044 282.583855 944.362217 337.141232 973.339578c65.348946 34.772834 133.69555 50.660422 169.667447 50.660422 35.871975 0 104.318501-15.887588 169.667448-50.660422 54.457455-28.977361 126.001561-81.236534 156.777517-165.071038l1.199063-3.197502 3.297424-0.899297c30.676034-8.493365 64.249805-28.477752 89.629977-53.358314 27.778298-27.278689 43.066354-57.555035 43.066354-84.933646v-0.499609c4.996097-61.451991-22.982045-112.212334-71.74395-130.697893-1.298985-0.49961-2.59797-0.999219-3.996877-1.398907l-4.596409-1.498829v-10.691647c0-8.79313-3.996877-12.790008-9.492584-18.385636l-1.898517-1.898517v-2.797814c0-5.795472-1.798595-11.89071-3.297424-17.286495-1.199063-3.797034-1.998439-6.994536-2.398126-9.892272-0.099922-0.49961-0.199844-1.099141-0.299766-1.598751l-1.998439-5.995316c-0.999219-2.997658 0-6.295082 2.498049-8.29352 2.59797-2.098361 5.495706-4.396565 6.694769-5.995317 0 0 61.451991-160.374707 99.122561-198.245121 12.790008-12.790008 24.78064-24.980484 33.174083-34.772833 4.596409-5.395785 7.394223-9.29274 9.092896-12.090555 1.398907-3.197502-0.49961-6.794692-3.697112-6.794691z m-601.530055-30.9758h191.250586l0.599532 87.631537c0 19.185012-15.98751 39.868852-47.762686 61.252147-22.582358 15.288056-44.864949 25.380172-45.764247 25.77986l-2.398126 0.999219-2.398126-0.999219c-0.899297-0.399688-23.181889-10.391881-45.764247-25.77986-31.675254-21.383294-47.762685-41.967213-47.762686-61.252147v-87.631537zM215.73608 482.223263s175.263076-25.180328 296.26854-25.180328c120.905543 0 296.26854 25.180328 296.26854 25.180328v43.36612s-114.610461 60.252927-247.406713 73.142857c-16.087432 1.598751-32.374707 2.498048-48.761905 2.498049-117.208431 0-229.420765-44.765027-274.885246-65.448868-13.689305-6.19516-21.283372-10.192037-21.283372-10.192038v-43.36612z"/>
    </svg>
  )
}

Vue.component('icon-police-fill', Icon)
export default Icon

