
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M1024 640l-3.5 41.6c-6.5 78.1-27.7 154-62.2 223.9-7.5 15.2-30.4 10-30.4-7V800c0-61.9-25.1-117.9-65.6-158.4C821.9 601.1 765.9 576 704 576H552c-4.4 0-8 3.6-8 8v179.6c0 13.9-16.5 21.2-26.8 11.8L160 447.9 516.5 76.7c10-10.4 27.5-3.3 27.5 11.1V280c0 4.4 3.6 8 8 8h120c97.2 0 185.2 39.4 248.9 103.1S1024 542.8 1024 640zM356.7 95.1L0 453.1l357.3 326.1c10.3 9.4 26.8 2.1 26.8-11.8 0-32.1-13.5-62.7-37.2-84.4L92.5 450.9l258.2-259.1c21.3-21.4 33.3-50.4 33.3-80.6v-4.8c0-14.3-17.3-21.4-27.3-11.3z"/>
    </svg>
  )
}

Vue.component('icon-reply-fill', Icon)
export default Icon

