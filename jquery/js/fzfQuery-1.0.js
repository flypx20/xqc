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
			init : function(selector){
				//布尔值是假的情况下返回空的fzfquery对象
				if (!selector) {
					return this;
				}else if (fzfQuery.isFunction(selector)) {
					//传值是函数时，返回有document的jquery对象，
					//当页面所有的DOM节点加载完毕后执行传入的函数
					document.addEventListener('DOMContentLoaded',function(){
						selector();
					});
					this[0] = document;
					this.length= 1;
					return this;

					//处理字符串
				}else if (fzfQuery.isString(selector)) {
					//处理HTML代码块
				}
				

			}
		};
		fzfQuery.isFunction = function(str){
			return typeof str === 'function';
		};
		fzfQuery.isString = function(str){
			return typeof str === 'string';
		};
		fzfQuery.isHTML = function(str){
			return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3;
		};
		fzfQuery.fn.init.prototype = fzfQuery.fn;

		window.fzfQuery = window.$ = fzfQuery;
})(window);