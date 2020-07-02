import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
		reducer: state => ({
      data: state.data,
      key: state.key
		})
  })],
	state: {
		loading: false,
    data: {},
    key: ''
	},
	getters: {},
	mutations: {
		load (state, payload) {
			state.loading = payload;
		},
    loadData (state, payload) {
      state.data = payload;
    },
    update (state, payload) {
      var x = state.data;
      for (var y in x.comments){
        if (payload.id == x.comments[y]['_id']){
          x.comments[y]['visibility'] = payload.vis;
          break;
        }
      }
      state.data = x;
    },
    setkey (state, payload) {
      state.key = payload;
    }
	},
	actions: {}
});
