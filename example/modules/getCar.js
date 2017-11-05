


//接受
module.exports=(username,callback)=>{
	//如果用户未登录
	if(username == ''){
		callback('not login')
		return ;
	}
	var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        var collection = db.collection('cars');
		
		collection.find({username:username}).toArray(function(err, docs) {
				if(err) throw err;
				if(docs.length == 0){
					//如果购物车为空
					callback('not buy')
					db.close()
				}else{
					
					//{"_id":"59e7580bef0d3e38289690ac","username":"2","goods":[{"goodid":"2","num":1}]}
					//[{"goodid":"2","num":1}]}
					//根据此用户的购物车的信息去查找每一个商品的详细信息
					let car_goods = docs[0].goods
					let goods_coll = db.collection("goods")
					goods_coll.find({}).toArray((err,all_goods)=>{
						let results = []
						//遍历每一个商品
						all_goods.forEach((good,i)=>{
							//遍历购物车里的每一个商品
							car_goods.forEach((_good,i)=>{
								if(good.goodid == _good.goodid){
									good.num = _good.num;
									results.push(good)
								}
							})
						})
						callback(results)
						db.close()
					})
				}
	            
	        });
		
		 
       
      });
}