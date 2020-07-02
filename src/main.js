import Vue from "vue";
import Notifications from 'vue-notification';
import App from "./App.vue";
import router from "./router";
import Argon from "./plugins/argon-kit";
import './registerServiceWorker';
import store from "./store";
import firebase from 'firebase';
import VueLazyLoadVideo from 'vue-lazyload-video';

Vue.config.productionTip = false;
Vue.use(Argon);
Vue.use(Notifications);
Vue.use(VueLazyLoadVideo);

let app = '';

const firebaseConfig = {
  apiKey: "AIzaSyDHJ_mVwyZo3S6BOkpoy9Pdg-ynZkqG-xc",
  authDomain: "yearbook-snt.firebaseapp.com",
  databaseURL: "https://yearbook-snt.firebaseio.com",
  projectId: "yearbook-snt",
  storageBucket: "yearbook-snt.appspot.com",
  messagingSenderId: "409706521361",
  appId: "1:409706521361:web:0c60d632fbfaef517ce2b0",
  measurementId: "G-W7MSXHTF35"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings({
	cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED
});
firebase.firestore().enablePersistence();

firebase.auth().onAuthStateChanged (() => {
  if (!app) {
	app = new Vue({
    store,
    router,
    render: h => h(App)
  }).$mount("#app");
  }
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isGlobal = to.matched.some(record => record.meta.global);
  if (requiresAuth && !currentUser) next({name: 'login', query: {from: to.path, q: to.query}});
  else if (isGlobal) next();
  else if (!requiresAuth && currentUser) next('mypage');
  else {
	   next()
  }
});

router.afterEach((to, from, next) => {
  store.commit('load', false)
});
