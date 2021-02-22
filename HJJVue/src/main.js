import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./http";

Vue.prototype.axios = axios;
Vue.config.productionTip = false;
Vue.use(ElementUI);

import L from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  tiledMapLayer
} from '@supermap/iclient-leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");