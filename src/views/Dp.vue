<template>
  <div class="profile-page">
    <section class="section section-shaped section-lg my-0" style="padding-top:150px">
        <div class="shape shape-style-1 bg-gradient-default" style="position:fixed;height:100vh">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
        </div>
      <section class="section section-skew">
          <div class="container" style="max-width:800px">
              <card shadow class="card-profile" no-body>
                  <div class="px-4">
                      <div class="row justify-content-center">
                          <div class="col-lg-8 order-lg-1">
                              <div class="text-center">
                                  <div>
                                      <br />
                                      <p class="h5">Select the image you want to set as your DP...</p>
                                      <br />
                                  </div>
                              </div>
                          </div>
                      </div>
                      <hr style="margin-top:0"/>
                      <div class="row">
                        <div style="width:45%;margin:2.5%" v-for="i in Array.from(Array($store.state.data.pic.length).keys())" >
                          <a @click="updateDp(i)" href="javascript:void(0)">
                          <card shadow>
                            <img :src="$store.state.data.pic[i]" height="100%" width="100%">
                            <br/><br/>
                          </card>
                          </a>
                        </div>
                      </div>
                      <br/>
                  </div>
              </card>
          </div>
      </section>
    </section>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  methods: {
    updateDp: function(idx){
      this.$store.commit('load', true);
      var _this = this;
      axios.post('https://yearbook.iitk.ac.in/dp', {
        'roll': _this.$store.state.data.roll,
        'dp': idx,
        'apiKey': _this.$store.state.key,
        'username': _this.$store.state.data.other.replace(/@.+/gm, "")
      })
      .then(response => {
        if(response.status == 200){
          _this.$notify({type: 'success', title: 'Success', text: 'DP updated successfully'})
          _this.$router.replace('mypage');
        }else{
          _this.$notify({type: 'error', title: 'Error', text: 'Error updating DP, please try again!'})
          _this.$store.commit('load', false);
        }
      })
      .catch(e => {
        _this.$notify({type: 'error', title: 'Error', text: e.message});
        _this.$store.commit('load', false);
      })
    },
  }
};
</script>
<style>
</style>
