<template>
    <div id="app">
      <img src="img/Transparent.png" style="position:fixed;bottom:0;left:0;z-index:10" width="150">
      <loading
        :active.sync="$store.state.loading"
        :color="'#5e72e4'"
        :background-color="'#000000'"
        :height="128"
        :width="128"
        :is-full-page=true>
      </loading>
        <notifications position="top center"/>
        <router-view name="header"></router-view>
        <main>
            <fade-transition origin="center" mode="out-in" :duration="250">
                <router-view/>
            </fade-transition>
        </main>
        <router-view name="footer"></router-view>
    </div>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    FadeTransition,
    Loading
  }
};
</script>
