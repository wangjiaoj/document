//百分比
var pet = Math.random() * 100;
var pec = Math.round(pet);
//缩放比例
//			var match = Math.min((window.innerWidth / 260), window.innerHeight / 260);
var match = Math.min((500 / 260), 200 / 260);
var num = (1350 / 3600 + 27 / 3600 * pec) * 2 * Math.PI;
var time = 0;
var sa = 1350 / 3600 * 2 * Math.PI;
var ea = 1377 / 3600 * 2 * Math.PI;

function test() {
	var canvasObj = document.getElementById("diagonal");
	canvasObj.setAttribute("width", (match * 260) + "px");
	canvasObj.setAttribute("height", (match * 260) + "px");
	var ctx = canvasObj.getContext("2d");
	timer_line = window.setInterval("clock()", 30);
	time = 0;
}

function getpointx1(a, b, c, d, R1, R2) {
	var P = (a - c) / (d - b);
	var Q = (c * c - a * a + R1 * R1 - R2 * R2 - d * d + 2 * d * b - b * b) / (2 * (d - b));
	var Aa = P * P + 1;
	var Bb = 2 * P * Q - 2 * c;
	var Dd = Q * Q + c * c - R2 * R2;
	var E = Bb * Bb - 4 * Aa * Dd;
	if(E > 0) {
		var F = Math.sqrt(E);
		var x1 = (F - Bb) / (2 * Aa);
		return x1;
	} else {
		return -99999999999999999;
	}
}

function getpointx2(a, b, c, d, R1, R2) {
	var P = (a - c) / (d - b);
	var Q = (c * c - a * a + R1 * R1 - R2 * R2 - d * d + 2 * d * b - b * b) / ((2 * d) - (2 * b));
	var Aa = P * P + 1;
	var Bb = 2 * P * Q - 2 * c;
	var Dd = Q * Q + c * c - R2 * R2;
	var E = Bb * Bb - 4 * Aa * Dd;
	if(E > 0) {
		var F = Math.sqrt(E);
		var x2 = (-F - Bb) / (2 * Aa);
		return x2;
	} else {
		return -99999999999999999;
	}
}

function getpointy1(a, b, c, d, R1, R2) {
	var x = getpointx1(a, b, c, d, R1, R2);
	var y1 = (d * d - b * b - ((2 * x - a - c) * (c - a) + R2 * R2 - R1 * R1)) / (2 * (d - b));
	return y1;
}

function getpointy2(a, b, c, d, R1, R2) {
	var x = getpointx2(a, b, c, d, R1, R2);
	var y2 = (d * d - b * b - ((2 * x - a - c) * (c - a) + R2 * R2 - R1 * R1)) / (2 * (d - b));
	return y2;
}

