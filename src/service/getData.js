import axios from 'axios'
import store from '../story/'
import router from './../router'
import * as mobile from './../config/mUtils'
//import Mock from 'mockjs'


/**
 * 创建临时数据
 */
const setpromise = data => {
  return new Promise((resolve, reject) => {
    resolve(data)
  })
}
//编译环境使用真实数据
/*if (process.env.NODE_ENV != 'development') {


  Mock.mock('weixin/user/index/getInformation.action', {
    'list|1-30': [{
      'id|+1': 1,
      'img': Mock.Random.dataImage('40x40', 'joubn'),
      'info': Mock.Random.csentence(20, 30),
      'datetime': Mock.Random.date('yyyy-MM-dd H:m:s')

    }]
  });
}*/
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers['token'] = sessionStorage.getItem("parkToken");
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
//添加一个响应拦截器
axios.interceptors.response.use(function(res){
  if (res.data.message == '用户不存在'||res.data.message == '账号被封禁' ||res.data.message == '账号被删除') {
    router.replace({path:'/login'});
    mobile.removeStore('parkToken');
    store.state.parkToken='';
    sessionStorage.removeItem("parkToken");
    return res;
  }
  if (res.headers && (res.headers['content-type'] === 'application/x-msdownload' || res.headers['content-type'] === 'application/vnd.ms-excel')) {
    downloadUrl(res.request.responseURL)
    return {data:{code:1}}
  }
  return res;
},function(err){
  //Do something with response error
  return Promise.reject(error);
})

let searchParams=(prop)=>{
  let param = new URLSearchParams();
  for(let key in prop){
    param.append(key,prop[key])
  }
  return param
}

let searchParams2=(prop)=>{
  let param = new FormData();
  for(let key in prop){
    param.append(key,prop[key])
  }
  return param
}

/**
 * 发送验证码
 * phone 手机号
 * codeState 3:用户端登录4:用户端修改密码5:用户端修改手机号
 */
var verification = (phone,codeState) => axios.get('user/personal/sendCode?phone='+phone+'&codeState='+codeState);

/**
 * 验证码登录
 * phone 手机号
 * phoneCode验证码
 */
var login = (phone,phoneCode) => axios.get('/user/personal/login?phone='+phone+'&phoneCode='+phoneCode);

/**
 * 密码登录
 * phone 手机号
 * pwd 密码
 */
var passwordLogin = (phone,pwd) => axios.get('/user/personal/loginPwd?phone='+phone+'&pwd='+pwd);

/**
 * 验证码修改密码
 * phone 手机号
 * phoneCode验证码
 */
var updatePwdVfica = (phone,phoneCode) => axios.get('/user/personal/checkCode?phone='+phone+'&phoneCode='+phoneCode);

/**
 * 设置新密码
 * phone 手机号
 * password 密码
 */
var newPwd = (phone,password) => axios.get('/user/personal/newPwd?phone='+phone+'&password='+password);

/**
 * 社区列表
 */
var getArea = () => axios.get('user/area/getArea');


/**
 * 注册
 *
 phoneCode:验证码,
 userPhone:手机号,
 userPwd:密码,
 userAge:年龄   0:20以下 1：20~30 2:30~40 3:40~50 4:50~60 5: 60~70  6:70+,
 userSex:用户性别0 女 1 男,
 userCommuntityId:社区Id ,
 userName:用户名,
 userStreetId:街道Id,
 userDistrictId:区Id,
 */
var register = (phoneCode,userPhone,userPwd,userAge,userSex,userCommuntityId,userName,userStreetId,userDistrictId) => axios.post('user/personal/register', searchParams({phoneCode:phoneCode,userPhone:userPhone,userPwd:userPwd,userAge:userAge,userSex:userSex,userCommuntityId:userCommuntityId,userName:userName,userStreetId:userStreetId,userDistrictId:userDistrictId}));

/**
 * 首页--Banner
 */
var listBanner = () => axios.get('user/banner/listBanner');

/**
 * 首页--订单列表
 */
var ordersList = (pageIndex,pageSize) => axios.get('user/order/ordersList?pageIndex='+pageIndex+'&pageSize='+pageSize);

/**
 * 首页--快捷查询
 */
var quickStartList = (pageIndex,pageSize) => axios.get('user/quickStart/list?pageIndex='+pageIndex+'&pageSize='+pageSize);

/**
 * 地址--用户地址列表
 */
var userAddressList = () => axios.get('user/userAddress/userAddressList');

/**
 * 资讯--列表
 */
var informationList = (pageIndex,pageSize,lableId) => axios.get('user/information/informationList?pageIndex='+pageIndex+'&pageSize='+pageSize+'&lableId='+lableId);

/**
 * 资讯--详情
 */
var getInformation = (id) => axios.get('user/information/getInformation?id='+id);

/**
 * 根据父类型id获取所有子服务类型
 * pTypeId 父类型id
 */
var listOrderType = (pTypeId) => axios.get('user/order/listOrderType?pTypeId='+pTypeId);

/**
 * 服务发布
 */
