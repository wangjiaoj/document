
## CSS

## 二、字体问题
 * chrome浏览器默认设置能显示的最小字体是12px,也就是说如果给css样式小于12px,那么还会显示12px.这需要手动设置才行.但浏览器用户一般都不会去设置这个.所以让字体不要小于12像素,否则chrome浏览器没法显示。
 * 加粗效果可能需要跟UI做协商
font-weight的500其实没效果的样子

### 三、关于换行的问题:
主要涉及到三个属性white-space;word-break;word-wrap;
* White-space:属性用于设置如何处理元素中的空白.
  +  normal :默认值,空白会被浏览器忽略.
  +  Pre:空白会被浏览器保留,其行为方式类似于HTML中的<pre>标签.
  +  Nowrap:文本不会换行,文本会在同一行上继续,直到遇到<br>标签为止.
  +  Pre-wrap:保留空白符序列,但是正常的进行换行.
  +  Pre-line:合并空白符序列,但是保留换行符.
  +  Inheri:从父元素继承.
* Word-break:
  + Normal:使用浏览器默认的换行规则.
  + Break-all:允许在单词内换行.
  + Keep-all:只能在半角空格或连字符处换行.
* Word-wrap:
  + Normal:只在允许的断字点换行(浏览器保持默认处理).
  + Break-word:在长单词或URL地址内部进行换行.
创建几种使用场景:
固定长度,超过长度显示...(需要设置white-space:nowarp,保证不换行);
使用连续的英文字符或数字时,超过设定的宽度:(设置word-break:break-all或者word-warp:break-word;区别在于允许一个单词换行和将一个完整单词放在下一行)