function clock() {
	var ctx = document.getElementById('diagonal').getContext('2d');
	ctx.save();
	ctx.clearRect(0, 0, 260 * match, 260 * match);
	ctx.beginPath();
	//第一段颜色
	ctx.strokeStyle = 'rgba(0,173,239,1)';
	ctx.lineWidth = 20 * match;
	ctx.arc(130 * match, 130 * match, 120 * match, 1340 / 3600 * 2 * Math.PI, 2160 / 3600 * 2 * Math.PI, false);
	ctx.stroke();
	ctx.beginPath();
	//第二段颜色
	ctx.strokeStyle = 'rgba(102,204,154,1)';
	ctx.lineWidth = 20 * match;
	ctx.arc(130 * match, 130 * match, 120 * match, 2160 / 3600 * 2 * Math.PI, 3240 / 3600 * 2 * Math.PI, false);
	ctx.stroke();
	ctx.beginPath();
	//第三段颜色
	ctx.strokeStyle = 'rgba(59,89,152,1)';
	ctx.lineWidth = 20 * match;
	ctx.arc(130 * match, 130 * match, 120 * match, 3240 / 3600 * 2 * Math.PI, 4060 / 3600 * 2 * Math.PI, false);
	ctx.stroke();
	ctx.beginPath();
	//中间字体
	if(time <= 30) {
		ctx.fillStyle = "rgba(0,173,239,1)";
	}
	if(time <= 70 && time > 30) {
		ctx.fillStyle = "rgba(102,204,154,1)";
	}
	if(time > 70) {
		ctx.fillStyle = "rgba(59,89,152,1)";
	}
	ctx.lineWidth = 10 * match;
	ctx.textAlign = "center";
	//ctx.fillStyle = "#3A5998"; 
	ctx.font = 40 * match + "pt oblique";
	ctx.fillText(time + "%", 130 * match, 230 * match);
	//下方字体
	ctx.textAlign = "center";
	ctx.fillStyle = "#999999";
	ctx.font = 10 * match + "pt oblique ";
	ctx.fillText("指数", 130 * match, 250 * match);
	ctx.stroke();
	ctx.beginPath();
	ctx.save();
	//绘制小点
	for(var i = 0; i <= 100; i++) {
		ctx.save();
		ctx.translate(130 * match, 130 * match);
		if(i <= 30) {
			ctx.strokeStyle = "rgba(0,173,239,1)";
		}
		if(i <= 70 && i > 30) {
			ctx.strokeStyle = "rgba(102,204,154,1)";
		}
		if(i > 70) {
			ctx.strokeStyle = "rgba(59,89,152,1)";
		}
		//小点是否加租
		if(i == 0 || i % 10 == 0) {
			ctx.lineWidth = 2 * match;
			ctx.beginPath();
			ctx.rotate((1350 / 3600 + 27 / 3600 * i) * 2 * Math.PI - Math.PI * 3 / 4);
			ctx.moveTo(-72 * match, 70 * match);
			ctx.lineTo(-79 * match, 78 * match);
			ctx.stroke();
		} else {
			ctx.lineWidth = 1 * match;
			ctx.beginPath();
			ctx.rotate((1350 / 3600 + 27 / 3600 * i) * 2 * Math.PI - Math.PI * 3 / 4);
			ctx.moveTo(-76 * match, 74 * match);
			ctx.lineTo(-79 * match, 78 * match);
			ctx.stroke();
		}
		ctx.restore();
	} 
	ctx.beginPath();
	//指针
	for(var i = 0; i <= 100; i++) {
		var a = 130 * match;
		var b = 130 * match;
		var c;
		var d;
		var R1 = 93.6 * match;
		var R2 = 4.4 * match;
		var x, x1, x2, y;	
		if(i == 0) {
			c = 69 * match;
			d = 201 * match;
		}
		if(i <= 18) {
			x1 = getpointx1(a, b, c, d, R1, R2);
			x2 = getpointx2(a, b, c, d, R1, R2);
			if(x1 > x2) {
				x = x2;
				y = getpointy2(a, b, c, d, R1, R2);
			} else if(x1 < x2) {
				x = x1;
				y = getpointy1(a, b, c, d, R1, R2);
			}
		}
		if(i >= 19 && i < 86) {
			x1 = getpointx1(a, b, c, d, R1, R2);
			x2 = getpointx2(a, b, c, d, R1, R2);
			if(x1 > x2) {
				x = x1;
				y = getpointy1(a, b, c, d, R1, R2);
			} else if(x1 < x2) {
				x = x2;
				y = getpointy2(a, b, c, d, R1, R2);
			}
		}
		if(i >= 86) {
			x1 = getpointx1(a, b, c, d, R1, R2);
			x2 = getpointx2(a, b, c, d, R1, R2);
			if(x1 > x2) {
				x = x2;
				y = getpointy2(a, b, c, d, R1, R2);
			} else if(x1 < x2) {
				x = x1;
				y = getpointy1(a, b, c, d, R1, R2);
			}
		}
		c = x;
		d = y;
		if(i % 10 == 0) {
			ctx.fillText(i, x, y);
		}
	}
	ctx.textAlign = "center";
	ctx.font = 10 * match + "pt oblique ";
	ctx.stroke();
	ctx.translate(130 * match, 130 * match);
	ctx.scale(0.4, 0.4);
	time++;
	console.log(time)
	var se = ((time-1) * 27 + 1350) / 3600;
	if(se * 2 * Math.PI > num) {
		timer_line = window.clearInterval(timer_line);    

	}
	ctx.rotate(se * 2 * Math.PI);
	//指针颜色
	if(time <= 30) {
		ctx.strokeStyle = "rgba(0,173,239,1)";
	}
	if(time <= 70 && time > 30) {
		ctx.strokeStyle = "rgba(102,204,154,1)";
	}
	if(time > 70) {
		ctx.strokeStyle = "rgba(59,89,152,1)";
	}
	ctx.lineWidth = 2 * match;
	ctx.beginPath(); 
	//指针指向与大小控制
	for(var i = 0; i <= 16; i++) {
		ctx.lineTo(0 * match, (-16 + i) * match);
		ctx.lineTo(260 * match, 0 * match);
	}
	for(var i = 0; i <= 16; i++) {
		ctx.lineTo(0, (16 - i) * match);
		ctx.lineTo(260 * match, 0);
	}
	ctx.lineTo(-30 * match, 0);
	for(var i = 0; i <= 16; i++) {
		ctx.lineTo(0, (16 - i) * match);
		ctx.lineTo(-30 * match, 0);
	}
	for(var i = 0; i <= 16; i++) {
		ctx.lineTo(0, (-16 + i) * match);
		ctx.lineTo(-30 * match, 0);
	}
	ctx.stroke();
	ctx.beginPath();
	//中心圆圈
	ctx.arc(0, 0, 6 * match, 0, Math.PI * 2, true);
	ctx.fill();
	ctx.restore();
}