## 移动端那些年踩过的坑

### ios问题整理
1、input光标问题
 做一个模拟弹窗，input点击触发弹窗打开，存在一个问题，input中的光标，在弹窗打开后，依然可以看到,input设置成readonly依然存在这一问题，需要设置input类型为disabled:disabled才能够解决；
2、fix布局失效问题
 在手机键盘打开后，fix布局失效，布局效果类似relative,需要使用其他布局方案来做代替

3、ios软键盘打开对于绝对定位absolute也会有一定影响