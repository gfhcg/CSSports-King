
// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import wLoading from "./components/w-loading/w-loading.vue"
import BASE_URL from '../计院体育君/App.vue'
Vue.prototype.$BASE_URL = BASE_URL
Vue.config.productionTip = false

App.mpType = 'app'
//全局注入w-loading
Vue.component('w-loading',wLoading)
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif