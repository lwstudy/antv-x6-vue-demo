const _ = require('lodash')
module.exports = _.template(`
/**
* Vuex Mutation type
* @module base/types
* @author coder
*/
<%_.each(types, function(items, name){%>
// ------------------------ <%=name%> -------------------------
  <%_.each(items, function(item){%>
      /**
      *  <%=item.title%>
      *  @const
      *  @type {String}
      *  @default '<%=item.name%>'
      */
     export const <%=item.name%> = '<%=item.name%>'
  <%})%>
   
<%})%>
`)
