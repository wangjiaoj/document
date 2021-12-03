# html页面导出成pdf解决方案
## 一、urL-to-pdf-api
[url-to-pdf-api](https://github.com/alvarcarto/url-to-pdf-api)
原理 ：Puppeteer无头浏览器 使用devTools protol对goole-chrome-headless 远程调用导出pdf的http服务
需要自行部署在服务器上

重点注意几个参数
* emulateScreenMedia true:@screen  ,false:@print
默认情况下,页面 @media print CSS rules 会被忽略。为了得到更接近桌面 Chrome的效果, 可以添加 &emulateScreenMedia=false查询参数 。这样也方便前端进行一些打印模式下的样式编写

* waitFor 导出时机判断上,允许固定时间或者等待某个ID的dom节点出现后导出,waitFor参数就是配置dom的ID


### 1.2 分页代码编写
1. 滚动
   除了html以外不要存在其他滚动条

2. 分页
css:
* break-all-before
* break-all-after

````css
     @media print {
        * {
            overflow: visible !important;
        }
        .page {
            //自行分页
            page-break-after: always;
        }
    }
````

使用devTool的设置MoreTool的Rendering中可以模拟print模式进行效果预览


3. 考虑打印等问题,一般设置宽度960px,也可以通过适当比例的缩放来解决这个问题

4. 关于多接口页面判断页面渲染完成思路
 * 发布订阅
 各个接口请求到数据处理后emit事件A
 订阅A:设置定时器,在定时时间范围内再次监听到A后,取消定时器,重新设置
 定时器触发时进行高度计算分页Class插入和DOM插入

 
## 二、JSPDF
也可以使用JSPDF完成转化
[JSPDF](https://github.com/parallax/jsPDF)
支持在浏览器端导出,可以考虑跟html2canvas结合使用
````javascript  
function () {
  var target = document.getElementsByClassName("right-aside")[0];
  target.style.background = "#FFFFFF";

  html2canvas(target, {
    onrendered:function(canvas) {
        var contentWidth = canvas.width;
        var contentHeight = canvas.height;

    //一页pdf显示html页面生成的canvas高度;
    var pageHeight = contentWidth / 592.28 * 841.89;
    //未生成pdf的html页面高度
    var leftHeight = contentHeight;
    //页面偏移
    var position = 0;
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    var imgWidth = 595.28;
    var imgHeight = 592.28/contentWidth * contentHeight;

    var pageData = canvas.toDataURL('image/jpeg', 1.0);

    var pdf = new jsPDF('', 'pt', 'a4');

    //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
    //当内容未超过pdf一页显示的范围，无需分页
    if (leftHeight < pageHeight) {
    pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
    } else {
        while(leftHeight > 0) {
            pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight;
            position -= 841.89;
            //避免添加空白页
            if(leftHeight > 0) {
              pdf.addPage();
            }
        }
    }

    pdf.save("content.pdf");
}
  })
}
 ````
### 2.1 导出pdf中echart不展示问题
用JSPDF将网站内容转化成pdf，如果在网页中有echarts图的情况下，生成的图标会在pdf中显示为空白

解决方法：
````javascript   
    myChart.setOption(option);//写在echarts末尾
    var geturl = myChart.getDataURL('png');//获取生成的base64位图片地址
    $("#imgid").attr("src",geturl);//生成新图片
    $("#id").hide();//隐藏之前的echarts图

 ````
此处的效果是将之前的echarts图隐藏并生成base64位的图片代替之前的图片
另外需要将echarts图的animation设置为false,否则可能偶尔会遇到图片生成不完全。
## 三、pdf.js

pdf.js是前端预览 PDF 文件 的插件



## 四、前端excel导出方案
[exceljs](https://github.com/exceljs/exceljs/blob/HEAD/README_zh.md)
读取，操作并写入电子表格数据和样式到 XLSX 和 JSON 文件。
