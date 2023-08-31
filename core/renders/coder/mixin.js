const _ = require('lodash')
module.exports = _.template(`
/**
 *  <%=cname%> mixin module
 *  @module $my/code/mixin/<%=name%>
 *  @author coder
 */
import { <%=importApiArray.join(', ')%> } from '$my/code/api/<%=kebabCaseName%>'

// mixin
export default {
  /**
   * <%=cname%>数据存储载体对象
   * @member <%=name%>
   <%_.each(customStateArray, function(item){ %>
   * @property {*} [<%=item.state%>=null] <%=item.title%>响应数据
   <%})%>
   * @property {Array} [<%=list%>=\\[\\]] 获取<%=cname%>列表响应数据
   * @property {number} [<%=page%>=null] 获取<%=cname%>列表响应页码
   * @property {number} [<%=limit%>=null] 获取<%=cname%>列表页大小，每页记录条数
   * @property {number} [<%=total%>=0] 获取<%=cname%>列表数据记录总条数
   * @property {object} [<%=model%>=null] 获取<%=cname%>单条记录
   */
  data() {
   return {
      <%=name%>: {
       <%_.each(customStateArray, function(item){ %>
          <%=item.state%>: null,
       <%})%>
        <%=list%>: [],
        <%=page%>: null,
        <%=limit%>: null,
        <%=total%>: 0,
        <%=model%>: null
      }
    }
  },
  methods: {

    <%_.each(items, function(item, i){%>
      <%if(i>0){%>,<%}%>

      <%if(item.methodType == 'fetch'){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
         <%=item.name%>({
          <%_.each(item.params, function(param){%>
            <%=param%>,
          <%})%>
           <%=item.ajaxParam%>,
           options }={}
         ) {
            return <%=item.name%>(
                <%_.each(item.params, function(param){%>
                   <%=param%>,
                <%})%>
                 <%=item.ajaxParam%>,
                 options
            ).then(res => {
              this.<%=name%>.<%=list%> = res.<%=list%> || []
              this.<%=name%>.<%=page%> = Number.parseInt(res.<%=page%>) || 0
              this.<%=name%>.<%=limit%> = Number.parseInt(res.<%=limit%>) || 0
              this.<%=name%>.<%=total%> = Number.parseInt(res.<%=total%>) || 0
              return res
            })

         }
      <%}%>

      <%if(item.methodType == 'add'){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {number} [index] 新增到列表的位置索引，默认最近到列表最后
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
        <%=item.name%>({
           <%_.each(item.params, function(param){%>
            <%=param%>,
          <%})%>
           <%=item.ajaxParam%>,
           index,
           options }={}
        ) {
           return <%=item.name%>(
             <%_.each(item.params, function(param){%>
               <%=param%>,
            <%})%>
             <%=item.ajaxParam%>,
             index,
             options
           ).then(res => {
              const model = Object.assign({}, <%=item.ajaxParam%>, res||{})
              const list = [...this.<%=name%>.<%=list%>]
              if(index !== undefined) {
                list.splice(index, 0, model)
              }else {
                 list.push(model);
              }
              this.<%=name%>.<%=list%> = list
              this.<%=name%>.<%=total%> += 1;
              return res
           })
        }

      <%}%>

      <%if(item.methodType == 'update'){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {number} [index] 源实体在列表的位置索引，如没有index，即不更新实体在源列表数据
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
          <%=item.name%>({
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>,
               index,
               options }={}
          ) {
             return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                 <%=param%>,
              <%})%>
               <%=item.ajaxParam%>,
               index,
               options
             ).then(res => {
                const model = Object.assign({}, <%=item.ajaxParam%>, res||{})
                const list = [...this.<%=name%>.<%=list%>]
                if(index !== undefined) {
                  list.splice(index, 1, model)
                }
                this.<%=name%>.<%=list%> = list
                return res
             })
          }


      <%}%>

      <%if(item.methodType == 'remove'){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {number} [index] 源实体在列表的位置索引，如没有index，即不删除实体在源列表数据
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
        <%=item.name%>({
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              index,
              options }={}
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              options
            ).then(res => {
               const list = [...this.<%=name%>.<%=list%>]
               if(index !== undefined) {
                 list.splice(index, 1)
               }
               this.<%=name%>.<%=list%> = list
               this.<%=name%>.<%=total%> -= 1;
               return res

            })
        }

      <%}%>

      <%if(item.methodType == 'get'){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
        <%=item.name%>({
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              options }={}
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              options
            ).then(res => {
               this.<%=name%>.model = Object.assign({}, <%=item.ajaxParam%>, res||{})
               return res
            })
        }
      <%}%>


      <%if(item.methodType == 'batch'){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {number[]} [indexes] 源实体在列表的位置索引，如没有indexes，即不删除实体在源列表数据
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
        <%=item.name%>({
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              indexes = [],
              options }={}
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              options
            ).then(res => {
               if(indexes.length > 0) {
                 this.<%=name%>.<%=list%> = this.<%=name%>.<%=list%>.filter((item, index) => !indexes.includes(index))
               }
               this.<%=name%>.<%=total%> -= indexes.length;
               return res
            })
        }

      <%}%>

      <%if(['fetch','get','add','update','remove','batch'].indexOf(item.methodType)==-1){%>
      /**
       * <%=item.title%>
       * @function <%=item.name%>
      <%_.each(item.params, function(param){%>
       * @param {string|number} <%=param%> 请求URL路径参数<%=param%>数据
      <%})%>
       * @param {object} data 请求发送的数据<%=item.ajaxParam%>
       * @param {object} [options] ajax参数选项
       * @returns {Promise} Promise实例
       */
        <%=item.name%>({
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
             options }={}
        ) {
            return <%=item.name%>(
              <%_.each(item.params, function(param){%>
                <%=param%>,
              <%})%>
              <%=item.ajaxParam%>,
              options
            ).then(res => {
               <%if(item.state){%>
                  this.<%=name%>.<%=item.state%> = res
               <%}%>
               return res
            })
        }

      <%}%>

    <%})%>
  }
}
`)
