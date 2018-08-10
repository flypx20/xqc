;(function($){
	var btnsub = $('#btn-sub');
	var categoryname = $('#name').val();
	var message = '';
	var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
	btnsub.on('click',function(event) {
		
		if (uPattern.test(categoryname) === false ) {
			message = '请输入分类名称';
			$('.err').html(message);
			return;
		}
		
	});
})(jQuery);