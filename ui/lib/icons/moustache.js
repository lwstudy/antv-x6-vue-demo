
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <path d="M859.4 555.2c2.7 2.3 1.3 6.8-2.2 7.1C742.3 572.1 626.8 577 512 577h-15.7c-109.5-0.4-219.8-5.4-329.4-14.8-3.6-0.3-5-4.8-2.2-7.1L286 451.9c2.9-2.5 6.6-3.9 10.4-3.9h423.4c3.7 0 7.2 1.3 10.1 3.6l129.5 103.6zM296.5 384c-15 0-29.5 5.2-41 14.8C175.7 465.3 94 530.7 14.2 597.2c-5.4 4.5-2.8 13.2 4.1 14.1C161 628.5 321.1 640.3 496 641h16c181.4 0 347-12 493.7-29.8 7-0.8 9.5-9.6 4.1-14.1-79.8-66.4-157.5-131.8-237.3-198.3-11.5-9.6-26-14.8-41-14.8h-435z"/>
    </svg>
  )
}

Vue.component('icon-moustache', Icon)
export default Icon

