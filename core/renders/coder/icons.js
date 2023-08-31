const _ = require('lodash')

module.exports = _.template(`
/**
 *  icons
 *  @module $my/code/icons
 *  @author coder
 */

export const elIcons = <%=elItems%>;

export const myIcons = <%=items%>

export default {elIcons, myIcons}

`)
