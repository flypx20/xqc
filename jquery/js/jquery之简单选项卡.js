;(function($){
      $.fn.extend({
          tab:function(option){
            var defaults = {
              btnClass:'.btn>li',
              btnType:'active',
              contentClass:'.content>li',
              event:'click'
            };
            option = $.extend(defaults,option);
            this.each(function(){
              var $this = $(this);
              //console.log($this);
              var $li = $this.find(option.btnClass);
              //var $li = $this.find('.content>li');
              //console.log($li);
              $li.on(option.event,function(){
                  $(this).addClass(option.btnType).siblings().removeClass(option.btnType);
                  var index = $(this).index();
                  //console.log(index);
                  $this.find(option.contentClass).eq(index).show().siblings().hide();
              });
            });
          }
      });
  })(jQuery);
