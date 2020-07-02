<template>
  <div class="profile-page" :key="$route.query.q">
    <div style="z-index:5;width:100%;top:10px;position:absolute;">
    <center>
      <div class="row" style="width:350px">
        <a href="#/mypage"><base-button style="height:46px;width:50px;padding:10px;margin:0" type="secondary" icon="ni ni-circle-08"></base-button></a>
        <base-input v-on:keyup.enter="sear" v-model="search" style="height:46px;width:240px;margin-right:5px;margin-left:5px" placeholder="Search by name or roll no."></base-input>
        <base-button @click="sear" style="height:46px;width:50px;padding:10px" type="primary" icon="ni ni-zoom-split-in"></base-button>
      </div>
    </center>
    </div>
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
                          <div class="col-lg-4 order-lg-1">
                              <div class="card-profile-stats d-flex justify-content-center">
                                  <div>
                                      <span class="heading">{{this.res.length}}</span>
                                      <span class="description">Results</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <hr style="margin-top:0"/>
                      <p v-if="res.length==0" class="h2 text-center" style="color:#5e72e4">No results found...</p>
                      <div class="row">
                        <div style="width:45%;margin:2.5%" v-for="i in res" >
                          <a :href="'#/profile?roll='+i.roll">
                          <card shadow>
                            <div :style="{'height':'0','width':'100%','padding-bottom':'100%','background-image': 'url('+i.dp+')','background-position': 'center','background-size': 'cover'}">
                            </div>
                            <br/><br/>
                            <p class="h5 text-center" style="color:#5e72e4">{{i.name}}</p>
                            <p class="h6 text-center" style="color:#5e72e4">{{i.roll}}</p>
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
  data() {
    return {
      search: '',
      results: [],
      defaults: [
        'img/ikan.jpg',
        'img/3.jpg',
        'img/2.jpg',
        'img/1.jpg',
      ],
    }
  },
  mounted() {
    if(this.$route.query.q.length >= 4){
      this.getData();
    } else {
      this.$notify({type: 'error', title: 'Error', text: 'Roll no. should be of atleast 4 characters!'})
    }
  },
  methods: {
    sear: function(){
      if(this.search.length>=4){
        window.open("#/search?q="+this.search,"_self")
      }else{
        this.$notify({type: 'error', title: 'Error', text: 'Query should be of atleast 4 characters!'})
      }
    },
    getData: function(){
      this.results.length = 0;
      this.$store.commit('load', true);
      var _this = this;
      axios.post('https://yearbook.iitk.ac.in/search', {
        'query': _this.$route.query.q,
        'apiKey': _this.$store.state.key,
        'username': _this.$store.state.data.other.replace(/@.+/gm, "")
      })
      .then(response => {
        if(response.data!='Invalid!' && !response.data.remark){
          if(Object.keys(response.data).length){
            for(var i in response.data){
              var x = {};
              if(response.data[i].dp===null || response.data[i].dp==-1){
                x = {name: response.data[i].name, roll: response.data[i].roll, dp: "img/user.png"};
              }else{
                const len = response.data[i].pic.length;
                for(var j = 0; j < (4-len); j++){
                  response.data[i].pic.unshift(_this.defaults[j]);
                }
                x = {name: response.data[i].name, roll: response.data[i].roll, dp: response.data[i].pic[response.data[i].dp]};
              }
              _this.results.push(x);
            }
            _this.$store.commit('load', false);
          }else{
            _this.$store.commit('load', false);
          }
        }else{
          _this.$store.commit('load', false);
        }
      })
      .catch(e => {
        _this.$store.commit('load', false);
        _this.$notify({type: 'error', title: 'Error', text: e.message})
      })
    }
  },
  computed: {
    res: function(){
      return this.results
    }
  },
  watch: {
    $route: function(){
      this.getData();
    }
  }
};
</script>
<style>
</style>
