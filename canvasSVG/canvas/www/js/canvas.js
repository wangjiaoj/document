/***
 * canvas工具简单封装
 * 
 *  */
(function() {
    window.c2D = {
        lineData: [], //数据格式:[{x:"0",y:"0"},{x:"0",y:"0"}]
        init: function(id, width, height) {
            window.c2D.canvas = document.getElementById(id);
            c2D.canvas.width = width ? width : 1024;
            c2D.canvas.height = height ? height : 768;
            window.c2D.context = this.canvas.getContext('2d');
            return this;
        },
        fillStyleColor: function(color) {
            this.fillColor = color;
            return this;
        },
        //@绘制一个填充的矩形
        fillrect: function(x, y, w, h) {
            var context = this.context;
            context.fillRect(x, y, w, h);
            context.fillStyle = this.fillColor;
            context.fill(); //填充色
            return this;
        },
        //@绘制一个矩形的边框
        strockRect: function(x, y, w, h) {
            var context = this.context;
            context.strokeStyle = this.strokeColor;
            context.strokeRect(x, y, w, h);
            return this;
        },
        //@清除指定矩形区域，让清除部分完全透明
        clearRect: function(x, y, w, h) {
            var context = this.context;
            context.clearRect(x, y, w, h);
            return this;
        },
        drawImage: function(image, x, y) {
            var context = this.context;
            context.drawImage(image, x, y);
            return this;
        },
        //------------上方直接绘制矩形,下方是先设置数据后面调用draw绘制
        //@react接受单组参数
        lineReact: function(x, y, w, h) {
            this.style = "rect";
            this.rectData = { x: x, y: y, w: width, h: h };
            return this;
        },
        //@ line接受多组参数，所以此处采用数组
        line: function(lineData) {
            this.style = "line";
            this.lineData = lineData;
            return this;
        },
        //@ 以 x,y为圆心绘制弧线  默认为顺时针
        lineArc: function(x, y, radius, startAngle, endAngle, counterClockwise) {
            this.style = "arc";
            this.arcData = { x: x, y: y, radius: radius, startAngle: startAngle, endAngle: endAngle, counterClockwise: counterClockwise };
            return this;
        },
        //@ 绘制弧线
        /**  rcTo()方法将利用当前端点、端点1(x1,y1)和端点2(x2,y2)这三个点所形成的夹角，然后绘制一段与夹角的两边相切并且半径为radius的圆上的弧线。弧线的起点就是当前端点所在边与圆的切点，弧线的终点就是端点2(x2,y2)所在边与圆的切点，并且绘制的弧线是两个切点之间长度最短的那个圆弧。此外，如果当前端点不是弧线起点，arcTo()方法还将添加一条当前端点到弧线起点的直线线段。*/
        lineArcTo: function(startX, startY, x1, y1, x2, y2, radius) {
            this.style = "arcTo";

            this.arcToData = { startX: startX, startY: startY, x1: x1, y1: y1, x2: x2, y2: y2, radius: radius };
            return this;
        },
        lineBezierCurveTo: function(c1x, c1y, c2x, c2y, x, y) {
            //@ 绘制曲线
            this.style = "bezierCurveTo";
            this.bezierCurveToData = { c1x: c1x, c1y: c1y, c2x: c2x, c2y: c2y, x: x, y: y };
            return this;
        },
        draw: function() {
            //@ 绘制路径
            var context = this.context;
            context.beginPath();
            if (this.style === "line") {
                var coordinate = this.lineData;
                context.moveTo(coordinate[0].x, coordinate[0].y);
                for (var i = 1; i < coordinate.length; i++) {
                    context.lineTo(coordinate[i].x, coordinate[i].y);
                }
            } else if (this.style === "rect") {
                var coordinate = this.rectData;
                context.rect(coordinate.x, coordinate.y, coordinate.w, coordinate.h);
            } else if (this.style === "arc") {
                var coordinate = this.arcData;
                context.arc(coordinate.x, coordinate.y, coordinate.radius, coordinate.startAngle, coordinate.endAngle, coordinate.counterClockwise);
            } else if (this.style === "arcTo") {
                var coordinate = this.arcToData;
                context.moveTo(coordinate.startX, coordinate.startY);
                context.arcTo(coordinate.x1, coordinate.y1, coordinate.x2, coordinate.y2, coordinate.radius);
            }
            if (this.fillColor) {
                context.fillStyle = this.fillColor;
                context.fill(); //填充色
            }

            context.closePath();
            context.lineWidth = 1;
            context.strokeStyle = "black";
            context.stroke(); //画线
            return this;
        },
        fillText: function(obj) {
            //@绘制文字 参数格式{style:{font:"",textAlign:"".baseline:""},text:{string:"",x:"",y:""}}
            var context = this.context;
            for (var item in obj.style) {
                context[item] = obj.style[item];
            };
            context.fillText(obj.text.string, obj.text.x, obj.text.y);
            return this;
        },
        strokeText: function(obj) {
            //@ 参数格式{style:{font:"",textAlign:"",baseline:""},text:{string:"",x:"",y:""}}
            var context = this.context;
            for (var item in obj.style) {
                context[item] = obj.style.item;
            };
            context.strokeText(obj.text.string, obj.text.x, obj.text.y)
        },
        moveTo: function(x, y) {
            this.context.moveTo(x, y);
            return this;
        }
    }

}());