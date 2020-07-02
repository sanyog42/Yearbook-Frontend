import Vue from "vue";
import Router from "vue-router";
import Register from "./views/Register.vue";
import Login from "./views/Login.vue";
import Reset from "./views/Reset.vue";
import Search from "./views/Search.vue";
import Dp from "./views/Dp.vue";
import Profile from "./views/Profile.vue";
import Edit from "./views/Edit.vue";
import Comments from "./views/Comments.vue";
import NotFound from "./views/404.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "mypage"
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: Login
      }
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: Register
      }
    },
    {
      path: "/reset",
      name: "reset",
      components: {
        default: Reset
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        default: Profile
      },
      meta: {
    	  requiresAuth: true
    	}
    },
    {
      path: "/mypage",
      name: "mypage",
      components: {
        default: Edit
      },
      meta: {
    	  requiresAuth: true
    	}
    },
    {
      path: "/memoirs",
      name: "comments",
      components: {
        default: Comments
      },
      meta: {
    	  requiresAuth: true
    	}
    },
    {
      path: "/search",
      name: "search",
      components: {
        default: Search
      },
      meta: {
    	  requiresAuth: true
    	}
    },
    {
      path: "/dp",
      name: "dp",
      components: {
        default: Dp
      },
      meta: {
    	  requiresAuth: true
    	}
    },
    {
    	path: "*",
    	name: "NotFound",
      components: {
        default: NotFound
      },
      meta: {
    	  global: true
    	}
    },
  ]
});
