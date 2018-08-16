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
	var updatePass = $('#updatepassword');
	var goUpdatePass = $('.go-updatePass');
	var subUpdate = $('#sub-repass');
	goLogin.on('click',function(event) {
		register.hide();
		updatePass.hide();
		login.show();
	});
	goRegister.on('click',function(event) {
		login.hide();
		updatePass.hide();
		register.show();
	});
	goUpdatePass.on('click', function(event) {
		register.hide();
		login.hide();
		updatePass.show();

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
	var  pagination = $('#articleList');
	var article = $('#articles');
	pagination.on('get-data',function(event,result) {
		bulidArticle(result.articleList);
		console.log(result.paegs);
		if (result.pages>1) {
			buildList(pagination,result.list,result.page);
		}
	});
	pagination.pagination();

	var subCom = $('#comment-btn');
	
	var err = $('#com-err');
	subCom.on('click',function(event) {
		var articleId = $('#article-id').val();
		var comment = $('#comment-content').val();
		if (comment.trim() == '') {
			err.html('评论不能为空');
			return false;
		}
		$.ajax({
			url: '/commend/add',
			type: 'POST',
			dataType: 'json',
			data:{id:articleId,content:comment}
		})
		.done(function(result) {
			if (result.code == 0) {
				if (result.pages>1) {
					buildList(commentPage,result.list,result.page);
				}
				buildComment(result.data);
				 $('#comment-content').val('');
			}
			
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

	});

	function bulidArticle(articles){
		var html = '';
		for (var i = 0; i < articles.length; i++) {
			var data = moment(articles[i].createdAt).format('YYYY年MM月DD日 h:mm:ss ');
			html +=`<div class="panel panel-default content-item">
    					<div class="panel-heading">
    						<h3 class="panel-title"><a href="/view/${articles[i]._id.toString()}" class="link">${ articles[i].title }</a></h3>
    					</div>
   						<div class="panel-body">
     						${ articles[i].intro }
    					</div>
    					<div class="panel-footer">
							<span class="glyphicon glyphicon-user"></span>
							<span class="content-footer-text text-muted">${ articles[i].user.username }</span>
							<span class="glyphicon glyphicon-th-list"></span>
							<span class="content-footer-text text-muted">${ articles[i].category.name }</span>
							<span class="glyphicon glyphicon-time"></span>
							<span class="content-footer-text text-muted">${ data }</span>
							<span class="glyphicon glyphicon-eye-open"></span>
							<span class="content-footer-text text-muted"><em>${ articles[i].click }</em>已阅读</span>
    					</div>
    				</div>`;
		}
		article.html(html);
	}

	function buildList($page,list,page){
		var html = `<li>
            			<a href="javascript:;" aria-label="Previous" id="previous">
              				<span aria-hidden="true">&laquo;</span>
            			</a>
          			</li>`;
         for(i in list){
	    	if(list[i] == page){
	    		html += `<li class="active"><a href="javascript:;" class="btn btn-primary">${list[i]}</a></li>`;
	    	}else{
	    		html += `<li><a href="javascript:;">${ list[i] }</a></li>`;
	    	}
	    }
	    html+=`<li>
	            <a href="javascript:;" aria-label="Next" id="next">
	              <span aria-hidden="true">&raquo;</span>
	            </a>
         		</li>`;
        $page.find('.pagination').html(html);
	}
	
	function buildComment(comment){
		var html = '';
		var commentList= $('#comment-list');
		for (var i = 0; i < comment.length; i++) {
			var date = moment(comment[i].createdAt).format('YYYY年MM月DD日 h:mm:ss ');
			html += `<div class="panel panel-default">
    					<div class="panel-heading"><span style="color:#f00;font-weight: bold;">${ comment[i].user.username } &nbsp;</span>于<span style="color:skyblue">${ date } &nbsp;</span>评论</div>
   						<div class="panel-body">
     					 ${ comment[i].content }
    					</div>
 					</div>`;
		}
		commentList.html(html);
	}
	
var commentPage = $('#commentPage');
commentPage.on('get-data',function(event,result) {
	if (result.pages>1) {
		buildList(commentPage,result.list,result.page);
	}
	buildComment(result.data);
});
commentPage.pagination();
})(jQuery);