//fzfQuery的基本结构是一个闭包
(function(window){
	var 
	//创建fzfQuery的构造函数
		fzfQuery = function(selector){
			return new fzfQuery.fn.init(selector);
		};
		//fzfQuery的原型对象
		fzfQuery.fn = fzfQuery.prototype = {
			constructor:fzfQuery,
		init:function(selector){
			selector = fzfQuery.trim(selector);
			//布尔值是假的情况返回空的jquery对象
			if(!selector){
			}
			//如是函数的话返回有document的jquery对象,当页面所有的DOM节点加载完毕后执行传入的函数
			else if(fzfQuery.isFunction(selector)){
				document.addEventListener('DOMContentLoaded',function(){
					selector();
				});
				this[0] = document;
				this.length = 1;
			//处理字符串	
			}else if(fzfQuery.isString(selector)){
				//HTML代码处理
				if(fzfQuery.isHTML(selector)){
					var tmpDom = document.createElement('div');
					tmpDom.innerHTML = selector;
					// console.log(tmpDom.children);
					/*
					for(var i = 0;i<tmpDom.children.length;i++){
						this[i] =  tmpDom.children[i];
					}
					this.length = tmpDom.children.length;
					*/
					[].push.apply(this,tmpDom.children);
				//选择器处理	
				}else{
					var doms = document.querySelectorAll(selector);
					// console.log(doms);
					/*
					for(var i = 0;i<doms.length;i++){
						this[i] = doms[i];
					}
					this.length = doms.length;
					*/
					[].push.apply(this,doms);
				}	
			}
			else if(fzfQuery.isArray(selector)){
				//由于apply转伪数组有兼容问题(IE8以下不兼容),所以把所有传入的数组转换成真数组
				var tmpArr = [].slice.call(selector);
				
				//把转换后的真数组转换成伪数组
				[].push.apply(this,tmpArr);
			}else{
				this[0] = selector;
				this.length = 1;
			}
			return this;
	},
	selector:"",
	length:0,
	fzfQuery:'1.0.0',
	push:[].push,
	sort:[].sort,
	splice:[].splice,
	toArray:function(){
		return [].slice.call(this);
	},
	get:function(num){
		//arguments 是一个类数组对象。代表传给一个function的参数列表。
		if (arguments.length == 1) {
			if (num >=0) {
				return this[num];
			}else{
				return this[this.length+num];
			}
		}else{
			return this.toArray();
		}
	},
	eq:function(num){
		if (arguments.length == 1) {
			return fzfQuery(this.get(num));
		}else{
			return new fzfQuery();
		}
	},
	first:function(){
     	return this.eq(0);
	},
	last:function(){
		return this.eq(-1);
	},
	each:function(fn){
		return fzfQuery.each(this,fn);
	},
	map:function(fn){
		return kQuery(kQuery.map(this,fn));
	}


};
	fzfQuery.extend = fzfQuery.prototype.extend = function(obj){
		for(key in obj){
			this[key] = obj[key];
		}
	};
	fzfQuery.extend({
		isFunction:function(str){
			return typeof str === 'function';
		},
		isString:function(str){
			return typeof str === 'string';
		},
		isHTML:function(str){
			return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
		},
		isArray:function(str){
			return this.isObject(str) && length in str;
		},
		isObject:function(str){
			return typeof str === 'object';
		},
		trim:function(str){
			if(this.isString(str)){
				//用正则去掉字符串的前后空格
				return str.replace(/^\s+|\s+$/g,'');
			}else{
				return str;
			}	
		},
		each:function(arr,fn){
			if (fzfQuery.isArray(arr)) {
				for(var i = 0;i<arr.length;i++){
					 var res = fn.call(arr[i],i,arr[i]);
					 if (res == false) {
					 	break;
					 }else if (res == true) {
					 	continue;
					 }
				}
			}else{
				for(key in arr){
					 var res = fn.call(arr[key],key,arr[key]);
					 if (res == false) {
					 	break;
					 }else if (res == true) {
					 	continue;
					 }
				}
			}
			return arr;
		},
		map:function(arr,fn){
			var retArr = [];
			if (fzfQuery.isArray(arr)) {
				for (var i = 0; i < arr.length; i++) {
					var res = fn(arr[i],i);
					if (res) {
						retArr.push(res);
					}

				}
			}else{
				for(key in arr){
					var res = fn(arr[key],key);
					if (res) {
						retArr.push(res);
					}
				}
			}
			return retArr;
		}

	});
	fzfQuery.fn.extend({
		html:function(content){
			if (content) {
				this.each(function() {
					this.innerHTML = content;
				});
				return this;
			}else{
				return this[0].innerHTML;
			}
		},
		text:function(content){
			if (content) {
				this.each(function() {
					this.innerText = content;
				});
				return this;
			}else{
				var str = '';
				this.each(function() {
					str += this.innerText;
				});
				return str;
			}
		},
		attr:function(arg1,arg2){
			if (fzfQuery.isObject(arg1)) {
				this.each(function(index, el) {
					var dom = this;
					fzfQuery.each(arg1,function(attr,value) {
						dom.setAttribute(attr,value);
					});
				});
			}else{
				if (arguments.length == 1) {
					return this[0].getAttribute(arg1);
				}else{
					this.each(function(){
						this.setAttribute(arg1,arg2);
					});
				}
			}
			return this;
		},
		removeAttr : function(attr){
			if (attr) {
				this.each(function(){
					this.removeAttribute(attr);
				});
			}
			return this;
		},
		val:function(val){
			if (val) {
				this.each(function(){
					this.value = val;
				});
				return this;
			}else{
				return this[0].value;
			}
		}
	});
	fzfQuery.fn.init.prototype = fzfQuery.fn;

	window.fzfQuery = window.$ = fzfQuery;
})(window);