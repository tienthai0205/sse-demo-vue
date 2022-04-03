import Vue from 'vue'
import App from './App.vue'
import VueSSE from 'vue-sse';
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueSSE);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
