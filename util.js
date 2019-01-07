
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
	
	/*let week = {
		"0" : "一",
		"1" : "二",
		"2" : "三",
		"3" : "四",
		"4" : "五",
		"5" : "六",
		"6" : "日"
	};
	if(/(E+)/.test(fmt)){
		fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "星期" : "周") : "")+week[this.getDay()+""]);
	}*/
	return fmt;
};

/**
 * 获取范围随机数
 * @param min
 * @param max
 * @returns {number}
 */
Math.getRandomFromRange=function (min, max) {
	var r = this.random() * (max - min);
	var re = this.round(r + min);
	re = this.max(this.min(re, max), min);
	return re;
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
