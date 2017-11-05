


//清空购物车
const clear = (params,cb)=>{
	//链接数据库
	var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
    	
    	let num = params.num?parseFloat(params.num):1
    	//console.log(num)
        if(err) throw err; 
        var collection = db.collection('cars');
    	//查找有没有这个用户的购物车信息
        collection.find({username:params.username}).toArray(function(err, docs) {
        	if(err) throw err;
            let goods = docs[0].goods;
            
            
            collection.update({username:params.username},{$set:{goods:[]}},(err,results)=>{
	            if(err){
	                cb(1)
	                return ;
	            }
	            cb(0)
	            db.close();
	        })
            
        })
    	
    	
    })
	
	
	
	
}


module.exports = clear