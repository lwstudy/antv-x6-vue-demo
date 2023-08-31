const utils = require('./utils')

// 检查当前是否安装模式，false表示开发模式
const IsInstalled = utils.urlFormat(__dirname).includes('node_modules/@xdh/my')

// My库所在的绝对路径位置
const MyRootPath = utils.resolve('./')

// 项目工程根目录
const ProjectRootPath = IsInstalled ? process.cwd() : MyRootPath

// UI 所在绝对路径位置
const UIPath = utils.join(MyRootPath, 'ui')

// lib 所在绝对路径位置
const LibPath = utils.join(MyRootPath, 'ui/lib')

// core 所在绝对路径位置
const CorePath = utils.join(MyRootPath, 'core')


// 临时文件存放绝对路径, 临时目录在工程下
const TempPath = utils.join(ProjectRootPath, '.my')

// 调色板scss变量文件位置
const ColorsVarFilePath = utils.join(LibPath, 'styles/common/_colors.scss')

// 代码生成器输出目录
const OutputCodePath = utils.join(TempPath, 'code')

// 代码生成器配置文件目录
const SchemasPath = utils.join(ProjectRootPath, 'schemas')

// SVG文件源文件目录
const SVGSrcPath = utils.join(ProjectRootPath, 'svg')

// SVG转成Vue组件存放目录
const SVGIconPath = utils.join(LibPath, 'icons')

// ElementUI 主题编译后存放目录
const OutputElementThemePath = utils.join(TempPath, 'el-themes')

// UI 主题编译后存放目录
const OutputUIThemePath = utils.join(TempPath, 'ui-themes')

// 编译项目主题时产生的临时文件存放路径
const BuildThemeDistPath = utils.join(TempPath, 'dist')

// 工程的主题配置SCSS文件夹路径
const ProjectThemeVarPath = utils.join(ProjectRootPath, 'src/style/themes')

const ThemeVarScssLoaderPath = utils.join(MyRootPath, 'core/loaders/theme-var-scss-loader.js')

// ElementUI样式源码目录
const ElementThemeSrcPath = utils.join(ProjectRootPath, 'node_modules/element-ui/packages/theme-chalk/src')

// UI主题源码目录
const UIThemeSrcPath = utils.join(LibPath, 'styles')

// 组件自动注册加载器loader
const ComponentLoaderPath = utils.join(MyRootPath, 'core/loaders/component-loader.js')

// 工程项目视图目录
const ViewsPath = utils.join(ProjectRootPath, 'src/views')

// 输入路由配置文件位置
const OutputRoutesFile = utils.join(TempPath, 'routes/index.js')

// 开发环境切换主题http服务接口路径
const DevThemeSwitchServiceApi = '/my/dev-theme-switch-service'

// 项目主题入口文件，显示什么样的主题由该文件决定
const ProjectThemeScssFile = utils.join(ProjectRootPath, 'src/style/vars/_theme.scss')

// 预打包生产环境的主题文件存放目录
const ProductionThemesCompiledPath = utils.join(TempPath, 'compiled')

// 备份项目主题配置文件存放位置
const BackupLocalThemesFile = utils.join(TempPath, '_theme.scss')

// 文档Markdown文件抽取的demo组件存放位置
const DocsTempDemoPath = utils.join(TempPath, 'demo')

// 文档工程目录位置
const DocsPath = utils.join(MyRootPath, 'docs')

// babel 配置文件
const BabelConfigFile = utils.join(MyRootPath, 'core/babel.config.js')

// Bridge入口文件位置
const BridgeEntry = utils.join(MyRootPath, 'core/build/bridge-entry.js')

// Bridge类库入口文件位置
const BridgeLibEnter = utils.join(LibPath, 'utils/bridge.js')

// apps目录
const AppsPath = utils.join(ProjectRootPath, 'apps')

// app名称保留关键字
const AppReservedWords = ['docs']

// app模板目录
const AppTemplatePath = utils.join(MyRootPath, 'core/templates/app')

module.exports = {
  IsInstalled,
  MyRootPath,
  ProjectRootPath,
  UIPath,
  LibPath,
  CorePath,
  TempPath,
  ColorsVarFilePath,
  OutputCodePath,
  SchemasPath,
  SVGSrcPath,
  SVGIconPath,
  OutputElementThemePath,
  OutputUIThemePath,
  ProjectThemeVarPath,
  ThemeVarScssLoaderPath,
  ElementThemeSrcPath,
  UIThemeSrcPath,
  ComponentLoaderPath,
  ViewsPath,
  OutputRoutesFile,
  DevThemeSwitchServiceApi,
  ProjectThemeScssFile,
  ProductionThemesCompiledPath,
  BackupLocalThemesFile,
  DocsTempDemoPath,
  DocsPath,
  BabelConfigFile,
  BridgeEntry,
  BridgeLibEnter,
  AppsPath,
  AppReservedWords,
  AppTemplatePath,
  BuildThemeDistPath
}

