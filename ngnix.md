# ngnix

## 一、参考文档

[nginx 一把梭！（超详细讲解+实操）](https://juejin.cn/post/7306041273822527514)

[nginx中的location指令](https://zhuanlan.zhihu.com/p/137146854)


[Nginx如何启用ETag 和 lastmodified](https://blog.csdn.net/xiaoliuliu2050/article/details/103661200)


## 二、location指令

 
| 符号   | 含义 | 
| ----   | ----  |
| =	     | 精确匹配  | 
| ^~	 | 非正则匹配 | 
| ~	     | 正则匹配（区分大小写） | 
| ~*	 | 正则匹配（忽略大小写） | 
| !~	 | 正则不匹配（区分大小写） | 
| !~*	 | 正则不匹配（忽略大小写） | 
|        | 普通匹配（这里没有符号的时候） | 
| @      | nginx内部跳转 | 



## 三、ETAG
### 3.1 ETAG
ETag全称EntityTags，HTTP协议规格说明中定义“ETag”为“被请求变量的实体值”。我们也可以把ETag理解为是一个客户端与服务器关联的记号。这个记号告诉客户端，当前网页在上次请求之后是否有发生变化，当发生变化时，ETag的值重新计算，并返回200状态码。如果没有变化，返回304状态码。从而不会重新加载整个页面信息。

可以用来配置任意.html后缀的文件不缓存
````nginx
location ~ .+\.html{
    add_header Last_modified "";
    etsg off;
}
````

