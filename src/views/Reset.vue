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
                            <div class="text-center text-muted mb-4">
                                <small>Enter your registered email to reset your password</small>
                            </div>
                            <form role="form">
                                <base-input alternative
                                          v-on:keyup.enter="reset"
                                          v-if="wrong"
                                          :valid="false"
                                          v-model="email"
                                          class="mb-3"
                                          placeholder="Email"
                                          addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="reset"
                                            v-if="!wrong"
                                            v-model="email"
                                            class="mb-3"
                                            placeholder="Email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="reset"
                                            v-if="wrong"
                                            :valid="false"
                                            v-model="confemail"
                                            class="mb-3"
                                            placeholder="Confirm Email"
                                            addon-left-icon="ni ni-email-83">
                                </base-input>
                                  <base-input alternative
                                              v-on:keyup.enter="reset"
                                              v-if="!wrong"
                                              v-model="confemail"
                                              class="mb-3"
                                              placeholder="Confirm Email"
                                              addon-left-icon="ni ni-email-83">
                                  </base-input>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="reset">Reset Password</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-6">
                            <a href="#/login" class="text" style="color:#fff">
                                <small>Remember your password?</small>
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
import firebase from 'firebase';

export default {
  data(){
    return{
      wrong: false,
      email: '',
      confemail: ''
    }
  },
  methods: {
    reset(){
      if (this.email.trim().length == 0 || this.confemail.trim().length == 0) {
        _this.$notify({type: 'error', title: 'Error', text: 'All fields are necessary!'})
        this.wrong=true;
  		  return;
  		}
      if(this.confemail == this.email) {
		    var _this = this;
		    firebase.auth().sendPasswordResetEmail(_this.email).then(function() {
          _this.$notify({type: 'success', title: 'Success', text: 'Email for Password reset sent'})
          _this.$router.replace('login');
		    }).catch(function(error) {
		      _this.$notify({type: 'error', title: 'Error', text: error.message});
		    });
		  } else {
        _this.$notify({type: 'error', title: 'Error', text: 'Email re-entered is different!'})
		    this.wrong=true;
		  }
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
