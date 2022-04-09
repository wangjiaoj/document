# 小程序开发多端框架总结

## 一. 小程序开发 
 目前比较主流的小程序主要包括微信小程序和支付宝小程序等;

### 1.1. 小程序开发和常规web开发的差别：

1. 小程序开发需要完全的前后端分离;
2. 小程序前端开发都有对应的开发工具,需要在开发工具里面进行调试、预览和代码提交甚至版本管理。 内网会在开发和调试上存在问题，需要在外网开发;另外开发工具也有提供远程调试功能供真机调试，测试可以跟其他有小程序测试经验的同事确认下小程序测试流程。
3. 前端开发方面具有自己的规则。在标签、事件绑定、路由设置、接口请求、localStorage等方面都有小程序自己的一套规则;
   比如微信的localStorage和导航、接口请求都是微信内置方法,wx.xx
 
 [参考-微信小程序开发文档]( https://developers.weixin.qq.com/miniprogram/dev/framework/)
 [参考-支付宝小程序开发文档]( https://docs.alipay.com/mini/introduce/register)

### 1.2. 以微信小程序为例的一些细节

#### 1. 微信小程序可以使用的组件
    微信小程序的官方组件能力,框架为开发者提供了一系列基础组件，开发者可以通过组合这些基础组件进行快速开发;主要包括最基础的一些view、button、form表单等组件，也包括一些原生组件比如camera\map\live-playe。
 [参考-微信小程序官方组件-原生组件](https://developers.weixin.qq.com/miniprogram/dev/component/native-component.html)
    另外还可以选用小程序UI组件库。小程序UI组件库是基于WeUI封装的组件库，是一套同微信原生视觉体验一致的组件库，由微信官方设计团队和小程序团队为微信小程序量身设计，令用户的使用感知更加统一。这个需要把weUI引入到微信小程序项目里面。

#### 2. 微信小程序的兼容和编译问题
在兼容方面主要考虑两方面问题,一个是随着小程序的功能不断的增加，但是旧版本的微信客户端并不支持新功能，所以在使用这些新能力的时候需要做兼容;另一方面微信小程序会进行代码编译，但编译以外还是存在少量API问题的。
微信小程序的默认的预处理：
* ES6 转 ES5（可以应用于编译、预览、上传），使用 "babel-core": "^6.26.0"
* 上传代码时样式自动补全，使用 "postcss": "^6.0.1"
* 上传代码时自动压缩，使用 "uglify-js": "3.0.27"
代码编译的介绍[参考-微信小程序代码编译](https://developers.weixin.qq.com/miniprogram/dev/devtools/codecompile.html);
存在少量API不可用的情况，开发时需要注意[参考-微信小程序JavaScript支持情况](https://developers.weixin.qq.com/miniprogram/dev/guide/runtime/js-support.html)

### 1.3. 微信小程序、支付宝小程序、钉钉小程序等等之间的差别

微信小程序文档最全面,支付宝小程序其次，钉钉小程序文档差很多，但是钉钉小程序因为跟支付宝小程序差不多，文档可以直接去看支付宝的小程序文档。
[钉钉/支付宝小程序和微信小程序的区别及转换方案](https://www.cnblogs.com/dora-zc/p/10963644.html)
差别不算是特别大


## 二、常见的跨端开发的框架
### 2.1. 常见框架
* 1. mpvue
 美团点评团队出品的小程序开发框架;
 https://github.com/Meituan-Dianping/mpvue/releases
 版本2.0  19年
* 2. WePY：腾讯出品，参考了Vue 等框架对原生小程序进行再次封装的框架，更贴近于 MVVM 架构模式, 并支持ES6/7的一些新特性;
* 3. Chameleon: 滴滴出品,Chameleon 是一套开源跨端解决方案，它的目标是让 MVVM 跨端环境大一统，实现任意使用 MVVM 架构设计的终端，都能使用其进行开发并运行。
* 4. Taro：京东出品
个人认为用 Taro 不是用来做多端，而是小程序那套东西难用又封闭，索性把它当作编译目标，实际用 React 来写。

WePY是一个“类Vue”的框架，而mpvue是“基于Vue”的框架.因为WePY是在代码开发风格上借鉴了Vue，本身和Vue没有什么关系；而这个mpvue是从整个Vue的核心代码上经过二次开发而形成的一个框架，相当于是给Vue本身赋能，增加了开发微信小程序的能力。
* 5. uni-app
* 6. kbone 


## 三 Taro使用
1. taro3.0需要node12
>npm i -g @tarojs/cli
>taro init


taro vue3 在长列表性能不太好
antd4.0

2. UI组件库支持
支持 Vant Weapp等第三方组件库,但是注意：使用原生第三方组件库进行开发的项目，不再具有多端转换的能力。

但是，如果你想使用 Vant Weapp 又想拥有多端转换的能力，强烈推荐 Vant Weapp 社区衍生库 @antmjs/vantui， 它是基于 Vant Weapp 开发的多端组件库，同时支持 Taro 和 React。拥有 Taro 多端转换的能力，同时和 Vant Weapp 的 UI 和 API 高度保持一致。



### 五、小程序原生开发和使用跨端框架之间的区别
以微信小程序原生开发和uniApp为例子
1. 内置方法问题
   像是微信的localStorage和导航、接口请求都是微信内置方法,如wx.navigateTo,wx.request
    uniApp也是一样的写法；