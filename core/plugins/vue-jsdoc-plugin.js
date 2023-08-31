const compiler = require('vue-template-compiler')

exports.handlers = {
  // 利用 vue-template-compiler 编译 vue 模板
  beforeParse: function (e) {
    if (/\.vue$/.test(e.filename)) {
      const output = compiler.parseComponent(e.source);
      e.source = output.script ? output.script.content : '';
    }
  }
}
