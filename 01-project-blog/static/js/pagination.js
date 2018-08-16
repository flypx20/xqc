;(function($){
	$.fn.extend({
		pagination:function(){
			var self = this;
			this.on('click', 'a', function(event) {
				var $this = $(this);
				var page = 1;
				var currentPage = self.find('.active a').html();
				if ($this.attr('aria-label') == 'Previous') {
					page = currentPage - 1;
				}else if ($this.attr('aria-label') == 'Next') {
					page = currentPage*1 +1;
				}else{
					page = $this.html();
				}
				var url = self.data('url');
				var query =url+'?page='+page;
				var category = self.data('category');
				if (category) {
					query += '&category='+category;
				}
				$.ajax({
					url: query,
					type: 'GET',
					dataType: 'json',
				})
				.done(function(result) {
					if (result.code == 0) {
						self.trigger('get-data',[result]);
					}
				})
				.fail(function() {
					console.log("error");
				})
				.always(function() {
					console.log("complete");
				});
				
			});

		}
	});
	
})(jQuery);