var addService = (data) => axios.post('user/order/addService', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 用户端-- 用户详情
 */
var getUser = () => axios.get('user/personal/getUser');

/**
 * 我的--支付记录列表
 */
var listExpenditure = (pageIndex,pageSize) => axios.get('user/orderMoney/listExpenditure?pageIndex='+pageIndex+'&pageSize='+pageSize);

/**
 * 我的--设置默认地址
 */
var changeDefaultAddress = (addressId) => axios.get('user/userAddress/changeDefaultAddress?addressId='+addressId);

/**
 * 我的--删除地址
 */
var deleteAddress = (addressId) => axios.get('user/userAddress/deleteAddress?userAddressId='+addressId);

/**
 * 添加地址
 * addressDes 地址描述
 * username 用户姓名
 * phone 用户手机
 * addressType 地址是否为默认
 * lng
 * lat 地址经纬度
 */
var addAddress = (addressDes,lng,lat,addressType,username,phone) => axios.post('user/userAddress/addUserAddress',searchParams({addressDes:addressDes,lng:lng,lat:lat,addressType:addressType,username:username,phone:phone}));

/**
 * 更新地址
 * addressDes 地址描述
 * username 用户姓名
 * phone 用户手机
 * addressType 地址是否为默认
 * lng
 * lat 地址经纬度
 */
var updateUserAddress = (addressId,addressDes,lng,lat,addressType,username,phone) => axios.post('user/userAddress/updateUserAddress',searchParams({addressId:addressId,addressDes:addressDes,lng:lng,lat:lat,addressType:addressType,username:username,phone:phone}));

/**
 * 我的--地址详情
 * userAddressId 地址ID
 */
var addressDetail = (userAddressId) => axios.get('user/userAddress/detail?userAddressId='+userAddressId);

/**
 * 更新头像
 * 	userPortrait	头像的base64编码
 */
var updateImgFile = (data) => axios.post('user/personal/updateImg', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 更新性别
 * serversSex	用户性别 0女 1男
 */
var updateUserSex = (userSex) => axios.get('user/personal/updateUserSex?userSex=' + userSex);

/**
 * 更新性别
 * userName	用户名
 */
var updateUserName = (userName) => axios.get('user/personal/updateUserName?userName=' + userName);

/**
 * 更新性别
 * age	用户名年龄段
 */
var updateUserAge = (age) => axios.get('user/personal/updateUserAge?age=' + age);

/**
 * 更新所在社区
 * age	用户名年龄段
 */
var updateLoc = (communtityId,addressDes,streetId,distinctId) => axios.get('user/area/updateLoc?communtityId=' + communtityId + '&addressDes=' + addressDes + '&streetId=' + streetId + '&distinctId=' + distinctId);

/**
 * 修改密码校验
 * oldPassword	旧密码
 */
var checkPwd = (oldPassword) => axios.get('user/personal/checkPwd?oldPassword=' + oldPassword);

/**
 * 修改密码校验
 * newPassword	新密码
 */
var changePwd = (newPassword) => axios.get('user/personal/changePwd?newPassword=' + newPassword);

/**
 * 登出
 */
var loginOut = () => axios.get('user/personal/loginOut');

/**
 * 订单列表
 * @param pageIndex
 * @param pageSize
 * @param ordersState	订单状态 -1 全部0发布2人工派单3进行中4待付款5完成
 */
var listByState = (pageIndex,pageSize,ordersState) => axios.get('user/order/listByState?pageIndex='+pageIndex+'&pageSize='+pageSize+'&ordersState='+ordersState);

/**
 * 订单取消
 * @param ordersId 订单ID
 * @param orderCancleReason 取消原因
 */
var orderCancel = (ordersId,orderCancleReason) => axios.get('user/order/cancel?ordersId=' + ordersId + '&orderCancleReason=' + orderCancleReason);

/**
 * 订单详情
 * @param ordersId 订单ID
 */
var orderDetail = (ordersId) => axios.get('user/order/detail?ordersId=' + ordersId);

/**
 * 获取可邀请的服务者列表
 * @param ordersId 订单ID
 */
var orderListServers = (ordersId) => axios.get('user/order/listServers?ordersId=' + ordersId);

/**
 * 邀请服务者
 * serversId 服务者ID
 * orderId 订单ID
 */
var addServersOrder = (data) => axios.post('user/order/addServersOrder', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 服务者详情
 * serversId 服务者ID
 */
var getServers = (serversId,ordersId) => axios.get('user/searchServers/getServers?serverId=' + serversId + '&ordersId=' + ordersId);

/**
 * 服务者详情
 * ordersId 订单ID
 */
var payInfo = (ordersId) => axios.get('user/orderMoney/pay?ordersId=' + ordersId);

/**
 * 用户评分
 * commentServersId 服务者ID
 * commentOrderId 订单ID
 * commentContent 评论内容
 * commentNum 评分分数
 * commentType 评分类型
 */
var evaluate = (data) => axios.post('user/order/evaluate', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});

/**
 * 保修申请
 * ordersId 订单ID
 * ordersBackDes 备注内容
 * ordersBackTime 保修时间
 * picList 图片
 */
var backApply = (data) => axios.post('user/order/backApply', JSON.stringify(data), {headers: {'Content-Type': 'application/json'}});


export {verification,login,passwordLogin,updatePwdVfica,newPwd,getArea,register,listBanner,ordersList,quickStartList,userAddressList,informationList,getInformation,listOrderType,addService,getUser,listExpenditure,changeDefaultAddress,deleteAddress,updateImgFile,updateUserSex,updateUserName,updateUserAge,updateLoc,checkPwd,changePwd,loginOut,listByState,orderCancel,orderDetail,orderListServers,addServersOrder,getServers,payInfo,evaluate,backApply,addAddress,addressDetail,updateUserAddress}
