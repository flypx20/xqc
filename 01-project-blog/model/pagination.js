
function pagination(options){

    return new Promise((resolve,reject)=>{
         let page = options.page || 1;
        
        options.model.estimatedDocumentCount({})
        .then((count)=>{
            
            let list = [];
            let limit = 2;
            let pages = Math.ceil(count / limit);
            if ( parseInt(page) === 0) {
                page = pages;
            }else if(parseInt(page) === (pages+1)){
                page = 1;
            }
            for (var i = 1; i <= pages; i++) {
                list.push(i);
            }
            let skip = (page -1)*limit;
             
            
           let que =  options.model.find(options.query,options.projections);
           if (options.populate) {
                for (let i = 0; i < options.populate.length; i++) {
                    que =  que.populate(options.populate[i]);
                }
           }
            
            que.sort(options.sort)
            .limit(limit)
            .skip(skip)
            .then((user)=>{
                 resolve({
                    docs:user,
                    page:page*1,
                    list:list
               });
            });
        });
    });  
}
module.exports = pagination;

    	