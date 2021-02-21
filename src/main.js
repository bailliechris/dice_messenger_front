import Vue from 'vue'
import VueSocketIO from 'vue-socket.io';
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

// Setting up Socket.io
Vue.use(new VueSocketIO({
  debug: true,
  connection: 'http://localhost:3000',
  options: { path: "/socket" } //Optional options
}))


Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
