(function($){
   ClassicEditor
    .create( document.querySelector( '#editor' ),{
    	language:'zh-cn',
    	ckfinder:{
    		uploadUrl:'/article/uploadImg'
    	}
    } )
    .then( editor =>{
        window.editor = editor;
    })
    .catch( error => {
        console.error( error );
    } );

   $('#btn-sub').on('click',function(event) {
    //验证
        var title = $('[name="title"]').val();
        var intro = $('[name="intro"]').val();

        var content = editor.getData();

        var $errs = $('.err');

        if(title.trim() == ''){
            $errs.eq(0).html('标题不能为空');  
            return false;
        }else{
            $errs.eq(0).html('');    
        }

        if(intro.trim() == ''){
            $errs.eq(1).html('简介不能为空');  
            return false;
        }else{
            $errs.eq(1).html('');    
        }

        if(content == '<p>&nbsp;</p>'){
            $errs.eq(2).html('内容不能为空');  
            return false;           
         }else{
            $errs.eq(2).html('');    
         }   
   });

})(jQuery);