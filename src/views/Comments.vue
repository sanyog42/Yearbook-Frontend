<template>
    <div class="profile-page">
        <div style="position:absolute;filter:blur(3px);background-attachment:fixed;background-image: url('img/y16.jpg');padding-top:28%;width:100%;background-size:contain">
        </div>
        <section class="section-profile-cover section-shaped my-0">
          <div style="padding-top:28%">
          </div>
          <div id="stick" style="filter: blur(2px);border-top-style: solid;border-bottom-style: solid;border-color: white;">
            <div :style="{'position':'absolute','margin-right':'50%','background-image': 'url(' + $store.state.data.pic[0] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
            <div :style="{'position':'absolute','margin-left':'50%','background-image': 'url(' + $store.state.data.pic[1] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
            <div :style="{'position':'absolute','margin-top':'50vh','margin-right':'50%','background-image': 'url(' + $store.state.data.pic[2] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
            <div :style="{'position':'absolute','margin-top':'50vh','margin-left':'50%','background-image': 'url(' + $store.state.data.pic[3] + ')','height':'50vh','width':'50%','background-size':'cover'}">
            </div>
          </div>
        </section>
        <section class="section section-skew">
            <div class="container" style="max-width:800px">
                <card shadow class="card-profile mt--300" no-body>
                    <div class="px-4">
                      <div class="text-center mt-5">
                        <a href="#/mypage"><base-button style="margin-right:0 !important" type="info" size="sm" class="mr-4">Go Back</base-button></a>
                      </div>
                        <div class="text-center mt-5">
                            <h3>Review Memoirs</h3>
                        </div>
                        <hr />
                        <div class="mt-5 py-5 text-center" style="margin-top:0!important;padding:0!important">
                            <div class="row justify-content-center">
                                <div class="col-lg-9">
                                    <p>You can find the list of all memoirs written for you below in the table. You can choose which memoirs you want to be visible by selecting the checkbox in the 'Visible' column...</p>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div style="overflow-x:auto">
                        <table v-if="comments.length" class="table">
                          <thead>
                              <tr>
                                  <th style="min-width:100px">Author</th>
                                  <th class="text-center" style="min-width:500px">Memoir</th>
                                  <th class="text-right">Visibile</th>
                              </tr>
                          </thead>
                          <tbody>
                              <tr v-for="i in comments">
                                 <td scope="row">{{ i.author }}</td>
                                 <td style="white-space:pre-line">{{ i.text }}</td>
                                 <td class="text-right">
                                   <base-button @click="i.visibility=!i.visibility;update(i._id, i.visibility)" v-if="i.visibility" style="margin-right:0 !important" type="success" size="sm" class="mr-4">Yes</base-button>
                                   <base-button @click="i.visibility=!i.visibility;update(i._id, i.visibility)" v-else style="margin-right:0 !important" type="danger" size="sm" class="mr-4">No</base-button>
                                 </td>
                              </tr>
                          </tbody>
                      </table>
                      <p v-if="!comments.length" class="text-center h3">No memoirs to review...</p>
                      </div>
                      <br/>
                      <base-pagination v-if="comments.length" v-model="page" :page-count="totalpages" align="center"></base-pagination>
                      <div class="text-center mt-5">
                        <a href="#/mypage"><base-button style="margin-right:0 !important" type="info" size="sm" class="mr-4">Go Back</base-button></a>
                      </div>
                      <br/><br/>
                    </div>
                </card>
            </div>
        </section>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      totalpages: 1,
      page: 1,
      u: false,
      sel: 0,
      defaults: [
        'img/ikan.jpg',
        'img/3.jpg',
        'img/2.jpg',
        'img/1.jpg',
      ]
    }
  },
  methods: {
    update: function(id, vis){
      this.$store.commit('load', true);
      var _this = this;
      axios.post('https://yearbook.iitk.ac.in/updateComment', {
        'roll': _this.$store.state.data.roll,
        '_id': id,
        'visibility': vis,
        'apiKey': _this.$store.state.key,
        'username': _this.$store.state.data.other.replace(/@.+/gm, "")
      })
      .then(response => {
        if(response.status == 200){
          _this.$store.commit('update', {'id': id, 'vis': vis})
          _this.$store.commit('load', false);
        }else{
          _this.$notify({type: 'error', title: 'Error', text: 'Error updating visibility!'})
          _this.$router.replace('mypage');
        }
      })
      .catch(e => {
        _this.$notify({type: 'error', title: 'Error', text: e.message});
        _this.$router.replace('mypage');
      })
      this.$store.commit('update', {'id': id, 'vis': vis})
    },
    reloadData: function(){
      this.$store.commit('load', true);
      var _this = this;
      axios.post('https://yearbook.iitk.ac.in/userByEmail', {
        'email': _this.$store.state.data.other,
        'apiKey': _this.$store.state.key,
        'username': _this.$store.state.data.other.replace(/@.+/gm, "")
      })
      .then(response => {
        if(Object.keys(response.data).length){
          var res = response.data[0];
          const len = res.pic.length;
          for(var i = 0; i < (4-len); i++){
            res.pic.unshift(_this.defaults[i])
          }
          _this.$store.commit('loadData', res);
          _this.$store.commit('load', false);
        }else{
          _this.$notify({type: 'error', title: 'Error', text: 'Error reloading Database!'})
          _this.$router.replace('mypage');
        }
      })
      .catch(e => {
        _this.$notify({type: 'error', title: 'Error', text: e.message});
        _this.$router.replace('mypage');
      })
    }
  },
  mounted(){
    if(Object.keys(this.$store.state.data).length == 0){
      this.logout();
    } else {
      this.reloadData()
    }
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
  computed: {
    comments(){
      var num = this.$store.state.data.comments.length;
      this.totalpages = Math.ceil(num/5);
      var toShow = [];
			var init = this.page - 1;
			for(var i = (init)*5; (i < (init + 1)*5) && (i < num); i++){
				toShow.push(this.$store.state.data.comments[i]);
			}
			return toShow
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
