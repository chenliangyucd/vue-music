import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from '@/router';
import store from './store';
import VueLazyload from 'vue-lazyload';
import fastclick from 'fastclick';

Vue.config.productionTip = false;
Vue.use(VueLazyload, {
  preLoad: 1.3,
  attempt: 1
});
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});
