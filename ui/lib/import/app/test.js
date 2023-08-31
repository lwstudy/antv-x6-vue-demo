// vue-loader at least v13.0.0+
module.exports = file => require('$apps/' + process.env.APP + '/views/' + file + '.vue').default
