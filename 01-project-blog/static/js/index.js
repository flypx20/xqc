;(function($){
	var login = $('#login');
	var register = $('#register');
	var goLogin = $('.go-login');
	var goRegister = $('.go-register');
	var subRegister = $('#sub-register');
	var subLogin = $('#sub-login');
	var useInfer = $('#userloged');
	var logOut = $('#logout');
	var admin = $('.admin');
	goLogin.on('click',function(event) {
		register.hide();
		login.show();
	});
	goRegister.on('click',function(event) {
		login.hide();
		register.show();
	});

	//注册
	subRegister.on('click',function(event) {
		var username = register.find('[name="rename"]').val();
		var password = register.find('[name="repassword"]').val();
		var repassword = register.find('[name="renepassword"]').val();
		var message = '';
		var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
		var pPattern = 	/^[a-z0-9_-]{6,18}$/;
		if (uPattern.test(username) === false ) {
			message = '输入的用户名有误';
			$('.text-danger').html(message);

			return;

		}else if (pPattern.test(password) === false) {
			message = '输入的密码有误';
			$('.text-danger').html(message);
			return;
		}else if (password != repassword) {
			message = '两次输入的密码不一样';
			$('.text-danger').html(message);
		}
		else{
			$.ajax({
				url: '/user/regist',
				type: 'POST',
				dataType: 'json',
				data: {
					username:username,
					password:password
				},
			})
			.done(function(result) {
				if (result.code === 10) {
					register.hide();
					login.show();
				}else if (result.code === 11){
					$('.text-danger').html(result.message);
					return;
				}else{
					$('.text-danger').html(result.message);
					return;
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

	//登录
	subLogin.on('click',function(event) {
		var username = login.find('[name="username"]').val();
		var password = login.find('[name="password"]').val();
		var message = '';
		var uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
		var pPattern = 	/^[a-z0-9_-]{6,18}$/;
		if (uPattern.test(username) === false ) {
			message = '输入的用户名有误';
			$('.text-danger').html(message);

			return;

		}else if (pPattern.test(password) === false) {
			message = '输入的密码有误';
			$('.text-danger').html(message);
			return;
		}
		else{
			$.ajax({
				url: '/user/login',
				type: 'POST',
				dataType: 'json',
				data: {
					username:username,
					password:password
				}
			})
			.done(function(result) {
				console.log(result);
				if (result.code === 0) {
					$('.text-danger').html(result.message);
				}else{
					window.location.reload();
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

	logOut.on('click',function(event) {
		$.ajax({
				url: '/user/logout',
				type: 'GET',
				dataType: 'json',
			})
			.done(function(result) {
				if (result.code === 0) {
					window.location.reload();

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