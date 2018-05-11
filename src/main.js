import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueMaterial from "vue-material";
import "vue-material/dist/vue-material.min.css";
import 'vue-material/dist/theme/default-dark.css'

import OsService from "./services/OsService";
import FirebaseService from "./services/FirebaseService";
import TransService from "./services/TransService";

Vue.use(OsService);
Vue.use(FirebaseService);
Vue.use(TransService);
Vue.use(VueMaterial);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");