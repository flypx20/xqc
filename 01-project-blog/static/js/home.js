;(function($){
	var backTlogin = $('#backLogin');
	var subUpdate = $('#sub-repass');
	backTlogin.on('click',function(event) {
		console.log('aaas');
		$.ajax({
				url: '/home/logout',
				type: 'GET',
				dataType: 'json',
			})
			.done(function(result) {
				if (result.code === 0) {
					console.log()
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
	subUpdate.on('click',function(event) {
		var username = $('#rename').val();
		var oldpassword = $('#oldpassword').val();
		var newpassword = $("#newpassword").val();
		var message = '';
		var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
		var pPattern = 	/^[a-z0-9_-]{6,18}$/;
		if (uPattern.test(username) === false ) {
			message = '输入的用户名有误';
			$('.text-danger').html(message);

			return;

		}else if (pPattern.test(oldpassword) === false) {
			message = '输入的密码有误';
			$('.text-danger').html(message);
			return;
		}else if (pPattern.test(newpassword) === false) {
			message = '输入的密码有误';
			$('.text-danger').html(message);
			return;
		 }else if(oldpassword == newpassword){
		 	message = '两次输入的密码一样';
			$('.text-danger').html(message);
			return;
		 }
		else{
			$.ajax({
				url: '/home/password',
				type: 'POST',
				dataType: 'json',
				data: {
					username:username,
					oldpassword:oldpassword,
					newpassword:newpassword
				}
			})
			.done(function(result) {
				if (result.code === 0) {
					$('.text-danger').html(result.message);
				}else{
					console.log('aaa');
					window.location.href = '/';
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
	});
})(jQuery);