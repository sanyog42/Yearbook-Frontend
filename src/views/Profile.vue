<template>
    <div class="profile-page" style="min-height:100vh" :key="$route.query.roll">
      <div style="z-index:5;width:100%;top:10px;position:absolute;">
      <center>
        <div class="row" style="width:350px">
          <a href="#/mypage"><base-button style="height:46px;width:50px;padding:10px;margin:0" type="secondary" icon="ni ni-circle-08"></base-button></a>
          <base-input v-on:keyup.enter="sear" v-model="search" style="height:46px;width:240px;margin-right:5px;margin-left:5px" placeholder="Search by name or roll no."></base-input>
          <base-button @click="sear" style="height:46px;width:50px;padding:10px" type="primary" icon="ni ni-zoom-split-in"></base-button>
        </div>
      </center>
      </div>
        <div style="position:absolute;filter:blur(2px);background-attachment:fixed;background-image: url('img/y16.jpg');padding-top:28%;width:100%;background-size:contain">
        </div>
        <section class="section-profile-cover section-shaped my-0">
          <div style="padding-top:28%">
          </div>
          <div id="stick" style="filter: blur(2px);border-top-style: solid;border-bottom-style: solid;border-color: white;">
            <div :style="{'position':'absolute','margin-right':'50%','background-image': 'url(' + data.pic[0] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
            <div :style="{'position':'absolute','margin-left':'50%','background-image': 'url(' + data.pic[1] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
            <div :style="{'position':'absolute','margin-top':'50vh','margin-right':'50%','background-image': 'url(' + data.pic[2] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
            <div :style="{'position':'absolute','margin-top':'50vh','margin-left':'50%','background-image': 'url(' + data.pic[3] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
          </div>
        </section>
        <section class="section section-skew">
            <div class="container" style="max-width:800px">
                <card shadow class="card-profile mt--300" no-body>
                  <div v-if="!found" class="px-4">
                      <div class="row justify-content-center">
                          <div class="col-lg-3 order-lg-2">
                              <div class="card-profile-image">
                                  <a href="https://www.pngitem.com/pimgs/m/150-1503941_user-windows-10-user-icon-png-transparent-png.png" target="_blank">
                                      <img src='https://www.pngitem.com/pimgs/m/150-1503941_user-windows-10-user-icon-png-transparent-png.png' class="img-fluid rounded shadow-lg">
                                  </a>
                              </div>
                          </div>
                          <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                            <div class="card-profile-actions py-4 mt-lg-0">
                                <center>
                                <base-button @click="logout" style="margin-right:0!important" type="danger" size="sm" class="mr-4">Logout</base-button>
                                </center>
                            </div>
                          </div>
                          <div class="col-lg-4 order-lg-1">
                              <div class="card-profile-stats d-flex justify-content-center">
                                  <div>
                                      <span class="heading">0</span>
                                      <span class="description">Photos</span>
                                  </div>
                                  <div>
                                      <span class="heading">0</span>
                                      <span class="description">Memoirs</span>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <div class="text-center mt-5">
                          <h3>Invalid Roll No...</h3>
                          <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>Please enter a valid roll no!</div>
                      </div>
                      <br/><br/><br/>
                    </div>
                    <div v-if="found" class="px-4">
                        <div class="row justify-content-center">
                            <div class="col-lg-3 order-lg-2">
                                <div class="card-profile-image">
                                  <a v-if="data.dp===null || data.dp==-1" href="img/user.png" target="_blank">
                                      <img title="Select a different DP" src='img/user.png' class="img-fluid rounded shadow-lg" style="height:200px;object-fit:cover">
                                  </a>
                                  <a v-else :href="data.pic[data.dp]" target="_blank">
                                      <img title="Select a different DP" :src='data.pic[data.dp]' class="img-fluid rounded shadow-lg" style="height:200px;object-fit:cover">
                                  </a>
                                </div>
                            </div>
                            <div class="col-lg-4 order-lg-3 text-lg-right align-self-lg-center">
                              <div class="card-profile-actions py-4 mt-lg-0">
                                  <center>
                                  <!--<base-button @click="vmodal=true" style="margin-right:7px!important" type="info" size="sm" class="mr-4">Write Memoir</base-button>-->
                                  <base-button @click="logout" style="margin-right:0!important" type="danger" size="sm" class="mr-4">Logout</base-button>
                                  </center>
                                  <modal :show.sync="vmodal"
                                       body-classes="p-0"
                                       modal-classes="modal-dialog-centered modal-lg">
                                    <card type="secondary" shadow
                                          header-classes="bg-white pb-5"
                                          body-classes="px-lg-5 py-lg-5"
                                          class="border-0">
                                        <template>
                                            <p class="h3 text-center">Author: <span style="color:#5e72e4">{{this.$store.state.data.name}}</span></p>
                                            <br/>
                                            <form role="form">
                                                <textarea v-model="memoir" class="form-control" id="exampleFormControlTextarea1" rows="8" placeholder="Write your memoir here ..."></textarea>
                                                <div class="text-center">
                                                    <base-button type="danger" @click="vmodal=false;memoir=''" class="my-4">Cancel</base-button>
                                                    <base-button @click="post" type="primary" class="my-4">Submit</base-button>
                                                </div>
                                            </form>
                                        </template>
                                    </card>
                                </modal>
                              </div>
                            </div>
                            <div class="col-lg-4 order-lg-1">
                                <div class="card-profile-stats d-flex justify-content-center">
                                    <div>
                                        <span class="heading">{{data.pic.length}}</span>
                                        <span class="description">Photos</span>
                                    </div>
                                    <div>
                                        <span class="heading">{{filtered(data.comments).length}}</span>
                                        <span class="description">Memoirs</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="text-center mt-5">
                            <h3>{{data.name}}</h3>
                            <div class="h6 font-weight-300"><i class="ni location_pin mr-2"></i>{{data.other}}</div>
                        </div>
                        <hr />
                        <div class="mt-5 py-5 text-center" style="margin-top:0!important;padding:0!important">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <p style="white-space:pre-line">{{data.bio}}</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div class="nav-wrapper">
                          <ul class="nav nav-pills nav-fill flex-md-row" id="tabs-icons-text" role="tablist">
                              <li style="width:49%;padding-right:1%" class="nav-item" @click="sel=0;setActive(1)">
                                  <a class="nav-link mb-sm-3 mb-md-0 active" id="tabs-icons-text-1-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true"><i class="ni ni-chat-round mr-2"></i>Memoirs</a>
                              </li>
                              <li style="width:49%;padding-left:1%" class="nav-item" @click="sel=1;setActive(2)">
                                  <a class="nav-link mb-sm-3 mb-md-0" id="tabs-icons-text-2-tab" data-toggle="tab" href="javascript:void(0)" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false"><i class="ni ni-image mr-2"></i>Photos</a>
                              </li>
                          </ul>
                        </div>
                        <br/>
                        <vue-masonry-wall style="overflow:hidden" v-if="filtered(data.comments).length && sel==0" :items="filtered(data.comments)" :options="{width: 300, padding: 12}" :key="sel">
                          <template v-slot:default="{item}">
                            <div class="item">
                              <div class="info info-horizontal bg-white shadow-sm" style="padding:15px">
                                <div class="icon icon-shape icon-shape-info rounded-circle text-white" style="float:left">
                                  <i class="ni ni-circle-08 text-info"></i>
                                </div>
                                <div class="description pl-4" style="margin-left:40px">
                                  <h5 class="title text-info">{{item.author}}</h5>
                                  <p style="white-space:pre-line">{{item.text}}</p>
                                </div>
                              </div>
                            </div>
                          </template>
                        </vue-masonry-wall>
                        <p v-if="!filtered(data.comments).length && sel==0" class="text-center h3">No memoirs to display...</p>
                        <vue-masonry-wall style="overflow:hidden" :items="data.pic" :options="{width: 300, padding: 12}" v-if="sel==1" :key="sel">
                          <template v-slot:default="{item}">
                            <div class="item">
                              <img v-lazy="item" class="img-fluid" alt="Responsive image">
                            </div>
                          </template>
                        </vue-masonry-wall>
                        <br/>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import VueMasonryWall from "vue-masonry-wall";
