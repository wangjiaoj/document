# crm

页面结构简单描述：
Index页面作为外围框架页面,使用ligerui构建的外围框架，主内容区的tab页面通过嵌入iframe页面来实现。

改版思路：先改动Index框架，然后逐步修改其他页面。今年也会逐步进行PHP改版，PHP改版的时候要和前端一起排期,把目前深层次嵌套的iframe结构调整一下。
需要分析Index现行框架使用的和iframe页面的控制交互

## 一、外围框架
ligerui,示例：http://www.ligerui.com/demo.html  

>f_addTab(tabid, text, url, reload) //添加tab
>createTab(href, id, tabtitle, reload) //添加tab

```javascript
    var setting = {
        data: {
            simpleData: {
                enable: true,
                idKey: "id",
                pIdKey: "pid"
            }
        },
        callback: {
            onClick: zTreeOnClick,
            beforeClick: beforeClick
        }
    };
    var data = [];
    //左侧树data赋值
    var navtab = null;
    var accordion = null;
    var tree = null;
    $(function(){
        //布局
        $("#layout1").ligerLayout({
            topHeight: 32,
            leftWidth: 160,
            height: '100%',
            heightDiff: -1,
            space: 4
             , onHeightChanged: f_heightChanged
           , onEndResize: f_endResize
        });
        var height = $(".l-layout-center").height();
        $("#framecenter").ligerTab();
        navtab = $("#framecenter").ligerGetTabManager();
        var addurl=[]

        var param=$.param(addurl);
    
     	navtab.addTabItem({tabid: 'home', text: '我的主页', url: basePath+"/ifindcrm/home/welcome?"+param,showClose:false});
	
        $("#accordion1").ligerAccordion({height: height - 24, speed: null});
        accordion = $("#accordion1").ligerGetAccordionManager();

        tree = $.fn.zTree.init($('#tree1'), setting, data);
        if(addurl){
             var url=addurl.url;
			 if(url){
	             var id=addurl.pid;
	             node=tree.getNodeByParam('id',id,null);
	                 tree.expandNode(node, true);
			 }     
        }    
    });

    function f_heightChanged(options)
    {
        if (accordion && options.middleHeight - 24 > 0)
            accordion.setHeight(options.middleHeight - 24);
    }
    function f_endResize() {
        if (navtab)
            navtab.onResize();
    }
    function f_addTab(tabid, text, url, reload)
    {
        if (navtab.isTabItemExist(tabid)) {
            if (typeof(reload) != 'undefined' && reload) {
                navtab.reload(tabid,url)
            }
            navtab.selectTabItem(tabid);
        }
        else {
            if (url.indexOf('?') != -1) {
                url += '&__pageid=' + tabid;
            }
            else {
                url += '?__pageid=' + tabid;
            }
            navtab.addTabItem({tabid: tabid, text: text, url: url});
        }
    }
    function zTreeOnClick(event, treeId, treeNode) {
        if (treeNode.href.length > 0) {
            createTab(treeNode.href, treeNode.id, treeNode.name);
        }
        return false;
    }
    function beforeClick(treeId, treeNode) {
        var check = (treeNode && treeNode.isParent);
        if (check) {
            //是父节点，展开
            if (!treeNode.open) {
                tree.expandNode(treeNode, true);
            }
            else {
                tree.expandNode(treeNode, false);
            }

            return false;
        }
        return true;
    }

    function createTab(href, id, tabtitle, reload) {
        var reg = /^(http:\/\/|www\.)/i;
        //如果链接不是以http:、www开头的时候，则加上basePath
        if (!reg.test(href))
        {
            //如果链接不是以'/'开头的，则加上'/'
            var reg2 = /^\//;
            if (reg2.test(href)) {
                href = href;
            }
            else {
                href = '/' + href;
            }
            if (basePath.length > 0) {
                var reg3 = new RegExp("^" + basePath);
                if (!reg3.test(href)) {
                    href = basePath + href;
                }
            }
        }
        f_addTab(id, tabtitle, href, reload);
    }
   
    /**
     * 刷新父页面
     * @param {type} id
     * @returns {undefined}
     */
    function reflaseTab(id) {
        if (typeof(id) != 'undefined' && navtab) {
            navtab.reload(id);
        }
    }
    /**
     * 移除一个选项卡
     * @param {type} id
     * @returns {undefined}
     */
    function closeTab(id) {
        if (typeof(id) != 'undefined' && navtab) {
            navtab.removeTabItem(id);
        }
    }

```



## 二、内部页面iframe：
1、extjs：https://www.w3cschool.cn/extjs/extjs_layouts.html,
相关页面：《工作平台：开始-周报月报》
2、直接原生上手写
3、ligerui:相关页面：《工作平台：丢单合同-客户名称衍生页面》
4、自己单独写的个性化UI:相关页面：：《工作平台：EHR销售人员》

##  三、内嵌iframe和外围页面交互：
### 3.1.弹窗：
相关页面：

1. iframe内嵌页面按钮点击，在Index页面打开弹窗，弹窗内嵌iframe页面。
* 地址：《工作平台：丢单合同查看-查看弹窗》
* 调用方法和逻辑分析：

