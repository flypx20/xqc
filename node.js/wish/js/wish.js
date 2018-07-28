(function($){
	function getrandom(min,max){
		return Math.ceil(max+Math.random()*(min-max+1));
	}
		var $wish = $('.wish');
		var $wall = $('.wall');
		var wallWidth = parseFloat($wall.css('width'));
		var wallHeight = parseFloat($wall.css('height'));
		var wishWidth = parseFloat($wish.css('width'));
		var wishHeight = parseFloat($wish.css('height'));
	function handleWish($elem){
		
		$elem.pep(); 
		
		//wish的随机位置
		$elem.each(function(index, el) {
			var $this = $(this);
			$this.css({
			
				transform: 'matrix(1, 0, 0, 1,'+ getrandom(0,wallWidth-wishWidth)+','+ getrandom(0,wallHeight-wishHeight)+')'
			});
		//wish的hover高度
			$this.hover(function() {
				$this.css('zIndex', 999);
			}, function() {
				$this.css('zIndex', 0);
			});
		});
			//监听删除事件
	
	
	}
	
	
handleWish($wish);
	
	$wall.on('click', '.close', function(event) {
		var $this = $(this);
		var _self = this;
		$.ajax({
			url:'/del',
			data:'id='+$this.data('id'),
			dataType:'json'
		})
		.done(function(data){
			if (data.status === 0) {
				$(_self.parentNode).remove();
			}
		});
	});
	//add wish
	$('.sub-btn').on('click',function(event) {
		let val = $('#content').val();
		$.ajax({
			url: '/add',
			type:'POST',
			dataType: 'json',
			data: {content: val},
		})
		.done(function(data) {
			if (data.status === 10) {
				let $dom = $(`<div class="wish" style="background:${data.data.color}">
								<a href="javascript:;" class="close" data-id="${data.data.id}"></a>
								${data.data.content}
							</div>`);
				$wall.append($dom);
				handleWish($dom);
				$('#content').val('');	

			}else{
				alert('呜呜呜，这个愿望逃跑了。。。');
			}
			
		});
		
	});
	

})(jQuery);