import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import * as getters from './getters';
import state from './state';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';
console.info('index.js');
console.info(getters);
export default new Vuex.Store({
  state,
  mutations,
  getters,
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
