
<template>
  <div id="app" :class="[$store.state.platform, $store.state.phoneType==1 ? 'phone-type-x' : '', !$store.state.platform && $store.state.h5phoneType==1 ? 'h5-phone-type-x' : '']">
    <keep-alive v-if="!$route.meta.nokeepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>


  </div>
</template>

<script>
import {mapState, mapMutations,mapActions} from 'vuex'
import * as getData from './service/getData'
import * as mobile from './config/mUtils'
import wx from 'weixin-js-sdk'
export default {
  name: 'app',
  data(){
    return{
    }
  },
  computed: {
    ...mapState([
      'platform',
    ])
  },
  components: {
  },
  mounted () {
  },
  methods: {
  },
  watch:{
  }
}

</script>




<style lang="scss">
  @import 'assets/css/base';
  @import 'assets/font/iconfont.css';
  @import 'assets/css/swiper-3.4.2.min.css';
  .g-fullsrceen{
    position: fixed;
    top: 6rem;
    z-index: 999;
    width: 100%;
  }
</style>

