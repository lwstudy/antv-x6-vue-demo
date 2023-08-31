/**
 * 应用功能增强预设
 */
import Vue from 'vue'
import Router from 'vue-router'
import Vuex from 'vuex'
import progress from 'nprogress'
import {Loading, MessageBox, Notification, Message} from 'element-ui'
import InfiniteScroll from 'element-ui/lib/infinite-scroll'
import axios from '$ui/utils/axios'
import {create} from '$ui/utils/log'
import access from '$ui/access'


Vue.config.productionTip = false
Vue.use(Router)
Vue.use(Vuex)
Vue.use(access)
Vue.use(InfiniteScroll);
Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$axios = axios;

// // 打印日志方法
Vue.prototype.$log = create()

progress.configure({
  showSpinner: false
})
// 进度条自动每次递增20%
progress.inc(0.2)


const Access = access.Access

export {
  Vue,
  Vuex,
  Router,
  progress,
  Access
}
