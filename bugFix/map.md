##地图
### 数据获取

地图的绘制一般需要获取GeoJSON,可以使用下方网址获取地图GeoJSON数据;
[地图数据选择器](http://datav.aliyun.com/tools/atlas/#&lat=33.521903996156105&lng=104.29849999999999&zoom=4)
下方网址可以打点获取经纬度坐标
[获取经纬度坐标](http://www.gpsspg.com/maps.htm)


### 地图数据处理

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