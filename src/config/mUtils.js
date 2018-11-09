import store from '../story/'
import  MegaPixImage from '../assets/js/megapix-image'
/**
 * 存储localSession
 */
  export const setSession = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.sessionStorage.setItem(name, content);
}

/**
 * 获取localSession
 */
export const getSession = name => {
  if (!name) return;
  return window.sessionStorage.getItem(name);
}
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}
/**
 * 获取地址栏参数
 */
export const getQueryString=(name) => {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return decodeURI(r[2]); return null;
}

/**
 * 补0
 */
export const islength = (num) => {
  if(Number(num)<10){
    return '0'+num
  }else{
    return num
  }
}

/**
 * 表单校验
 */
export const rule={
  alert:function(mess){
    store.state.alertMessage=mess
    store.state.showAlert=true
  },
  empty:function(str,mess){//不能为空
    if(str==''){
      toast(mess)
      return false
    }else{
      return true
    }
  },
  phone:function(str) {//手机号校验
    var myReg = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
    if (!myReg.test(str)) {
      toast('手机号码有误')
      return false
    }else{
      return true
    }
  }

}




export const overscroll = els => {
  for (var i = 0; i < els.length; ++i) {
    var el = els[i];
    el.addEventListener('touchstart', function () {
      var top = this.scrollTop
        , totalScroll = this.scrollHeight
        , currentScroll = top + this.offsetHeight;
      if (top === 0) {
        this.scrollTop = 1;
      } else if (currentScroll === totalScroll) {
        this.scrollTop = top - 1;
      }
    });
    el.addEventListener('touchmove', function (evt) {
      if (this.offsetHeight < this.scrollHeight)
        evt._isScroller = true;
    });
  }
};//禁止body的滚动事件

let startPageX = 0
document.body.addEventListener('touchstart', function (evt) {
  startPageX = evt.touches[0].pageX
});

document.body.addEventListener('touchmove', function (evt) {

  let movePageX = evt.touches[0].pageX
  if(!evt._isScroller&&startPageX > 30){
    evt.preventDefault();
  }
});//给class为.scroll的元素加上自定义的滚动事件
//overscroll(document.querySelectorAll('.scroll'));


/**微信分享
 * @param files
 */
export const wxshare = (wx, shareCont) => {
  let title = shareCont.title
  let shareContent = shareCont.shareContent
  let url = shareCont.url
  let imgUrl = shareCont.imgUrl
  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: [
        'onMenuShareTimeline', // 分享到朋友圈
        'onMenuShareAppMessage', // 分享给好友
        'onMenuShareQQ', // 分享到QQ
        'onMenuShareWeibo', // 分享到微博
        'onMenuShareQZone' // 分享到QQ空间
      ]
    });
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        toast('分享成功')
      },
      cancel: function () {
        toast('取消分享')
      }
    });
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: shareContent, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      type: 'link', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {
        toast('分享成功')
      },
      cancel: function () {
        toast('取消分享')
      }
    });
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: shareContent, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        toast('分享成功')
      },
      cancel: function () {
        toast('取消分享')
      }
    });
    wx.onMenuShareWeibo({
      title: title, // 分享标题
      desc: shareContent, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        toast('分享成功')
      },
      cancel: function () {
        toast('取消分享')
      }
    });
    wx.onMenuShareQZone({
      title: title, // 分享标题
      desc: shareContent, // 分享描述
      link: url, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: imgUrl, // 分享图标
      success: function () {
        toast('分享成功')
      },
      cancel: function () {
        toast('取消分享')
      }
    });
  });
}

//删除数组指定的某个元素
Array.prototype.remove = function(val) {
  var index = this.indexOf(val);
  if (index > -1) {
    this.splice(index, 1);
  }
};

