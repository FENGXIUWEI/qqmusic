// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
/* 此组件可以使用es6 进行开发 */
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'

import '@/common/stylus/index.styl'

Vue.config.productionTip = false

/* 此组件是解决click 300 ms 延迟的问题 */
fastclick.attach(document.body)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
