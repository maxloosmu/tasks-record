import { createStore } from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

const store = createStore({
  state() {
    return {
      userId: null,
      token: null,
      error: null,
      response: null,
      mode: "login",
      name: "",
      email: "",
      password: "",
    };
  },
  mutations,
  actions,
  getters,
});

export default store;