//数组去重
export const unique = (arr) => {
  return arr.filter((element, index, self) => {return self.indexOf(element) === index})
}



Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1,  //month
    "d+": this.getDate(),     //day
    "h+": this.getHours(),    //hour
    "m+": this.getMinutes(),  //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
    "S": this.getMilliseconds() //millisecond
  }
  var week=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(w+)/.test(format)){
    format = format.replace(RegExp.$1, week[this.getDay()]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
}

Date.prototype.add = function (part, value) {
  value *= 1;
  if (isNaN(value)) {
    value = 0;
  }
  switch (part) {
    case "y":
      this.setFullYear(this.getFullYear() + value);
      break;
    case "m":
      this.setMonth(this.getMonth() + value);
      break;
    case "d":
      this.setDate(this.getDate() + value);
      break;
    case "h":
      this.setHours(this.getHours() + value);
      break;
    case "n":
      this.setMinutes(this.getMinutes() + value);
      break;
    case "s":
      this.setSeconds(this.getSeconds() + value);
      break;
    default:

  }
  return this
}

//alert(new Date().add("m", -1).format('yyyy-MM-dd hh:mm:ss'));

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = (el,callback) => {
  let requestFram;
  let oldScrollTop;

  document.addEventListener('scroll',() => {
    showBackFun();
  }, false)
  document.addEventListener('touchstart',() => {
    showBackFun();
  },{passive: true})

  document.addEventListener('touchmove',() => {
    showBackFun();
  },{passive: true})

  document.addEventListener('touchend',() => {
    oldScrollTop = el.getPosition().top;
    moveEnd();
  },{passive: true})

  const moveEnd = () => {
    requestFram = requestAnimationFrame(() => {
      if (el.getPosition().top != oldScrollTop) {
        oldScrollTop = el.getPosition().top;
        moveEnd();
      }else{
        cancelAnimationFrame(requestFram);
      }
      showBackFun();
    })
  }

  //判断是否达到目标点
  const showBackFun = () => {
    if (el.getPosition().top > 500) {
      callback(true);
    }else{
      callback(false);
    }
  }
}



export const toast = (msg = '', time = 1500) => {
    var toast = document.createElement('div')
    toast.className = 'common-toast common-toast-show'
    toast.innerHTML = msg
    document.body.appendChild(toast)
    toast.style.display = 'block'
    var timer = setTimeout(() => {
      toast.className = 'common-toast common-toast-hide'
      clearTimeout(timer)
      var timer2 = setTimeout(() => {
        document.body.removeChild(toast)
        clearTimeout(timer2)
      }, 200)
    }, time)
  }


const digitsRE = /(\d{3})(?=\d)/g

export function currency (value, currency, decimals) {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
    _int.slice(i).replace(digitsRE, '$1,') +
    _float
}


/**
 * 检查是否为Emoji
 */
export const isEmoji = name => {
  if (escape(name).toLocaleLowerCase().match(/(\%\ue[0-9a-f]{3})|(\%\ud[0-9a-f]{3})/)) {
    return true
  }else{
    return false
  }
}


const resizeMe = (img,type,maxW,maxH,nocheck) => {

  const browser = {
    versions:function(){
      var u = navigator.userAgent;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger', //是否微信
        qq: u.match(/\sQQ/i) == " qq" //是否QQ
      };
    }()
  };

  var canvas = document.createElement('canvas');
  var width = img.width;
  var height = img.height;
  var max_width = maxW || 640;
  var max_height = maxH || 640;
  var max_size = 300;//k
  if (width > max_width) {
    height *= max_width / width;
    height = Math.round(height);
    width = max_width;
  }
  if(height > max_height){
    width *= max_height / height;
    width = Math.round(width);
    height = max_height;
  }
  //将图片放入canvas，并重置canvas大小
  if(browser.versions.ios || browser.versions.webApp){
    var mpImg = new MegaPixImage(img);
    canvas.width = width;
    canvas.height = height;
    mpImg.render(canvas, { width: width, height: height });
  }else{
    canvas.width = width;
    canvas.height = height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);
  }
  var res, quality = .7,resSize,ratio = 1;

  res = canvas.toDataURL("image/jpeg",quality); // 截取canvas对应的jpg图片，并且画质为70%（默认就是70%，可以改变）

  // Android 2.x、Android 4.1.2、4.3 的 toDataURL 不支持jpeg格式；
  if(res.substr(0,"data:image/png".length) == "data:image/png" || res.substr(0,6) == "data:,"){
    var encoder = new JPEGEncoder();
    res = encoder.encode(canvas.getContext("2d").getImageData(0,0,width,height), quality * 100, true);
  }
  resSize = Math.ceil(res.length/1024); //k

  if(resSize > max_size && !nocheck){
    ratio = Math.ceil(Math.sqrt(max_size/resSize)*100)/100;
    if(ratio >= .9){
      ratio -= .1;
    }

    res = resizeMe(img,max_width*ratio,max_height*ratio,true);

  }
  var imgInfo={}
  imgInfo.res = res
  imgInfo.width = canvas.width
  imgInfo.height = canvas.height
  if(type){
    return imgInfo;
  }
  else {
    return res;
  }
}

const resizeMe2 = (img) => {
  var canvas = document.createElement('canvas');
  var ress=resizeMe(img);
  var imgs=new Image();
  imgs.src = ress

  var prom = new Promise(function(resolve, reject){
    imgs.onload=function(){
      var height = imgs.height
      var width = imgs.width
      var widthheight = height >= width ? width : height;
      canvas.width = widthheight;
      canvas.height = widthheight;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(imgs, (width-widthheight)/2, (height-widthheight)/2, widthheight, widthheight,0,0,widthheight, widthheight);
      var res = canvas.toDataURL("image/jpeg",1); // 截取canvas对应的jpg图片，并且画质为70%（默认就是70%，可以改变）
      // Android 2.x、Android 4.1.2、4.3 的 toDataURL 不支持jpeg格式；
      if(res.substr(0,"data:image/png".length) == "data:image/png" || res.substr(0,6) == "data:,"){
        var encoder = new JPEGEncoder();
        res = encoder.encode(canvas.getContext("2d").getImageData(0,0,widthheight,widthheight), 100, true);
      }
      resolve(res);
    }
  });

  return prom
}
export {resizeMe, resizeMe2}
export const captureImage = (video, scale = 0.6) => {
  var videopro = document.createElement('video')
  videopro.src = video
  var sleep =  new Promise(function (resolve, reject) {
    videopro.addEventListener('loadeddata', () => {
      var canvas = document.createElement('canvas')
      canvas.width = videopro.videoWidth * scale
      canvas.height = videopro.videoHeight * scale
      canvas.getContext('2d').drawImage(videopro, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/png'))
    })
  })
  return sleep
}
