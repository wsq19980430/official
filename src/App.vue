<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {mapState, mapGetters, mapActions, mapMutations} from 'vuex';
import {getBrandList, getMakeList} from './api/index.js';
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    
  },
  mounted(){
      getBrandList().then(res=>{
        // console.log('res...', res.data);
      });
      getMakeList(9).then(res=>{
        // console.log('makeList...', res.data);
      })
  }
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }
  html,body {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  #app{
    width: 100%;
    height: 100%;
  }
</style>