

//清空购物车
const clear_select = (params,cb)=>{
	//链接数据库
	var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
    	
    	let num = params.num?parseFloat(params.num):1
    	//console.log(num)
        if(err) throw err; 
        var collection = db.collection('select');
    	//查找有没有这个用户的购物车信息
        collection.find({username:params.username}).toArray(function(err, docs) {
        	if(err) throw err;           
            collection.remove({})
            cb('0')
        })
    	
    	
    })
	
	
	
	
}


module.exports = clear_select