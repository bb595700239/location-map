<template>
  <div class="warp page1">
    <!--<v-header :goBack="true" headTitle="新建服务地址">
    </v-header>-->
    <div class="main-box4 scroll" ref="my_scroller">
      <el-amap-search-box class="search-box" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box>
      <el-amap vid="amapDemo" :plugin="plugin" :center="mapCenter" :zoom="18" :events="events" class="amap-demo">
        <el-amap-marker v-for="(marker,index) in markers" :position="marker" :key="index"></el-amap-marker>
      </el-amap>
      <div class="local-info" v-if="address">
        <i class="iconfont icon-dingwei"></i>
        <div class="info">
          <p class="p1">{{title}}</p>
          <p class="p2">{{address}}</p>
        </div>
      </div>
      <div class="addbtn" @click="save">
        确定
      </div>
    </div>
  </div>
</template>
<script>
  import * as getData from '../service/getData'
  import * as mobile from '../config/mUtils'
  import {mapState, mapMutations,mapActions} from 'vuex'
  import { AMapManager } from 'vue-amap'
  export default {
    data () {
      let self = this;
      return {
        markers: [],
        searchOption: {
          city: '嘉兴',
          citylimit: false
        },
        mapCenter: [120.14078, 30.3336],
        lng: 0,
        lat: 0,
        loaded: false,
        plugin: [{
          pName: 'Geolocation',
          useNative: self.$store.state.platform === 'android' ? false : true,
          extensions: "all",
          showCircle: false,
          buttonPosition: 'RB',
          buttonDom: '<div class="local-geo"><i class="iconfont icon-dingwei1"></i></div>',
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.changeLocal(result.position.lng,result.position.lat);
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            },
            complete(result){
              if (result && result.position) {
                self.changeLocal(result.position.lng,result.position.lat)
              }
            }
          }
        }],
        events: {
          click(e) {
            let { lng, lat } = e.lnglat;
            self.changeLocal(lng,lat)
          }
        },
        address: '',
        title: '',
      }
    },
    activated () {
      /*if(this.$store.state.platform === 'android'){
        this.plugin[0].useNative = false;
      }*/
    },
    mounted () {
    },
    components: {
    },

    computed: {
    },
    methods: {
      onSearchResult(pois) {
        let latSum = 0;
        let lngSum = 0;
        if (pois.length > 0) {
          this.changeLocal(pois[0].lng,pois[0].lat,pois[0].name)
        }
      },
      changeLocal(lng,lat,name){
      	let self = this
        self.lng = lng;
        self.lat = lat;
        self.mapCenter = [lng, lat];
        self.markers = []
        self.markers.push([lng, lat]);
        // 这里通过高德 SDK 完成。
        //alert(AMap.Geocoder)
        if(AMap.Geocoder=='undefined'||!AMap.Geocoder){
          this.address=name;
        }else{
          var geocoder = new AMap.Geocoder({
            radius: 1000,
            extensions: "all",
          });
          geocoder.getAddress([lng ,lat], function(status, result) {
            if (status === 'complete' && result.info === 'OK') {
              if (result && result.regeocode) {
                self.title = result.regeocode.addressComponent.neighborhood || (result.regeocode.addressComponent.street+result.regeocode.addressComponent.streetNumber)
                self.address = result.regeocode.formattedAddress;
                self.$nextTick();
              }
            }
          });
        }
      },
      save(){
        this.$store.state.addressPosition=[this.lng,this.lat];
        this.$store.state.addressName=this.address+this.title;
        alert(this.$store.state.addressPosition+''+this.$store.state.addressName)
      }

    },
    watch:{
    }

  }

</script>
<style lang="scss">
  @import '../assets/css/mixin';
  .amap-demo {
    .amap-logo,.amap-copyright{
      display: none !important;
    }
    .amap-geolocation-con{
      bottom: 3.5rem !important;
      right: .2rem !important;
      .local-geo{
        @include wh(.8rem,.8rem);
        border-radius: 50%;
        border:none;
        background-color: #fff;
        box-shadow: 0 0 .2rem rgba(0,0,0,.2);
        i{
          @include center();
          @include sc(.5rem,#4f4f4f);
        }
      }
      &.amap-locate-loading{
        .local-geo{
          background: #fff url("../assets/images/loading.gif") 50% 50% no-repeat;
          i{
            display: none;
          }
        }
      }
    }
    .amap-marker{
      img{
        background: none;
      }
    }
  }

  .search-box {
    @include cl();
    position: absolute !important;
    top: .2rem;
    width: 7.1rem;
    .search-btn{
      border-left: 1px solid #f0f0f0;
      @include sc(.28rem,$blue);
      width:1.3rem !important;
    }
  }
  .el-vue-search-box-container{
    width: 7.1rem !important;
  }
  .amap-page-container {
    position: relative;

  }
  .local-info{
    bottom: 1.5rem;
    width: 7.1rem;
    @include cl();
    background-color: #FFFFFF;
    padding: .25rem .3rem;
    box-shadow: 0 0 .5rem rgba(0,0,0,.2);
    border-radius: .15rem;
    padding-left: .9rem;
    i{
      position: absolute;
      left:.25rem;
      margin-top: -.05rem;
      @include sc(.5rem,$blue)
    }
    .p1{
      @include sc(.3rem,$blue);
      margin-bottom: .05rem;
    }
    .p2{
      @include sc(.26rem,#4f4f4f)
    }
  }
  .addbtn{
    @include sc(.30rem,#fff);
    text-align: center;
    background-color: $blue;
    border-radius: .15rem;
    @include cl();
    bottom: .4rem;
    width: 7.1rem;
    height: .85rem;
    line-height: .85rem;
  }
</style>

