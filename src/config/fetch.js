import {
	baseUrl
} from './env'
import * as mobile from './mUtils'
import router from '../router'

export default async(type = 'GET', url = '', data = {}, method = 'fetch') => {
  type = type.toUpperCase()
  url = baseUrl + url;


    let dataStr = ''; //数据拼接字符串
    Object.keys(data).forEach(key => {
      dataStr += key + '=' + data[key] + '&';
    })

    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }

  //新加逻辑
  function is_weixn(){//判断是否是微信
    var ua = navigator.userAgent.toLowerCase();
    if(ua.match(/MicroMessenger/i)=="micromessenger") {
      return 'wx';
    } else {
      return '';
    }
  }


  if (window.fetchs && method == 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: type,
      headers: {
        'from' : is_weixn(),//新加逻辑
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'platform': mobile.getStore('platform'),//新加逻辑
        'token': mobile.getStore('token')//新加逻辑
      },
      mode: "cors",
      cache: "force-cache"
    }

    if (type == 'POST') {
      Object.defineProperty(requestConfig, 'body', {
        value: dataStr
      })
    }

    try {
      const response = await fetch(url, requestConfig);
      const responseJson = await response.json();

      //新加逻辑
      /*const isaccount = url.indexOf('account')>0 //判断请求地址里是否带account
      if(responseJson.rCode&&responseJson.rCode=='noLogin'&&!router.currentRoute.meta.norequiresAuth){  //如果未登录
        router.replace('/au/')
        return
      }*/

      return responseJson
    } catch (error) {
      throw new Error(error)
    }
  } else {
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject;
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader('Content-type','application/x-www-form-urlencoded');

      //新加逻辑
      requestObj.setRequestHeader('from', is_weixn());
      requestObj.setRequestHeader('platform', mobile.getStore('platform'));
      requestObj.setRequestHeader('token', mobile.getStore('token'));

      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            let obj = requestObj.response
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }

            //新加逻辑
            /*if(obj.rCode&&obj.rCode=='noLogin'&&!router.currentRoute.meta.norequiresAuth){  //如果未登录
              router.replace('/au/')
              return
            }*/

            resolve(obj)
          } else {
            reject(requestObj)
          }
        }
      }
    })
  }
}
