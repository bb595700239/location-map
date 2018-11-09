import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
  selectCompany:'',
  platform: '',//手机系统
  phoneType: '',//手机型号(1是X)
  parkToken: '',//用户token
  h5phoneType:0,//h5页面手机型号(1是X)
  channelId: 2,//渠道id
  channelName:'蒲公英天地泛娱乐小镇',//渠道名称
  webTitle:'蒲公英天地泛娱乐小镇',//网页名称

  position:{},//之前页面位置
  arrPageName:'index',//当前页面NAME
  addressName:'',//定位名称
  addressPosition:[],//定位经纬度

  addAddressName:'',//新建服务地址标题
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})
