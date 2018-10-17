import Vue from 'vue';
import Vuex from 'vuex';
import Logger from 'vuex/dist/logger';

import index from './module/index';
import detail from "./module/detail";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    index,
    detail
  },
  plugins: [Logger()]
})