## React-typescript


## 一、React-typescript

  将所有.js文件全部更名为.ts后缀，所有.jsx文件更名为.tsx
  必须引入react
  组件名称必须大写,否则tsx报错
  `Property XXX does not exist on type 'JSX.IntrinsicElements'`

  Tsx
  本质上，TSX为我们提供了创建React元素方法（React.createElement(component, props, ...children)）的语法糖（syntactic sugar）

  来自 <https://juejin.cn/post/6997593810465193992> 



  ## 二、事件引入

  [写了3个月React，我学到了什么？](https://mp.weixin.qq.com/s/8tEh0R95U47c1tKf2bzQJw)

1. ts开发,在绑定事件的时候,有很多事件类型需要进行声明
react本身就提供了很多事件类型,来帮助我们用ts进行事件类型约束。

2. 支持的事件Events:
 AnimationEvent,ChangeEvent, ClipboardEvent, CompositionEvent, DragEvent, FocusEvent, FormEvent, KeyboardEvent, MouseEvent, PointerEvent, TouchEvent, TransitionEvent, WheelEvent, SyntheticEvent,
 示例：
 >import { MouseEvent } from 'react'
可以使用MouseEvent<HTMLButtonElement>约束仅触发HTML button DOM的事件


3. SyntheticEvent 
* InputEvent较为特殊，因为是一个实验事件，因此可以用SyntheticEvent替代
* SyntheticEvent是什么类型？
* Synthetic -> 合成的
在React中，几乎所有的事件都继承了SyntheticEvent这个interface。SyntheticEvent是一个跨浏览器的浏览器事件wrapper，通常用于替代InpuEvent这样的事件类型。