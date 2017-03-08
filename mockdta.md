#数据转发接口

## 关于mockdata

### 用处： 完成数据接口的代理

### 扩展功能：

* 使用koa-router可以实现后端还没有给出数据接口的情况下使用虚拟接口访问本地的假数据文件
* 目标：可以配置数据类型然后生成相应的假数据


```javascript
 

```
[]()

在ProjectSet上的dev配置
context 匹配对应请求的的URL地址, 匹配的请求将被代理到目标主机
options.target 目标主机地址

打开一个监听端口，监听localhost：8000的请求