
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M511.850044 0.299912C229.332813 0.299912 0.299912 107.568486 0 239.929708v544.140584c0 132.461193 229.132871 239.929708 511.850044 239.929708s511.850044-107.468515 511.850044-239.929708V239.929708C1023.400176 107.568486 794.367275 0.299912 511.850044 0.299912zM167.950796 895.737577c-22.093527 0-39.988285-17.894757-39.988285-39.988285s17.894757-39.988285 39.988285-39.988284 39.988285 17.894757 39.988284 39.988284-17.894757 39.988285-39.988284 39.988285z m791.768036-188.644733c-17.894757 11.496632-37.489017 22.193498-58.782778 32.190569-104.969247 49.18559-243.228742 76.277653-389.08601 76.277653s-284.116763-27.092063-389.08601-76.277653c-21.293762-9.997071-40.888021-20.693937-58.782779-32.190569v-79.176804c87.274431 73.778385 255.125256 123.66377 447.868789 123.663771s360.594357-49.885385 447.868788-123.663771v79.176804zM127.962511 583.828956c0-22.093527 17.894757-39.988285 39.988285-39.988284s39.988285 17.894757 39.988284 39.988284-17.894757 39.988285-39.988284 39.988285-39.988285-17.894757-39.988285-39.988285z m831.756321-148.156594c-17.894757 11.496632-37.489017 22.193498-58.782778 32.190569-104.969247 49.18559-243.228742 76.277653-389.08601 76.277653S227.733281 517.048521 122.764034 467.862931c-21.293762-9.997071-40.888021-20.693937-58.782779-32.190569v-79.176804c87.274431 73.778385 255.125256 123.66377 447.868789 123.66377s360.594357-49.885385 447.868788-123.66377v79.176804z"/>
    </svg>
  )
}

Vue.component('icon-database-fill', Icon)
export default Icon

