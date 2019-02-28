
/**
 * 日期格式化
 * @param fmt
 * @returns {string}
 */
Date.prototype.format = function (fmt="yyyy-MM-dd") { //author: meizz
	let o = {
		"M+": this.getMonth() + 1,                 //月份
		"d+": this.getDate(),                    //日
		"H+": this.getHours(),                   //小时
		"m+": this.getMinutes(),                 //分
		"s+": this.getSeconds(),                 //秒
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度
		"S": this.getMilliseconds()             //毫秒
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	
	let week = {
		"0" : "日",
		"1" : "一",
		"2" : "二",
		"3" : "三",
		"4" : "四",
		"5" : "五",
		"6" : "六"
	};
	if(/(E+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);
	}
	return fmt;
};

/**
 * 获取范围随机数
 * @param min
 * @param max
 * @returns {number}
 */
Math.getRandomFromRange=function (min, max) {
	let r = this.random() * (max - min);
	let re = this.round(r + min);
	re = this.max(this.min(re, max), min);
	return re;
};

/**
 * 四则运算
 * @param num1 第一个操作数
 * @param num2 第二个操作数
 * @param method
 * @returns {string}
 * @constructor
 */
Math.callFloat = function(num1, num2, method="+") {
	let re = /\s/g;
	let a = num1.toString().replace(re, "");
	let b = num2.toString().replace(re, "");
	a = a.replaceAll(',', '');
	b = b.replaceAll(',', '');
	//修复乘法小数点过长溢出问题 切除6位小数点以后的数据
	a = a.indexOf(".") > 0 ? a.substr(0, a.indexOf(".") + 7) : a;
	b = b.indexOf(".") > 0 ? b.substr(0, b.indexOf(".") + 7) : b;
	
	let cutN = "10000000000000";
	let cutZero = "00000000000";
	
	let dot = ".";
	
	//将小数输入为整数
	
	let adot = a.indexOf(dot) > 0 ? a.length - a.indexOf(dot) : 0;
	let bdot = b.indexOf(dot) > 0 ? b.length - b.indexOf(dot) : 0;
	
	let cutA = adot > 0 ? parseInt(cutN.substr(0, adot)) : 1;
	let cutB = bdot > 0 ? parseInt(cutN.substr(0, bdot)) : 1;
	
	let maxcutAB = Math.max(cutA, cutB);
	let mincutAB = Math.min(cutA, cutB);
	
	let cutAB = maxcutAB / mincutAB;
	let numA = 0; let numB = 0;
	
	let inzero = cutZero.substr(0, (cutAB.toString()).length - 1);
	let cutLen = (maxcutAB.toString()).length - 1;
	
	if (adot == bdot) {
		numA = parseInt(a.replace(dot, ""), 10);
		numB = parseInt(b.replace(dot, ""), 10);
	} else if (adot > bdot) {
		numA = parseInt(a.replace(dot, ""), 10);
		numB = parseInt(b.replace(dot, "") + inzero, 10);
	} else {
		numB = parseInt(b.replace(dot, ""), 10);
		numA = parseInt(a.replace(dot, "") + inzero, 10);
	}
	
	let numAB = "0.0";
	let lastN = "0.0";
	
	switch (method) {
		case "+": //加
			numAB = ((numA + numB) / maxcutAB).toString();
			break;
		
		case "-": //减
			numAB = ((numA - numB) / maxcutAB).toString();
			break;
		
		case "*": //星号
		case "×": //乘号
		case "x": //x
			numAB = (Math.abs(numA * numB)).toString();
			cutLen = cutLen * 2;
			break;
		
		case "÷": //除号
		case "/": //除
			numAB = (numA / numB).toString();
			break;
	}
	//对乘法的特别处理
	if (method === "×"||method === "*") {
		if (numAB.length <= cutLen) {
			numAB = cutZero.substr(0, cutLen - numAB.length + 1) + numAB;
		}
		if (Math.abs(numA * numB) != numA * numB) {
			numAB = "-" + numAB;
		}
		
		numAB = numAB.slice(0, numAB.length - cutLen) + "." + numAB.slice(numAB.length - cutLen);
	}
	return parseFloat(numAB).toString();
};


/**
 * 去除两边空格
 * @returns {string}
 */
String.prototype.trim = function(){return this.replace(/(^\s*)|(\s*$)/g, "");};

/**
 * 去除左边空格
 * @returns {string}
 */
String.prototype.leftTrim = function(){return this.replace(/(^\s*)/g, "");};

/**
 * 去除右边空格
 * @returns {string}
 */
String.prototype.rightTrim = function(){return this.replace(/(\s*$)/g, "");};

/**
 * 替换
 * @param s1
 * @param s2
 * @returns {string}
 */
String.prototype.replaceAll = function (s1, s2) {
	let r = new RegExp(s1.replace(/([\(\)\[\]\{\}\^\$\+\-\*\?\.\"\'\|\/\\])/g, "\\$1"), "ig");
	return this.replace(r, s2);
};

/**
 * 数组根据属性排序
 * @param option
 * @returns {any}
 */
Array.prototype.sortByAttr=function (option) {
	option = Object.assign({attr:'',type:'asc'},option);
	let {type,attr} = option;
	let a = this;
	let temp=a[0];
	for(let i=0;i<a.length-1;i++){
		for(let j=0;j<a.length-1-i;j++){
			let tmpA = a[j],tmpB=a[j+1];
			if(attr && ''!==attr){
				tmpA = a[j][attr];
				tmpB = a[j+1][attr];
			}
			if(tmpA>tmpB){
				temp=a[j];
				a[j]=a[j+1];
				a[j+1]=temp;
			}
		}
	}
	
	return type==='desc'?a.reverse():a;
};
