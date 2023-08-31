/**
 * babel 配置
 * @author chenhuachun
 */
module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  sourceType: 'unambiguous',
  plugins: [
    [
      'component',
      {
        libraryName: 'element-ui',
        styleLibraryName: `~.my/el-themes/${process.env.THEME || 'default'}`
      }
    ],
    [
      'component',
      {
        libraryName: '$ui',
        libDir: 'components',
        styleLibraryName: `~.my/ui-themes/${process.env.THEME || 'default'}`
      },
      '$ui'
    ],
    [
      'component',
      {
        libraryName: '$ui/charts',
        libDir: 'packages',
        style: false
      },
      '$ui/charts'
    ],
    [
      'component',
      {
        libraryName: '$ui/map',
        libDir: 'packages',
        style: false
      },
      '$ui/map'
    ],
    [
      'component',
      {
        libraryName: '$ui/dv',
        libDir: 'packages',
        style: false
      },
      '$ui/dv'
    ]
  ]
}
