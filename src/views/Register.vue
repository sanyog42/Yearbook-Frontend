<template>
    <section class="section section-shaped section-lg my-0" style="padding-top:0;height:100vh">
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
                          <template v-if="level==1">
                              <div class="btn-wrapper text-center">
                                  <img src="img/logo.png" width="300" height="100">
                              </div>
                              <br/>
                              <div class="text-center text-muted mb-4">
                                  <small>Enter your IITK Roll No. to continue</small>
                              </div>
                              <form role="form">
                                  <base-input alternative
                                              v-on:keyup.enter="getData"
                                              v-model="roll"
                                              class="mb-3"
                                              placeholder="IITK Roll No."
                                              addon-left-icon="ni ni-email-83">
                                  </base-input>
                                  <div class="text-center">
                                      <base-button type="primary" class="my-4" @click="getData">Next</base-button>
                                  </div>
                              </form>
                          </template>
                        <template v-if="level==2">
                            <center><p class="h6">Your Email ID for login:<br/></p><p class="h6" style="color:#5e72e4">{{altid}}</p></center>
                            <hr />
                            <div class="text-center text-muted mb-4" style="margin-bottom:0!important">
                                <small>Set up your password</small>
                            </div>
                            <form role="form">
                                <br />
                                <base-input alternative
                                            v-on:keyup.enter="create"
                                            v-if="wrong"
                                            :valid="false"
                                            v-model="pass"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="create"
                                            v-if="!wrong"
                                            v-model="pass"
                                            type="password"
                                            placeholder="Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="create"
                                            v-if="wrong"
                                            :valid="false"
                                            v-model="confpass"
                                            type="password"
                                            placeholder="Confirm Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <base-input alternative
                                            v-on:keyup.enter="create"
                                            v-if="!wrong"
                                            v-model="confpass"
                                            type="password"
                                            placeholder="Confirm Password"
                                            addon-left-icon="ni ni-lock-circle-open">
                                </base-input>
                                <div class="text-muted font-italic">
                                    <small>Password Strength:
                                        <span v-if="scorePassword>=80" class="text-success font-weight-700"> Strong</span>
                                        <span v-if="scorePassword>=60&&scorePassword<80" class="text-warning font-weight-700"> Good</span>
                                        <span v-if="scorePassword>=30&&scorePassword<60" class="text-danger font-weight-700"> Weak</span>
                                        <span v-if="scorePassword<30" class="text-danger font-weight-700"> Very Weak</span>
                                    </small>
                                </div>
                                <div class="text-center">
                                    <base-button type="primary" class="my-4" @click="create">Create account</base-button>
                                </div>
                            </form>
                        </template>
                    </card>
                    <div class="row mt-3">
                        <div class="col-4"></div>
                        <div class="col-6">
                            <a href="#/login" class="text" style="color:#fff">
                                <small>Already Registered?</small>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import axios from 'axios';
import firebase from 'firebase';

export default {
  data(){
    return{
      strength: 0,
      pass: '',
      level: 1,
      altid: '',
      roll: '',
      confpass: '',
      wrong: false
    }
  },
  methods: {
    getData(){
      this.$store.commit('load', true);
      var _this = this;
      axios.post('https://yearbook.iitk.ac.in/getUserForReg', {
        'roll': _this.roll
      })
      .then(response => {
        if(Object.keys(response.data).length){
          _this.altid = response.data.other;
          _this.level = 2
          _this.$store.commit('load', false);
        }else{
          _this.$store.commit('load', false);
          _this.$notify({type: 'error', title: 'Error', text: 'Roll no. not found in Database!'})
        }
      })
      .catch(e => {
        _this.$store.commit('load', false);
        _this.$notify({type: 'error', title: 'Error', text: e.message})
      })
    },
    create(){
      this.$store.commit('load', true);
      if (this.confpass == this.pass){
				var _this = this;
				firebase.auth().createUserWithEmailAndPassword(this.altid, this.pass).then(
				  function(user) {
					  _this.sendEmail();
				  },
				  function(err) {
            _this.$store.commit('load', false);
            _this.$notify({type: 'error', title: 'Error', text: error.message})
				  }
				);
			}else{
        this.$store.commit('load', false);
        this.$notify({type: 'error', title: 'Error', text: 'Password re-entered is different!'})
				this.wrong = true;
			}
    },
    sendEmail() {
  		var user = firebase.auth().currentUser;
  		var _this = this;
  		user.sendEmailVerification().then(function() {
        _this.$notify({type: 'success', title: 'Success', text: 'Verification email sent to ' + _this.altid + '. Please check your mail.'})
  		}).catch(function(error) {
  		  _this.$notify({type: 'error', title: 'Error', text: error.message})
  		});
  		firebase.auth().signOut().then(() => {
  		  _this.$router.replace('login');
  		});
	  }
  },
  computed: {
    scorePassword() {
      var pass = this.pass;
      var score = 0;
      if (!pass)
          return score;

      var letters = new Object();
      for (var i=0; i<pass.length; i++) {
          letters[pass[i]] = (letters[pass[i]] || 0) + 1;
          score += 5.0 / letters[pass[i]];
      }

      var variations = {
          digits: /\d/.test(pass),
          lower: /[a-z]/.test(pass),
          upper: /[A-Z]/.test(pass),
          nonWords: /\W/.test(pass),
      }

      var variationCount = 0;
      for (var check in variations) {
          variationCount += (variations[check] == true) ? 1 : 0;
      }
      score += (variationCount - 1) * 10;

      return parseInt(score);
    },
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
