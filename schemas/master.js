module.exports = {
  model: [{ // 应用
    path: '/qn_system/app',
    module: 'app',
    prefix: 'API_HOST'
  },
  { // 简化----不用每一个接口（除了自动生成的crud接口外的接口，都来这里再写一个进行生成）
    path: '/qn_system/:name/:action',
    prefix: 'SYSTEM_HOST',
    methods: false,
    name: 'fetchAction',
    options: {
      method: 'get'
    }
  }, {
    path: '/qn_system/:name/:action',
    prefix: 'SYSTEM_HOST',
    methods: false,
    name: 'submitAction',
    options: {
      method: 'post'
    }
  }]

}
