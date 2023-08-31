/**
 * 工程生产环境 webpack 配置
 *
 * @author chenhhuachun
 */
const AutoDllPlugin = require('autodll-webpack-plugin')
const ThemeSwitchForCompilePlugin = require('../plugins/theme-switch-for-compile-plugin')
const CopyThemeAfterCompiledPlugin = require('../plugins/copy-theme-after-compiled-plugin')
const HtmlInjectThemePlugin = require('../plugins/html-inject-theme-plugin')
const config = require('../config')()
const utils = require('../utils')
const core = require('../index')

module.exports = function (chain, theme, app) {

  // 移除 prefetch 插件
  if (!config.prefetch) {
    chain.plugins.delete('prefetch')
  }

  // 合并css文件、vue组件style
  chain.optimization.splitChunks({
    cacheGroups: {
      style: {
        name: 'style',
        test(module, chunks) {
          const r = module.resource || '', t = module.type
          // 合并 css、scss、vue文件的style
          return r.includes('.scss') || r.includes('.css') || t.includes('css')
        },
        chunks: 'all',
        enforce: true
      }
    }
  })

  // 独立打包基础公共文件
  chain.plugin('dll').use(AutoDllPlugin, [{
    inject: true,
    debug: true,
    filename: '[name]_[hash:8].js',
    path: utils.urlFormat(utils.join(config.assetsDir, 'js')),
    entry: {
      vendor: config.dll
    }
  }])

  // 抽取css到独立文件
  chain.plugin('extract-css').tap(args => {
    return [
      {
        filename: `assets/css/${theme}-[name].[contenthash:8].css`,
        chunkFilename: `assets/css/${theme}-[name].[contenthash:8].css`,
        // 忽略css引用顺序导致的警告
        ignoreOrder: true
      }
    ]
  })

  // 修改主题，指定要打包的主题
  chain.plugin('ThemeSwitchForCompilePlugin').use(ThemeSwitchForCompilePlugin, [{
    theme: theme,
    src: core.ProjectThemeScssFile
  }])

  if (theme === 'default') {
    let toPath = utils.join(core.ProjectRootPath, config.outputDir, config.publicPath, config.assetsDir, 'css')
    let themePath = utils.join(config.publicPath, config.assetsDir, 'css')

    if (app) {
      toPath = utils.join(
        core.ProjectRootPath,
        config.outputDir,
        config.publicPath,
        app.outputDir || app.name,
        app.publicPath || '',
        config.assetsDir,
        'css')

      themePath = utils.join(config.publicPath, app.publicPath || app.name, config.assetsDir, 'css')

    }

    // 默认主题打包完成后，复制已编译好的主题放入css目录
    chain.plugin('CopyThemeAfterCompiledPlugin').use(CopyThemeAfterCompiledPlugin, [{
      from: core.ProductionThemesCompiledPath,
      to: toPath
    }])

    // 注入主题theme.js描述文件
    chain.plugin('HtmlInjectThemePlugin').use(HtmlInjectThemePlugin, [{
      tempDir: core.ProductionThemesCompiledPath,
      path: themePath,
      appName: app ? app.name : null,
      savePath: app
        ? utils.join(core.ProjectRootPath, config.outputDir, config.publicPath, app.outputDir || app.name, app.publicPath || '')
        : utils.join(core.ProjectRootPath, config.outputDir, config.publicPath),
      baseUrl: app
        ? utils.join('/', config.publicPath, app.outputDir || app.name, app.publicPath || '')
        : utils.join('/', config.publicPath)
    }])

  }


  // 把样式引用的图片地址改成绝对路径
  const ruleArray = ['css', 'postcss', 'scss', 'less', 'sass', 'stylus']
  const oneOfArray = ['vue-modules', 'vue', 'normal-modules', 'normal']
  const assetsPath = app
    ? utils.join('/', config.publicPath, app.outputDir || app.name, app.publicPath || '')
    : utils.join('/', config.publicPath)
  ruleArray.forEach(rule => {
    oneOfArray.forEach(one => {
      chain.module.rule(rule).oneOf(one).use('extract-css-loader').tap(opts => {
        opts.publicPath = utils.urlFormat(assetsPath)
        return opts
      })
    })
  })

}
