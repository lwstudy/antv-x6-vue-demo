
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M912.659113 623.96149c-47.297081-0.299981-87.794581 28.698229-104.493551 69.895686-2.499846 6.099624-8.299488 10.099377-14.89908 10.099377H767.968043c-35.297821 0-63.99605-28.698229-63.99605-63.996051v-62.996112c114.792915-9.499414 205.187336-107.893341 205.187336-227.885935 0-121.692489-98.093946-220.886367-221.686318-227.985929C650.975264 49.396951 575.179942 0 487.185372 0 369.292649 0 272.998592 88.594532 264.59911 200.887601c-86.694649 23.998519-149.790755 97.393989-149.790755 184.288626 0 102.493674 87.794581 186.688478 198.587744 192.588114h6.599592V639.960502c0 35.297821-28.698229 63.99605-63.99605 63.996051h-25.298439c-6.599593 0-12.399235-3.999753-14.89908-10.099377-16.698969-41.197457-57.296464-70.195668-104.493551-69.895686C48.512447 624.361465-2.08443 677.058213 0.115434 739.854337 2.11531 799.850634 51.412268 847.947666 112.008528 847.947666c47.097093 0 87.294612-28.99821 103.893588-70.095674 2.399852-5.99963 8.299488-9.899389 14.799086-9.899389H255.999641c70.695637 0 127.9921-57.296464 127.9921-127.992101v-54.196655c0-4.399728 3.599778-7.999506 7.999507-7.999506h79.995063c4.399728 0 7.999506 3.599778 7.999506 7.999506v207.587188c0 6.599593-3.999753 12.399235-10.099377 14.899081-41.197457 16.698969-70.195668 57.296464-69.895686 104.493551 0.399975 62.796124 53.096723 113.293008 115.892847 111.193137C575.979892 1021.936927 623.97693 972.539976 623.97693 912.04371c0-47.097093-28.99821-87.294612-70.095674-103.893588-5.99963-2.399852-9.899389-8.299488-9.899389-14.799087V585.763847c0-4.399728 3.599778-7.999506 7.999506-7.999506h79.995063c4.399728 0 7.999506 3.599778 7.999506 7.999506V639.960502c0 70.695637 57.296464 127.9921 127.992101 127.992101h25.298439c6.499599 0 12.399235 3.899759 14.799086 9.899389C824.664544 818.949455 864.862063 847.947666 911.959156 847.947666c60.59626 0 109.893218-48.097032 111.893094-108.093329 2.199864-62.796124-48.397013-115.492872-111.193137-115.892847zM112.008528 783.951615c-26.498365 0-47.997038-21.498673-47.997038-47.997037s21.498673-47.997038 47.997038-47.997038 47.997038 21.498673 47.997038 47.997038-21.498673 47.997038-47.997038 47.997037z m447.972352 127.992101c0 26.498365-21.498673 47.997038-47.997038 47.997038s-47.997038-21.498673-47.997038-47.997038 21.498673-47.997038 47.997038-47.997038 47.997038 21.498673 47.997038 47.997038zM315.195987 513.768291c-37.697673-2.299858-72.495526-17.298932-98.193939-42.097402-24.698476-23.798531-38.197642-54.496637-38.197643-86.494662 0-27.098328 9.599408-52.996729 27.698291-74.995371 18.498858-22.498611 45.19721-39.397568 75.095365-47.597062l43.397322-11.99926 3.299796-44.897229c2.799827-38.097649 20.398741-73.495464 49.396951-99.893834 29.798161-26.998334 68.595766-41.79742 109.493242-41.797421 30.598112 0 60.296279 8.299488 85.794705 24.098513 24.698476 15.199062 44.497254 36.597741 57.396458 61.996174l16.698969 32.697982 36.697735 2.09987c43.997285 2.499846 84.89476 20.998704 115.192891 51.896797 29.798161 30.498118 46.297143 70.395655 46.297142 112.293069 0 90.794396-71.495587 164.689836-159.390162 164.689836H315.195987zM911.959156 783.951615c-26.498365 0-47.997038-21.498673-47.997038-47.997037s21.498673-47.997038 47.997038-47.997038 47.997038 21.498673 47.997038 47.997038-21.498673 47.997038-47.997038 47.997037z"/>
    </svg>
  )
}

Vue.component('icon-cloud-service', Icon)
export default Icon

