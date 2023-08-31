module.exports = function () {
  const builder = require('../build/jsdoc-builder')
  builder('utils')
  builder('components')
  builder('map')
  builder('charts')
  builder('dv')
}
