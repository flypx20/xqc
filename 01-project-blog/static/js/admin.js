;(function($){
	var backTlogin = $('#backLogin');
	backTlogin.on('click',function(event) {
		$.ajax({
				url: '/admin/logout',
				type: 'GET',
				dataType: 'json',
			})
			.done(function(result) {
				if (result.code === 0) {
					window.location.href = '/';
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
	});
})(jQuery);