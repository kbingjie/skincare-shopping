import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


//filters

Vue.filter('snippet', value => {
  if(value.length > 20) {
    return value.slice(0,20) + '...'
  } else {
    return value
  }
})