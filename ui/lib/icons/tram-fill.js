
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M671.672547 127.738037h-79.836274c-35.227756 0-63.869019-28.641263-63.869018-63.869018V35.926323c0-2.195498 1.796316-3.991814 3.991813-3.991814h107.778969c17.663775 0 31.934509-14.270734 31.93451-31.934509H352.327453c0 8.78199 3.592632 16.765617 9.380763 22.553747 5.78813 5.78813 13.771757 9.380762 22.553747 9.380762h107.778969c2.195498 0 3.991814 1.796316 3.991813 3.991814v27.942696c0 35.227756-28.641263 63.869019-63.869018 63.869018h-79.836274c-70.555307 0-127.738037 57.182731-127.738037 127.738037v590.788423c0 35.227756 28.641263 63.869019 63.869019 63.869018h71.353669l-35.626937 80.13566c-5.388948 12.075236 0.099795 26.246175 12.175032 31.635123 3.193451 1.397135 6.486697 2.095702 9.680148 2.095702 9.181171 0 17.963161-5.289153 21.954975-14.270734L412.204658 910.133515h199.590684l44.309131 99.595751c5.388948 12.075236 19.559887 17.56398 31.635124 12.175032 8.881785-3.991814 14.270734-12.773804 14.270733-21.954975 0-3.293246-0.698567-6.586493-2.095702-9.680148L664.187896 910.133515H735.541565c35.227756 0 63.869019-28.641263 63.869019-63.869018V255.476074c0-70.555307-57.182731-127.738037-127.738037-127.738037zM320.392944 806.34636c0-6.586493 2.694474-12.574213 6.985674-16.965208 4.390995-4.2912 10.378716-6.985674 16.965208-6.985674h15.967255c13.172985 0 23.950882 10.777897 23.950882 23.950882 0 6.586493-2.694474 12.574213-6.985674 16.965208-4.390995 4.2912-10.378716 6.985674-16.965208 6.985674h-15.967255c-13.172985 0-23.950882-10.777897-23.950882-23.950882z m376.228438 16.965208c-4.390995 4.2912-10.378716 6.985674-16.965208 6.985674h-15.967255c-13.172985 0-23.950882-10.777897-23.950882-23.950882 0-6.586493 2.694474-12.574213 6.985674-16.965208 4.390995-4.2912 10.378716-6.985674 16.965208-6.985674h15.967255c13.172985 0 23.950882 10.777897 23.950882 23.950882 0 6.586493-2.694474 12.574213-6.985674 16.965208z m38.920183-360.261183c0 17.663775-14.270734 31.934509-31.934509 31.934509H320.392944c-17.663775 0-31.934509-14.270734-31.934509-31.934509V255.476074c0-35.327551 28.641263-63.869019 63.869018-63.869018h319.345094c35.227756 0 63.869019 28.541468 63.869018 63.869018v207.574311z"/>
    </svg>
  )
}

Vue.component('icon-tram-fill', Icon)
export default Icon
