# html页面导出成pdf解决方案
## urL-to-pdf-api



重点注意几个参数
* emulateScreenMedia true:@screen  ,false:@print
默认情况下,页面 @media print CSS rules 会被忽略。为了得到更接近桌面 Chrome的效果, 可以添加 &emulateScreenMedia=false查询参数 

````javascript
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

## pdf.js
也可以使用pdf.js完成转化

## 导出pdf问题
### 导出pdf中echart不展示问题
用pdf.js将网站内容转化成pdf，如果在网页中有echarts图的情况下，生成的图标会在pdf中显示为空白

解决方法：
````javascript   
    myChart.setOption(option);//写在echarts末尾
    var geturl = myChart.getDataURL('png');//获取生成的base64位图片地址
    $("#imgid").attr("src",geturl);//生成新图片
    $("#id").hide();//隐藏之前的echarts图

 ````

此处的效果是将之前的echarts图隐藏并生成base64位的图片代替之前的图片
另外需要将echarts图的animation设置为false,否则可能偶尔会遇到图片生成不完全。