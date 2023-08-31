/**
 * Element 主题打包 webpack 配置文件
 *
 * @author chenhuachun
 */
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin')
const utils = require('../utils')
const core = require('../index')

module.exports = function (theme, entry, outDir) {
  return {
    mode: 'production',
    entry: entry,
    output: {
      filename: '[name].js',
      path: utils.join(outDir, theme.name, 'build')
    },
    resolve: {
      alias: {
        '@': utils.join(core.ProjectRootPath, 'src'),
        $ui: core.LibPath,
        $my: core.TempPath
      }
    },
    module: {
      rules: [
        {
          test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/i,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 4096,
                fallback: {
                  loader: 'file-loader',
                  options: {
                    name: '../fonts/[name].[ext]'
                  }
                }
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: false,
                publicPath: 'fonts/'
              }
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: false
              }
            },
            {
              loader: core.ThemeVarScssLoaderPath,
              options: {
                vars: utils.join(core.ProjectThemeVarPath, theme.file)
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '../[name].css'
      }),
      new OptimizeCssnanoPlugin(
        {
          sourceMap: false,
          cssnanoOptions: {
            preset: [
              'default',
              {
                mergeLonghand: false,
                cssDeclarationSorter: false
              }
            ]
          }
        }
      )
    ]
  }
}
