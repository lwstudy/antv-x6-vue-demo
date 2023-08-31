
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M512 64c43.1 0 84.8 8.4 124.1 25 38 16.1 72.1 39.1 101.4 68.4 29.3 29.3 52.3 63.4 68.4 101.4 16.6 39.3 25 81 25 124.1 0 71-23.2 138.6-67.1 195.4l-0.3 0.4-0.3 0.4L512 916.9 253.8 570.4C214 515.4 193 450.7 193 383c0-43.1 8.4-84.8 25-124.1 16.1-38 39.1-72.1 68.4-101.4 29.3-29.3 63.4-52.3 101.4-68.4C427.2 72.4 468.9 64 512 64m0 563.2c134.7 0 244.2-109.3 244.2-243.7 0-134.7-109.6-244.2-244.2-244.2S267.8 248.6 267.8 383c0 134.7 109.5 244.2 244.2 244.2M512 0C300.5 0 129 171.5 129 383c0 84 27.1 161.8 73.2 225.3L512 1024l302.6-406.5c50.2-65 80.4-145.9 80.4-234.5C895 171.5 723.5 0 512 0z m0 563.2c-99.3 0-180.2-80.4-180.2-180.2 0-99.8 80.9-179.7 180.2-179.7s180.2 80.4 180.2 180.2S611.3 563.2 512 563.2z"/>
    </svg>
  )
}

Vue.component('icon-location', Icon)
export default Icon

