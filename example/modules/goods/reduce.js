
//减去
const reduce = (params,cb)=>{
	//链接数据库
	var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    
    MongoClient.connect(url, function(err, db) {
    	
    	let num = params.num?parseFloat(params.num):1
    	//console.log(num)
        if(err) throw err; 
        //获取cars表
        var collection = db.collection('cars');
		//查找有没有这个用户的购物车信息
        collection.find({username:params.username}).toArray(function(err, docs) {
        	if(err) throw err;
        	//遍历此用户购物车的所有商品
        	let goods = docs[0].goods
        	let result = null
        	for(var i=0; i<goods.length;i++){
        		if(goods[i].goodid == params.goodid){
        			//如果找到这个商品，则数量减1
        			goods[i].num--;
        			//如果此商品数量为0
        			if(goods[i].num<=0){
        				goods[i].num = 0;
        				console.log('222')
        				//则删除此商品
        				goods.splice(i,1)
        				result = 2
        			}
        			break;
        		}
        	}
            //对数据collection的数据进行更新
            collection.update({username:params.username},{$set:{goods:goods}},(err,results)=>{
            	if(err){
            		result = 1
            		cb(result)
                    return ;
            	};
            	result = result==2?result:0
            	cb(result)
            	console.log('已经更改')
            	db.close();
            })
           
            //db.close();
                               
           
        }); 
       
      });
}

module.exports = reduce