import modal from "../components/Modal";
import firebase from 'firebase';
import axios from 'axios';

export default {
  components: {
    VueMasonryWall,
    modal
  },
  data() {
    return {
      found: false,
      defaults: [
        'img/ikan.jpg',
        'img/3.jpg',
        'img/2.jpg',
        'img/1.jpg',
      ],
      data: {
        name: "Loading...",
        bio: "Loading...",
        other: "Loading...",
        roll: "Loading...",
        comments: [],
        pic: [
          'img/ikan.jpg',
          'img/3.jpg',
          'img/2.jpg',
          'img/1.jpg',
        ]
      },
      vmodal: false,
      memoir: '',
      sel: 0,
      search: ''
    }
  },
  methods: {
    setActive: function(i){
      var button = null;
      var disable = null;
      if(i==1){
        button = document.getElementById("tabs-icons-text-1-tab");
        disable = document.getElementById("tabs-icons-text-2-tab");
      }else{
        button = document.getElementById("tabs-icons-text-2-tab");
        disable = document.getElementById("tabs-icons-text-1-tab");
      }
      button.classList.add("active");
      disable.classList.remove("active");
    },
    logout: function(){
      firebase.auth().signOut().then(() => {
				this.$router.replace('login');
			})
    },
    sear: function(){
      if(this.search.length>=4){
        window.open("#/search?q="+this.search,"_self")
      }else{
        this.$notify({type: 'error', title: 'Error', text: 'Query should be of atleast 4 characters!'})
      }
    },
    filtered: function(x){
      var toShow = [];
      for (var y in x){
        if(x[y].visibility){
          toShow.push(x[y])
        }
      }
      return toShow;
    },
    post: function(){
      this.$store.commit('load', true);
      var _this = this;
      axios.post('https://yearbook.iitk.ac.in/addComment', {
        'roll': _this.$route.query.roll,
        'text': _this.memoir,
        'author': _this.$store.state.data.name,
        'apiKey': _this.$store.state.key,
        'username': _this.$store.state.data.other.replace(/@.+/gm, "")
      })
      .then(response => {
        _this.vmodal = false;
        _this.$store.commit('load', false);
        _this.$notify({type: 'success', title: 'Success', text: 'Memoir added successfully'})
        location.reload();
      })
      .catch(e => {
        _this.$store.commit('load', false);
        _this.$notify({type: 'error', title: 'Error', text: e.message})
      })
    },
    getData: function(){
      this.$store.commit('load', true);
      var _this = this;
      if (this.$route.query.roll == this.$store.state.data.roll){
        this.$router.replace('mypage');
      } else {
        axios.post('https://yearbook.iitk.ac.in/getUser', {
          'roll': _this.$route.query.roll,
          'apiKey': _this.$store.state.key,
          'username': _this.$store.state.data.other.replace(/@.+/gm, "")
        })
        .then(response => {
          if(Object.keys(response.data).length){
            _this.data = response.data[0];
            const len = _this.data.pic.length;
            for(var i = 0; i < (4-len); i++){
              _this.data.pic.unshift(_this.defaults[i]);
            }
            _this.found = true;
            _this.$store.commit('load', false);
          }else{
            _this.found = false;
            _this.$store.commit('load', false);
            _this.$notify({type: 'error', title: 'Error', text: 'Roll no. not found in Database!'})
          }
        })
        .catch(e => {
          _this.$store.commit('load', false);
          _this.found = false;
          _this.$notify({type: 'error', title: 'Error', text: e.message})
        })
      }
    }
  },
  mounted(){
    this.getData();

    window.scrollTo(0,0);
    window.onscroll = function() {myFunction()};

    var navbar = document.getElementById("stick");
    var sticky = navbar.offsetTop;

    function myFunction() {
      if (window.pageYOffset >= sticky) {
        navbar.classList.add("sticky")
      } else {
        navbar.classList.remove("sticky");
      }
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
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
</style>
