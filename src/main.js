import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import axios from 'axios'

// 创建axios实例
Vue.prototype.$http = axios.create({
  // 指定接口根地址，即后端接口的根地址
  baseURL: 'http://localhost:3001/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
