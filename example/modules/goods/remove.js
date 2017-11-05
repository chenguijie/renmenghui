
//删除购物车
const remove = (params,cb)=>{
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
            //遍历商品信息
            for(var i=0; i<goods.length; i++){
            	//查找到这个商品
            	if(goods[i].goodid == params.goodid){
            		goods.splice(i,1)           		
            	}
            }
            //更新数据库
            //第一个参数，更改哪一个，第二个参数，要更改的内容，第三个参数，回调函数
            collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
            	if(err){
            		cb(1)
            		return ;
            	}
            	cb(0)
            	db.close();
            })
               
           
        }); 
       
      });
}

module.exports = remove