## 一、组件兼容性整理

### 1.1、富文本编辑器

### 1.ckeditor
* ckeditor5在ie11下是不兼容的，要想在ie11下正常运行，可能需要较低版本的ckeditor,在解决兼容性的时候，发现ckeditor4是兼容ie11的。
* ckeditor4不支持移动端，ie6,ie7不支持，ie8,ie9有限支持。ie10+完全支持。火狐浏览器、谷歌浏览器最新版本都支持。

### 2.wangEditor
*  wangEditor3 支持：IE10+
*  目前前端组件库版本：wangeditor2,文档：https://www.kancloud.cn/wangfupeng/wangeditor2/113991
基本的选择图片上传（IE8、9使用form方式上传，其他浏览器使用html5方式上传）
chrome、firefox、opera、IE11的粘贴截图上传
拖拽图片上传，支持到IE10
上传进度条，支持到IE10
跨域上传，支持到IE10

* 欠缺编写使用示例
 
 