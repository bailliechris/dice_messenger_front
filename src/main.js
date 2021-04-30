import Vue from 'vue'
//import VueSocketIO from 'vue-socket.io'
//import * as io from 'socket.io-client'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.config.productionTip = false

/*
Vue.use(new VueSocketIO({
  debug: false,
  connection: 'http://localhost:3000',
  options: { path: "/" } //Optional options
}))
*/

//Vue.use(VueSocketIO, io('http://localhost:3000'))

Vue.use(Buefy)

new Vue({
  render: h => h(App),
}).$mount('#app')
