## 关于IE代码兼容

### 一、基本兼容手段
#### 1、babel打包
#### 2、引入profill来模拟低版本浏览器可能不存在的新API
#### 3、注意css降级和一些超低版本浏览器的css hack

### 二、IE11 中需要特别注意的代码兼容性问题
#### 1、css3兼容
      IE11对flex布局的支持比较差，需要兼容IE11的时候，慎重使用flex布局
[Flex 布局教程：语法篇](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
    2、 关于文本超长显示。。。
       需要注意增加word-wrap:break-word;
#### 