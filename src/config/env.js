/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgCode： 图片验证码地址
 *
 */
let baseUrl;
let routerMode;
let imgCode;
let amapKey = 'f08316066bbed1f168a371a9368ca524';

if (process.env.NODE_ENV == 'development') {
  baseUrl = '';
  routerMode = 'hash'
  imgCode = 'http://hpweb.qisheng.me/api/code'
}else{
  baseUrl = '';
  routerMode = 'hash'
  imgCode = '/api/code'
}

export {
  baseUrl,
  routerMode,
  imgCode,
  amapKey
}
