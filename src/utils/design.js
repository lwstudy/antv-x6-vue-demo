// TODO:外部js使用vue实例设计
function testVueThis(that) {
  console.log('tool', that, that.type, that.modelId);
}

// 全局加载---覆盖弹窗
function onLoading(that) {
  return that.$loading({
    lock: true,
    text: '正在加载中...',
    spinner: 'el-icon-right',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}

function toggle(ele, that, exitFullScreen, fullScreen) {
  if (that.isFullScreen) {
    exitFullScreen()
    that.isFullScreen = false
  } else {
    fullScreen(document.getElementById(ele))
    that.isFullScreen = true
  }
}

function toggleClass(ele, that, exitFullScreen, fullScreen) {
  if (that.isFullScreen) {
    exitFullScreen()
    that.isFullScreen = false
  } else {
    fullScreen(document.getElementsByClassName(ele))
    that.isFullScreen = true
  }
}

export default {
  testVueThis,
  onLoading,
  toggle,
  toggleClass
}
