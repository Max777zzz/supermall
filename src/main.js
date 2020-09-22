import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import toast from 'components/common/toast'
// 安装 toast 插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用懒加载插件
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')