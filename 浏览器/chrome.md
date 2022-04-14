## chrome


1. 关于 Chrome （谷歌浏览器）升级到 80 后可能产生的影响以及解决方案
 Google 将在2020年2月4号发布的 Chrome 80 版本（schedule：https://www.chromestatus.com/features/schedule）中默认屏蔽所有第三方 Cookie，即默认为所有 Cookie 加上 SameSite=Lax 属性（https://www.chromestatus.com/feature/5088147346030592），并且拒绝非Secure的Cookie设为 SameSite=None（https://www.chromestatus.com/feature/5633521622188032）此举是为了从源头屏蔽 CSRF 漏洞

 [关于 Chrome （谷歌浏览器）升级到 80 后可能产生的影响以及解决方案](https://developer.aliyun.com/article/743364)