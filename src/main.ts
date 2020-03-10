import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Navigation from 'vue-navigation'

import 'vant/lib/index.css'
import {
  Button,

} from 'vant'


Vue.config.productionTip = false

Vue.use(Navigation, {router})

Vue.use(Button)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

