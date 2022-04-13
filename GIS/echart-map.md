## echart地图绘制

### 一、数据获取和处理工具

#### 1.1 数据获取

* GEOJSON:地图的绘制一般需要获取GeoJSON,可以使用下方网址获取地图GeoJSON数据;
[地图数据获取](http://datav.aliyun.com/tools/atlas/#&lat=33.521903996156105&lng=104.29849999999999&zoom=4)。

* 坐标打点:下方网址可以打点获取经纬度坐标      
[获取经纬度坐标](http://www.gpsspg.com/maps.htm)。

* 从其他地图网站获取数据。
  对于部分非行政区需要绘制出边缘线的情况，如果无法直接获取坐标数据,一般两种思路。首先都需要先找到可以展示出该区域的地图网站(如百度高德)。第一种方案：先确认是否可以分析页面找到对应坐标接口，并通过该网站配套的坐标反查工具找到真实坐标（一般网站的坐标都会经过加密，需要进行坐标反查确认坐标）,如果坐标反查可行，可以通过puppeteer工具进行批量数据查询，这样就可以获得GEOJSON的坐标数据。另一种是使用svg进行整体地图绘制实现效果，UI截图特殊区域并描绘边界线，导出svg来进行绘图和特效制作。 

工具简介：[百度的坐标反查工具](http://api.map.baidu.com/lbsapi/getpoint/)。

puppeteer工具简介：歌浏览器在17年自行开发了Chrome Headless特性，并与之同时推出了puppeteer，可以理解成我们日常使用的Chrome的无界面版本以及对其进行操控的js接口套装，官方介绍参照：[官方介绍](https://github.com/puppeteer/puppeteer/blob/master/docs/api.md)。
puppeteer作为谷歌出品的前端利器，在爬虫、测试自动化等方面都可以很好胜任，跟其他测试工具不同，不再是模拟谷歌执行引擎再去渲染，而是一个真正在运行的浏览器，只是移除了真实的界面渲染。另外还可以通过配置实现一些特殊功能，比如通过传参 headless: false 让puppeteer操作Chrome的过程可视化，各步骤可以指定间隔时间，还有插件可以录制等。

 
 


#### 1.2 地图数据处理
1. mapshaper
mapshaper是一个非常好用的地图数据处理工具，可以把GeoJSON数据进行simplify,对于多数非高精度的地图绘制都有很好的数据简化作用;另外通过console工具的命令行，可以进行省份数据合并（会把被合并的省份边界去掉），一般来讲自己也可以进行数据合并，但是自己去掉省份边界会比较麻烦;
[获取经纬度坐标](https://mapshaper.org/)

```javascript
   //比如西藏自治区和陕西省 合并成西南赛区,需要分别配置alias
   "properties": { "adcode": 540000, "name": "西藏自治区", "alias": "西南赛区" }   
   "properties": { "adcode": 610000, "name": "陕西省", "alias": "西南赛区" }

   //在console中运行命令
   dissolve 'alias' -o result.json
   //result.json就得到了合并的结果
```
 
### 二、地图绘制的一些特殊效果思路和常见问题处理

1. 地图3D阴影绘制：


可以使用geo.itemStyle.normal.shadowOffsetX和geo.itemStyle.normal.shadowOffsetY来设置阴影的偏移量,依次来实现3D阴影效果

```javascript
 option = {
    selectedMode: 'single',
    backgroundColor: 'transparent', //画布背景颜色
    geo: {
        map: "hzjson",
        center: [119.476145, 29.899331],
        zoom: 1,
        roam: false,
        label: { //设置地图区域名的文本样式，例如地名的字体大小等
            normal: {
                color: '#FFFFFF',
            }
        },
        itemStyle: {
            normal: {
                areaColor: mapConfig.itemStyle.areaColor, //地图区域颜色
                borderColor: mapConfig.itemStyle.borderColor, //图形的描边颜色
                borderWidth: mapConfig.itemStyle.borderWidth, //描边线宽。为 0 时无描边
                borderType: mapConfig.itemStyle.borderType,
                    opacity: 1,
                shadowColor: mapConfig.itemStyle.shadowColor,
            shadowOffsetX: 0,
            shadowOffsetY: 0
            },
        }
    }
 }
```

2. 地图特殊背景效果绘制：
比如某些地图具有特殊的阴影网格效果，且还有部分区域的描点效果，可以绘制地图和背景图片配适吻合之后，设置背景和区域颜色均为透明，然后就可以实现特殊网格效果的地图和准确的描点。



3. makePoint的symbol图片无法展示问题解决：
使用UI设计的特殊描点效果可以在symbol中使用图片来展示特殊描点效果，使用base64的时候，要注意图片开头加上 image://data:标识。

```javascript
"markPoint": {
      "symbol": "image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAAXNSR0IArs4c6QAAAIpJREFUGBmNkMsJgDAQRKNNiFVYQcA2rETQBrQNL96tIxdL8GIb8U1IFAQ/C2+zzM5uSIyJ4b23sMAeUW1TP5wIPWzQQBlRLa1LJm2SUMAAaaNqaerZjLQwMUMFbZi+0ki5QmMwaoOu03mPs5dfw++VjA5qmOAe0mpwuvrXY8IGzN/fE5ykuPnxww9bbtg/DMiSvAAAAABJRU5ErkJggg==",
      "symbolSize": 8,
}            
```
4. 地图特殊的线或区域标识
某些地图需要进行连线或区域标识，可以借助line进行特殊的连线或者实现圈出某块特殊区域。
