<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

export default {
  watch:{
  	$route(){
  		window.scrollTo(0,0)
  	}
  }
}
</script>

<style>
#app{ height: 100%;width: 100%;color:#313131;}

.clear{height: 0;display: block;content: '';clear: both;visibility: hidden;}
.clearfix:after{height: 0;display: block;content: '';clear: both;visibility: hidden;}
.boxSizing{
     -moz-box-sizing: border-box;  
     -webkit-box-sizing: border-box; 
     -o-box-sizing: border-box; 
     -ms-box-sizing: border-box; 
     box-sizing: border-box; 
}
</style>
