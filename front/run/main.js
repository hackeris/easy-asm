/**
 * Created by hackeris on 2016/11/13.
 */
import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

import Run from './components/Run.vue'

new Vue({
  el: '#app',
  components: {
    Run
  }
});
