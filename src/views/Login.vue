<template>
    <section class="section section-shaped section-lg my-0" style="padding-top:0;height:100vh">
      <div style="z-index:5;width:100%;top:5px;position:absolute;">
        <div class="alert alert-primary" style="margin-bottom:5px" role="alert">
          <center>
          For any issue/query please contact via Whatsapp @ 8130717605. Call only for urgent issues.
          </center>
        </div>
      </div>
        <LazyVideoAsGIF :src="'img/back.mp4'" id="myVideo"/>
        <div class="shape shape-style-1 bg-gradient-default">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="container pt-lg-md">
            <div class="row justify-content-center">
                <div class="col-lg-5">
                    <card type="secondary" shadow
                          header-classes="bg-white pb-5"
                          body-classes="px-lg-5 py-lg-5"
                          class="border-0">
                        <template>
                            <div class="btn-wrapper text-center">
                                <img src="img/logo.png" width="300" height="100">
                            </div>
                            <br/>
                        </template>
                        <template>
                            <form role="form">
                              <base-input alternative
                                          v-on:keyup.enter="signIn"
                                          v-if="wrong"
                                          :valid="false"
                                          v-model="email"
                                          class="mb-3"
                                          placeholder="Email"
                                          addon-left-icon="ni ni-email-83">
                              </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="signIn"
                                            v-if="!wrong"
                                            v-model="email"
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="signIn"
                                            v-if="wrong"
                                            :valid="false"
                                            v-model="password"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="signIn"
                                            v-if="!wrong"
                                            v-model="password"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-checkbox v-model="remember">
                                    Remember me
                                </base-checkbox>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="signIn">Sign In</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#/reset" class="text" style="color:#fff">
                                <small>Forgot password?</small>
                            </a>
                        </div>
                        <div class="col-6 text-right">
                            <a href="#/signup" class="text" style="color:#fff">
                                <small>Create new account</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import firebase from "firebase";
import axios from "axios";

export default {
  data(){
    return{
      remember: true,
		  email: '',
		  password: '',
      wrong: false,
      data: {},
      defaults: [
        'img/ikan.jpg',
        'img/3.jpg',
        'img/2.jpg',
        'img/1.jpg',
      ],
    }
  },
  methods: {
    signIn: function() {
      this.$store.commit('load', true);
      if (!this.remember) {
  			firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION).then(function() {}).catch(function(error){
  				console.log("Failed to set persistence: " + error.message)
  			});
		  }
      var _this = this;
  		firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
  		  function(user) {
          _this.checkEmail();
  		  },
  		  function(err) {
          _this.$notify({type: 'error', title: 'Error', text: 'Invalid email or password!'})
  			  _this.wrong = true;
          _this.$store.commit('load', false);
  		  }
  		);
  	},
  	checkEmail: function() {
      var user = firebase.auth().currentUser;
  		var _this = this;
  		if (!user.emailVerified) {
        _this.$notify({type: 'error', title: 'Error', text: 'Your Email has not yet been verified!'})
  		  user.sendEmailVerification().then(function() {
          _this.$notify({type: 'success', title: 'Success', text: 'Verification Email Sent Once More!'})
  		  });
  		  firebase.auth().signOut().then(() => {});
        this.$store.commit('load', false);
  		} else {
        this.getUser(user.email);
  		}
  	},
    getUser(userEmail){
      var _this = this;
      axios.post(_this.$store.state.server + '/userByEmail', {
        'email': userEmail,
        'apiKey': firebase.auth().currentUser.displayName,
        'username': userEmail.replace(/@.+/gm, "")
      })
      .then(response => {
        if(Object.keys(response.data).length){
          _this.data = response.data[0];
          const len = _this.data.pic.length;
          for(var i = 0; i < (4-len); i++){
            _this.data.pic.unshift(_this.defaults[i])
          }
          _this.$store.commit('loadData', _this.data);
          _this.$store.commit('setkey', firebase.auth().currentUser.displayName);
          if(_this.$route.query.from == '/profile'){
            _this.$router.replace({name: 'profile', query: _this.$route.query.q});
          } else {
            _this.$router.replace('mypage');
          }
        }else{
          _this.$notify({type: 'error', title: 'Error', text: 'Email not found in Database!'})
          firebase.auth().signOut().then(() => {});
          _this.$store.commit('load', false);
        }
      })
      .catch(e => {
        _this.$notify({type: 'error', title: 'Error', text: e.message});
        firebase.auth().signOut().then(() => {});
        _this.$store.commit('load', false);
      })
    }
  }
};
</script>
<style>
#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}
</style>
