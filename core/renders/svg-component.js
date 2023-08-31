const _ = require('lodash')


module.exports = _.template(`
/**
 * 该文件由 .my/core/build/svg.js 生成
 */
 
import Vue from 'vue'
import globalConfig from '$ui/config'

const Icon = ({props}) => {
  const attrs = {...globalConfig.svg, ...props}
  return (
    <svg {...{attrs: attrs}}>
       <%= paths %>
    </svg>
  )
}

Vue.component('icon-<%= name %>', Icon)
export default Icon

`)
