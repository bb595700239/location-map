// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import './config/rem'

import AMap from 'vue-amap';
import store from './story/'
import components from './components/'
import {amapKey} from './config/env'


Object.keys(components).forEach((key) => {
  var name = key.replace(/(\w)/, (v) => v.toUpperCase()) // 首字母大写
  Vue.component(`v${name}`, components[key])
})

Vue.use(AMap);

AMap.initAMapApiLoader({
  // 高德的key
  key: amapKey,
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor', 'AMap.Geolocation'],
});


new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})

