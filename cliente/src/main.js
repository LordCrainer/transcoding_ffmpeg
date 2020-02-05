import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueSocketIO from "vue-socket.io";
import io from "socket.io-client";
//const url = { path: "/videos/" };
//export const SocketInstance = socket("http://localhost:3000");
Vue.config.productionTip = false;
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: io("http://localhost:3000")
  })
);
//Vue.use(VueSocketIO, SocketInstance);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