```javascript
 //传递参数
 var url = "/new_jgbcrm_dev/invoice/showinfo"+"?type=1&number=201901091203401";

 //调用：https://172.19.80.83:7443/new_jgbcrm_dev/js/common_new.js中通用方法
 openLhgDialogNew(url,850, 500, 'showinfo', "合同详细信息");
 //openLhgDialogNew中调用公用方法 $.dialog 没找到在那里定义的
 $.dialog({
            id:id,
            content:url,
            width:width,
            height:height,
            title:title,
            max:max,
	        min:min,
            lock:cover,
	        left:left,
            top:top,   
            parent:api,
            self:true,
            zIndex:zIndex    
         });

```

### 3.2.新页面：
点击打开新页面：在tab页中打开新页面。相关页面：
 iframe内嵌页面按钮点击，在Index页面打开tab页面。

1. 
* 地址：《工作平台：丢单合同查看-客户名称》
* 调用方法和逻辑分析：
tendToCustomer函数简单包装调用父页面的createTab
>  parent.parent.createTab(url, 'customerInfo_'+custSeq, custName);

* 地址：《工作平台：大于5年合同拆分-客户》
* 调用方法和逻辑分析：

2.  地址：《工作平台：丢单合同查看-查看弹窗》

## 四、其他组件使用和通用方法整理
### 4.1 其他组件使用
1. chart:
* highcharts
*

2. 日期插件：
My97DatePicker
    
### 4.2 通用js方法分析整理
1. 合并表格js:https://172.19.80.83:7443/new_jgbcrm_dev/ifindcrm/vendor/common/js/mergeCell.js
2. 通用方法: https://172.19.80.83:7443/new_jgbcrm_dev/js/common_new.js
*  openLhgDialogNew
> openLhgDialogNew(url,width, height, id, title, link, cover,left,top,max,min, parent,zIndex,time)
> openLhgDialogNew(url,850, 500, 'showinfo', "合同详细信息");

* nameLink
> nameLink(href, id, tabTitle, pre, activeId,industry)
>


## 五、新方法思路整理
### 5.1. 关于Tab页面(iframe)弹窗问题

弹窗一般涉及到遮罩层背景色和拖动的问题,所以最优设计是在父页面内创建弹窗,子页面通过其他方式间接调用    



1. 提供一些统一弹窗调用方法,比如成功提示，错误提示等。

在父页面统一定义成功提示、错误提示等弹窗 (弹窗关闭后销毁) 

```javascript

  function confirmDialogBridge(txt,fun){
    new Dialog({
        //弹窗的配置
        callback:function(){
             fun();
        }  
    });
  }
  function  successMsgBridge(txt)   {
     new Dialog({
        //成功弹窗的提示配置      
    });
  }
  function faildMsgBridge(txt)  {
    new Dialog({
        //失败弹窗的提示配置     
    });
  }
```

子页面引入通用js,对这些通用弹窗调用进行统一包装。
目前提供了非跨域子页面的处理方式,如何涉及到跨域等问题也可以在这一层级进行处理。

```javascript
var FramePageID;
function getCurrentFrameID(){
    //获取当前页面FramePageID
}
getCurrentFrameID();

 function confirmDialog(txt,fun){
    window.parent.confirmDialogBridge(txt,fun);
 }
     
 function successMsg(txt)  {
     window.parent.successMsgBridge(txt);
 } 
 function  faildMsg(txt)  {
     window.parent.faildMsgBridge(txt);
 }
```
子页面调用

```javascript
   var param = {};
   function repaintPage(params){};

   confirmDialog(txt,function(){
       GetData('xx/yydelete',{'id':id}).then((result)=>{
            if(result.code){
               successMsg('删除成功');
               //注意这部分函数是在父页面调用的,要写成写成
               window.frame[currentPageId].callRepaintPage();
            }else{
                faildMsg('删除失败') 
            }
       });
   });
   function callRepaintPage(){
      repaintPage(param)
   }
```


2. 自定义的弹窗逻辑 
    
父页面定义函数

```javascript
function createDialogBridge(func,funcParam,URL){
    //获取子函数传递来的func和URL
    if(url){
        //使用嵌入的iframe页面作为弹窗
        new Dialog({
            url:URL,
            onshow:function(){}
        });
    }else if(func){
       //执行func
       func(funcParam);
    }
}
```

子页面

```javascript
var data = {};
//定义在父页面运行的函数
function parentDialogFuncA(param){
    if(param){
        //to do
    }
    var template = $('templateId').html();
    // to do other
    new Dialog({
        html:templateId,
        onshow:function(){},
        callback:function(){
            //注意调用其他函数的时候要按照父页面的调用来定义
             window.frame[name].funcA(funcA);
        }
    })
    // do
}
function funcA(){};
//调用
 window.parent.createDialogBridge(parentDialogFuncA,data)

```


### 5.2. 关于Tab(iframe)页面新建或跳转问题
1. 对于左侧树的页面，是统一进行调用crateTab()创建的

2. 对于存在tab(iframe)页面的,点击打开新tab页的,统一使用crateTab()创建的


3. 关于iframe中嵌入tab需要再研究一下
