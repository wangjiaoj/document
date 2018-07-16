(function(){
	window.c2D={
		lineData:[],//[{x:"0",y:"0"},{x:"0",y:"0"}]
		init:function(id,width,height){
              window.c2D.canvas=document.getElementById(id);
              c2D.canvas.width=1024;
              c2D.canvas.height=768;
              
              window.c2D.context=this.canvas.getContext('2d');
              return this;
        },
        fillStyleColor:function(color){
        	this.fillColor=color;
        	return this;
        },

        fillrect:function(x,y,w,h){
            //@ line接受多个参数，所以此处采用数组
            var context=this.context;
            context.fillRect(x,y,w,h);
            context.fillStyle=this.fillColor;
            context.fill();//填充色
        	return this;
        },
        strockRect:function(x,y,height,weight){
        	var context=this.context;
            context.strokeStyle=this.strokeColor;
            context.strokeRect(x,y,w,h);
        	return this;
        },
        clearRect:function(x,y,height,weight){
        	var context=this.context;
        	context.clearRect(x,y,w,h);
        	return this;
        },
        lineReact:function(){
        	this.style="rect";
        	this.rectData={x:x,y:y,h:height,w:weight};
        	return this;
        },
        line:function(lineData){
        	//@ line接受多个参数，所以此处采用数组
        	this.style="line";
        	this.lineData=lineData;
        	return this;
        },
        lineArc:function(x,y,radius,startAngle,endAngle,counterClockwise){
        	//@ 以 x,y为圆心绘制弧线
        	this.style="arc";
        	this.arcData={x:x,y:y,radius:radius,startAngle:startAngle,endAngle:endAngle,counterClockwise:counterClockwise};
        	return this;
        },
        lineArcTo:function(x1,y1,x2,y2,radius){
        	//@ 绘制弧线
        	this.style="arcTo";
        	this.arcToData={x1:x1,y1:y1,x2:x2,y2:y2,radius:radius};
        	return this;
        },
        lineBezierCurveTo:function(c1x,c1y,c2x,c2y,x,y){
        	//@ 绘制曲线
        	this.style="bezierCurveTo";
        	this.bezierCurveToData={c1x:c1x,c1y:c1y,c2x:c2x,c2y:c2y,x:x,y:y};
        	return this;
        },
		draw:function(){
			//@ 绘制路径
			var context=this.context;
            context.beginPath();
            if(this.style==="line"){
             	var coordinate=this.lineData;
             	context.moveTo(coordinate[0].x,coordinate[0].y);
             	for(var i=1;i<coordinate.length;i++){
             		context.lineTo(coordinate[i].x,coordinate[i].y);
             	}
        
             }
             else if(this.style==="rect"){
             		var coordinate=this.rectData;
             		context.rect(coordinate.x,coordinate.y,coordinate.w,coordinate.h);
             }
             else if(this.style==="arc"){
             		var coordinate=this.arcData;
             		context.arc(coordinate.x,coordinate.y,coordinate.radius,coordinate.startAngle,coordinate.endAngle,coordinate.counterClockwise);
             }
             else if(this.style==="arcTo"){
             		var coordinate=this.arcToData;
             		context.arcTo(coordinate.x1,coordinate.y1,coordinate.x2,coordinate.y2,coordinate.radius);
             }
             if(this.fillColor){
             	 context.fillStyle=this.fillColor;
             	  context.fill();//填充色
             }
            
             context.closePath();
             context.lineWidth=1;
             context.strokeStyle="black";
             context.stroke();//画线
            return this;
         },
         fillText:function(obj){
         	//@ 使用格式{style:{font:"",textAlign:"".baseline:""},text:{string:"",x:"",y:""}}
         	var context=this.context;
         	for(var item in obj.style){
         		 context[item]=obj.style[item];
         	};
         	context.fillText(obj.text.string,obj.text.x,obj.text.y);
         	return this;
         },
         strokeText:function(obj){
         	//@ 使用格式{style:{font:"",textAlign:"",baseline:""},text:{string:"",x:"",y:""}}
         	var context=this.context;
         	for(var item in obj.style){
         		 context[item]=obj.style.item;
         	};
         	context.strokeText(obj.text.string,obj.text.x,obj.text.y)
         }
	}
          
}());
 
         




 