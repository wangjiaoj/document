# BFC

BFC 的创建
以下元素会创建 BFC：

根元素（<html>）
浮动元素（float 不为 none）
绝对定位元素（position 为 absolute 或 fixed）
表格的标题和单元格（display 为 table-caption，table-cell）
匿名表格单元格元素（display 为 table 或 inline-table）
行内块元素（display 为 inline-block）
overflow 的值不为 visible 的元素
弹性元素（display 为 flex 或 inline-flex 的元素的直接子元素）
网格元素（display 为 grid 或 inline-grid 的元素的直接子元素）

以上是 CSS2.1 规范定义的 BFC 触发方式，在最新的 CSS3 规范中，弹性元素和网格元素会创建 F(Flex)FC 和 G(Grid)FC。

 
链接：https://juejin.cn/post/6960866014384881671
 
