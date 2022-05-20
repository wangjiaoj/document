# BFC/IFC/FFC/GFC

[深入理解文档流（Document Flow）和视觉格式化模型（CSS Visual Formatting Model）](https://juejin.cn/post/6844904131342106638#heading-7)
[css - 视觉格式化模型 (visual formatting model )](https://juejin.cn/post/6945089335452827684#heading-11)

https://www.w3.org/TR/CSS22/visuren.html#visual-model-intro
[mdn - Visual_formatting_model](https://developer.mozilla.org/en-US/docs/Web/CSS/Visual_formatting_model)

## 一、视觉格式化盒模型

## 二、基础概念
BFC（Block Formatting Contexts），块级格式化上下文
盒模型
CSS 盒模型描述了通过 文档树中的元素 以及相应的 视觉格式化模型 所生成的矩形盒子。
视觉格式化模型
CSS 视觉格式化模型描述了盒子是怎样生成的，简单来说，它定义了盒子生成的计算规则，通过规则将文档元素转换为一个个盒子。

视觉格式化模型定义了盒（Box）的生成，其中的盒主要包括了块级盒,行内盒 和 匿名盒。
## 二、BFC 的创建
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

 
[可能是最好的BFC解析了](https://juejin.cn/post/6960866014384881671)
 
 
