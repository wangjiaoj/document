## 一、兼容性查询

[caniuse](https://caniuse.com/#home)

[tencent-caniuse](https://x5.tencent.com/tbs/guide/caniuse/index.html)
 
## 二、组件兼容性整理

### 2.1、富文本编辑器

### 1.ckeditor
* ckeditor5在ie11下是不兼容的，要想在ie11下正常运行，可能需要较低版本的ckeditor,在解决兼容性的时候，发现ckeditor4是兼容ie11的。
* ckeditor4不支持移动端，ie6,ie7不支持，ie8,ie9有限支持。ie10+完全支持。火狐浏览器、谷歌浏览器最新版本都支持。

### 2.wangEditor
####  wangEditor2 支持：IE8+
*  目前前端组件库版本：wangeditor2,文档：https://www.kancloud.cn/wangfupeng/wangeditor2/113991
基本的选择图片上传（IE8、9使用form方式上传，其他浏览器使用html5方式上传）
chrome、firefox、opera、IE11的粘贴截图上传
拖拽图片上传，支持到IE10
上传进度条，支持到IE10
跨域上传，支持到IE10

* 欠缺编写使用示例

####  wangEditor3 支持：IE10+,不包括IE10
https://www.kancloud.cn/wangfupeng/wangeditor3/335773
 IE10自定义上传存在bug
 另外IE编辑因为使用font标签等原因,页面*的默认设置字体大小需要去掉。
 

 ## 二、base64图片IE8浏览器兼容性处理
 base64图片在IE9(+)及非IE浏览器都能正常显示，IE8则要区分XP情况处理。
 [base64图片IE8浏览器兼容性处理]( https://www.cnblogs.com/murphyzhou/p/base64-image-compatible.html)

### 三、下载问题

````javascript
//判断IE
function IEVersion() {
  var userAgent = navigator.userAgent; //userAgent
  var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //IE<11 
  var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //Edge 
  var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
  if (isIE) {
    var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
    reIE.test(userAgent);
    var fIEVersion = parseFloat(RegExp["$1"]);
    if (fIEVersion == 7) {
      return 7;
    } else if (fIEVersion == 8) {
      return 8;
    } else if (fIEVersion == 9) {
      return 9;
    } else if (fIEVersion == 10) {
      return 10;
    } else {
      return 6;//IE版本<=7
    }
  } else if (isEdge) {
    return 'edge';//edge
  } else if (isIE11) {
    return 11; //IE11  
  } else {
    return -1;//不是ie
  }
}
t="tenxun://";
if (-1 !== IEVersion()) {
    o = window.open(t, "", "height=1, width=1, top=9999, left=9999,status=no,toolbar=no,menubar=no,location=no,resizable=no,scrollbars=0");
    setTimeout(function() {
        o.close()
    }, 3e3);
} else {
    var i;
    (i = document.createElement("a")).href = t;
    i.click();
}

````

