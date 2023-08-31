const builder = require('../build/theme')


module.exports = function (args) {
  const type = args[0]
  switch (type) {
    case 'el':
    case 'ui':
      builder(type, (stats, ret) => {
        if (!ret) {
          console.log(stats.toString({
            chunks: false,
            colors: true
          }))
        }
      })
      break;
    case 'prod':
      require('../build/prod-theme-builder')(args[1])
      break;
    default:
      ['el', 'ui'].forEach(t => {
        builder(t, (stats, ret) => {
          if (!ret) {
            console.log(stats.toString({
              chunks: false,
              colors: true
            }))
          }
        })
      })
      break
  }
  
}
