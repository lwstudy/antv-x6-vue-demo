module.exports = {
  vuex: false,
  model: [
    {
      path: '/api/slim-clue',
      columns: {
        id: '@id',
        guid: '@guid',
        sex: '@integer(0,1)',
        name: '@cname',
        email: '@email',
        phone: '@integer(10000000, 99999999)',
        'age|10-100': 1,
        date: '@date(yyyy-MM-dd)',
        title: '@cparagraph(1)',
        info: '@cparagraph(3,7)',
        avatar: '@dataImage',
        province: '@province',
        city: '@city',
        county: '@county(true)',
        zip: '@zip',
        state: '@integer(0,5)',
        'label|1': ['黄', '毒', '赌', '逃', '前科'],
        'tags|2-7': ['@cword(2,4)'],
        views: '@integer(10,9000)',
        shares: '@integer(10,9000)',
        comments: '@integer(10,9000)',
        created: '@datetime',
        ip: '@ip'
      }
    }
  ]
}