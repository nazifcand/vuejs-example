import state from './state.js';
import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';
import { createStore } from 'vuex'

export default createStore({
  state,
  mutations,
  actions,
  getters
})
