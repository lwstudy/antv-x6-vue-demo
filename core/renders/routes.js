const _ = require('lodash')

/**
 * 渲染函数
 * @param {object} options 参数对象
 * @param {object[]} options.items 路由数组
 * @param {function} options.render 渲染函数
 */
module.exports = _.template(`
  [
    <% _.each(items, function(item, index) {%>
    <%if(index>0){%>,<%}%>
    {

      path: '<%= item.path %>',
      component: get('<%= item.component %>')
       <%if(item.children && item.children.length>0) { %>
       ,children: <%= render({items:item.children, render: render}) %>
      <%}%>
      <%if(item.meta){%>
       ,meta: <%=item.meta%>
      <%}%>
      ,props: true
    }

    <%})%>

  ]
`)
