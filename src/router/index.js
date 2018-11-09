import Vue from 'vue'
import Router from 'vue-router'



const addressPosition  = r => require.ensure([], () => r(require('../page/地址定位')), 'addressPosition')/*地址定位*/

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      redirect: '/addressPosition'
    },
    {
      path: '/addressPosition',
      name: '地址定位',
      meta: {nokeepAlive: false, keepLogin:true},
      component: addressPosition
    }
  ]
})

