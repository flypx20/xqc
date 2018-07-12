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
		},
		toWords:function(str){
			return str.match(/\b\w+\b/g);
		},
		addEvent:function(dom,eventName,fn){
			if(dom.addEventListener){
				dom.addEventListener(eventName,fn);
			}else{
				dom.attachEvent('on'+eventName,fn);
			}
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
		},
		css:function(arg1,arg2){
			if (fzfQuery.isString(arg1)) {
				if (arguments.length == 1) {
					if(this[0].currentStyle){//兼容低级浏览器
						return this[0].currentStyle[arg1];
					}else{
						return getComputedStyle(this[0],false)[arg1];
					}
				}else if (arguments.length==2) {
					this.each(function() {
						this.style[arg1] = arg2;
					});
				}

			}else if (fzfQuery.isObject(arg1)) {
				this.each(function() {
					for (key in arg1){
						this.style[key] = arg1[key];
					}
				});
			}
			return this;
		},
		hasClass : function(arg){
			var res = false;
			if (arg) {
				var reg = eval('/\\b'+arg+'\\b/');
				this.each(function() {
					if (reg.test(this.className)) {
						res = true;
						return false;
					}
				});
			}
			return res;
		},
		addClass : function(arg){
			if (arg) {
				var name = fzfQuery.toWords(arg);
				this.each(function(){
					for(var i= 0; i<name.length;i++){
						if (!$(this).hasClass(name[i])) {
							this.className +=(' '+name[i]);
						}
					}
				});
			}
			return this;
		},
		removeClass:function(arg){
	    	this.each(function() {
	    		 if (arg) {
	    		 	var name = fzfQuery.toWords(arg);
	    		 	for(var i =0;i<name.length;i++){
	    		 		var reg =  eval('/\\b'+name[i]+'\\b/');
	    		 		if ($(this).hasClass(name[i])) {
			          		this.className = this.className.replace(reg, ' ');
			       		}
	    		 	}
		        }else{
		            this.className = "";
		        }

	    	});
	  		 return this;
  		},
  		toggleClass:function(arg1,arg2){
  				if (arguments.length == 0) {
  					this.each(function() {
  						this.className = "";
  					});
  				}else if (fzfQuery.isString(arg1)) {
  					this.each(function() {
  						var name = fzfQuery.toWords(arg1);
  						for (var i = 0; i < name.length; i++) {
  							if ($(this).hasClass(name[i])) {
  								$(this).removeClass(name[i]);
  							}else{
  								$(this).addClass(name[i]);
  							}
  					}
  					});

	  			}else if (fzfQuery.isFunction(arg1)) {
	  				//this.toggleClass();
  				}
  				return this;
  		}
	});
	//fzfquery操作DOM节点方法；
	fzfQuery.fn.extend({
		empty:function(){
			this.each(function(index, el) {
				this.innerHTML= '';
			});
			return this;
		},
		remove:function(sec){
			if (sec) {
				var doms = document.querySelectorAll(sec);
				this.each(function() {
					for (var i = 0; i < doms.length; i++) {
						if (this == doms[i]) {
							this.parentNode.removeChild(this);
						}
					}
				});
			}else{
				this.each(function() {
					this.parentNode.removeChild(this);
				});
			}
			return this;
		},
		append:function(source){
			if (source) {
				if (fzfQuery.isString(source)) {
					if (!fzfQuery.isHTML(source)) {
						if (arguments.length>=1) {
								var arg = '';
								for(var i =0;i<arguments.length;i++){
									 arg += arguments[i];
								}
							}
							this.each(function() {
								var text = document.createTextNode(arg);
								this.appendChild(text);
						});
					}else{
						var $source = $(source);
						this.each(function(index) {
							var parentNode = this;
							if (index == 0) {
									$source.each(function() {
									parentNode.appendChild(this);
								});
						}else{
							$source.each(function(index, el) {
								var dom = this.cloneNode(true);
								parentNode.appendChild(dom);
								});
							}
						});
					}
				}else {
					var $source = $(source);
					this.each(function(index) {
						var parentNode = this;
						if (index == 0) {
							$source.each(function() {
								parentNode.appendChild(this);
							});
						}else{
							$source.each(function(index, el) {
								var dom = this.cloneNode(true);
								parentNode.appendChild(dom);
							});
						}
				});
				}
			}
			return this;
		},
		prepend:function(source){
			if (source) {
				if (fzfQuery.isString(source)) {
					if (!fzfQuery.isHTML(source)) {
						if (arguments.length>=1) {
							var arg = '';
							for(var i =0;i<arguments.length;i++){
								 arg += arguments[i];
							}
						}
						this.each(function() {
							var parentNode = this;
							var text = document.createTextNode(arg);
							this.insertBefore(text, parentNode.firstChild);
						});
					}else{

					}
				}else {
					var $source = $(source);
					this.each(function(index) {
						var parentNode = this;
						if (index == 0) {
							// var arg = '';
							// $source.each(function() {
							// 	console.log(this);
								
							// 	parentNode.insertBefore(this, parentNode.firstChild);
							// });
							for (var i = 0; i < $source.get().length; i++) {
								console.log( $source.get()[1]);
							}
						}else{
							$source.each(function(index, el) {
								var dom = this.cloneNode(true);
								parentNode.insertBefore(dom, parentNode.firstChild);
							});
						}
					});
				}
			}
			return this;
		}
	});
	fzfQuery.fn.extend({
		on:function(eventName,fn){
			this.each(function() {
				if (!this.bucketEvent) {
					this.bucketEvent = {};
				}
				if (!this.bucketEvent[eventName]) {
					this.bucketEvent[eventName] = [];
					this.bucketEvent[eventName].push(fn);
					fzfQuery.addEvent(this,eventName,function(){
						fzfQuery.each(this.bucketEvent[eventName],function(){
							this();
						});
					});
				}else{
					this.bucketEvent[eventName].push(fn);
				}
			});
		},
		off:function(eventName,fnName){
			if (arguments.length ==0) {
				this.each(function() {
					if (this.bucketEvent) {
						this.bucketEvent = {};
					}
				});
			}else if (arguments.length ==1) {
				this.each(function() {
					if (this.bucketEvent[eventName]) {
						this.bucketEvent[eventName] = [];
					}
				});
			}else if (arguments.length ==2) {
				
			}
		}
	});
	fzfQuery.fn.init.prototype = fzfQuery.fn;

	window.fzfQuery = window.$ = fzfQuery;
})(window);
