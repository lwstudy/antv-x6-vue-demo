module.exports = file => () => import('$apps/' + process.env.APP + '/views/' + file + '.vue')
