import Vue from 'vue'        //引入vue
import App from './App.vue'   //引入APP实例
import './registerServiceWorker'  
import router from './router'   //引入路由
import store from './store'     //引入vuex
import "@/styles/index.scss"    //引入全局样式
import "@/utils/allcom.js"      //引入全局组件
import "@/utils/vant.js"         //引入vant
import {axios} from "@/utils/axios.js"   //引入axios
Vue.prototype.$axios = axios

Vue.config.productionTip = false


new Vue({
  router,    //挂载路由
  store,    //挂载vuex
  render: h => h(App)   //渲染虚拟DOM
}).$mount('#app')    //将虚拟DOM挂载到id为app的元素中
