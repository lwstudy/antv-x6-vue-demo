const coder = require('../build/coder')

module.exports = function (args) {
  const force = !!args[0]
  coder(force)
  
}
