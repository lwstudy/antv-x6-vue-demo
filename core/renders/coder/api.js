const _ = require('lodash')
module.exports = _.template(`
/**
 *  <%=cname%> api
 *  @module code/api/<%=name%>
 *  @author coder
 */

<%if(configKeys.length>0){%>
// <%=configKeys.join(', ')%>
import { <%=configKeys.join(', ')%>} from '@/constant'
<%}%>

<%if(transforms.length>0){%>
// ajax
import ajax, { transformHandler } from '$ui/utils/ajax'

// transformer
import transformer from '@/mapping/index'
const { <%=transforms.join(', ')%> } = transformer

<%}else{%>
// ajax
import ajax from '$ui/utils/ajax'
<%}%>

<%_.each(items, function(item, i){%>
/**
 * <%=item.title||item.URL%>
 * @const
 * @type {String}
 * @default  '<%if(item.prefix){%>[<%=item.prefix%>]<%}%><%=item.url%>'
 */
export const <%=item.URL%> = <%if(item.prefix){%> <%=item.prefix%> + <%}%>'<%=item.url%>'

/**
 * <%=item.title||item.camelCaseName%>
 <%_.each(item.params, function(param){%>
 * @param {string|number} <%=param%> Url参数<%=param%>
 <%})%>
 * @param {object} [<%=item.ajaxParam%>] 发送键值对数据
 * @param {object} [options] ajax参数选项
 * @returns {Promise}
 */
export function <%=item.camelCaseName%> (

<%=item.params.join(', ')%>

<%if(item.params.length>0){%>,<%}%>

 <%=item.ajaxParam%>

, options

) {
  return ajax({
        <%if(item.options){%>
          <%_.each(item.options, function(value, key){%>
              <%=key%>: <%if(typeof value=='string'){%> '<%=value%>' <%}else{%> <%=JSON.stringify(value)%> <%}%>,
          <%})%>
        <%}%>

      <%if(item.params.length>0){%>
          params:{<%=item.params.join(', ')%>},
      <%}%>

      <%if(item.transform && item.transform.length>0){%>
          transformResponse: [transformHandler(<%=item.transform%>, '<%=item.camelCaseName%>', <%=item.ajaxParam%>, options
          <%if(item.params.length>0){%>
            ,{<%=item.params.join(', ')%>}
          <%}%>)],
      <%}%>

      <%=item.ajaxParam%>:<%=item.ajaxParam%>,

      url: <%=item.URL%>,

      ...options
  })
}
<%})%>
`)
