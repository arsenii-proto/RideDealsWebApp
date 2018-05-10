import Vue from 'vue'
import App from './App.vue'
import router from "./router";
import OsService from "./services/OsService";
import Firebase from "./services/Firebase";

Vue.use( OsService )
Vue.use( Firebase )

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
