


const add = (params,cb)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
    	
    	let num = params.num?parseFloat(params.num):1
    	//console.log(num)
        if(err) throw err; 
        var collection = db.collection('cars');
		//查找有没有这个用户的购物车信息
        collection.find({username:params.username}).toArray(function(err, docs) {
        	console.log(docs)
            if(docs.length){
                //此用户有购物车数据，直接操作
                console.log('此用户有购物车信息')
                //用户的购物信息
                let _goods = docs[0].goods;
                //标识变量
                let isHas = false;
                //遍历此用户的cars表中的每一个商品信息
                for(var i=0;i<_goods.length;i++){
                	//如果数据库里有这个商品，则此商品数量自增
                	if(_goods[i].goodid == params.goodid){
                		console.log('有')
                		_goods[i].num+=num;
                		console.log(_goods[i].num)
                		//标记已经有了这个商品
                		isHas = true;
                		break;
                	}
                }
                //如果没有商品，则新添加一条商品信息
                if(!isHas){
                	console.log('没有')
                	_goods.push({goodid:params.goodid,num})
                }
                //对数据collection的数据进行更新
                collection.update({username:params.username},{$set:{goods:_goods}},(err,results)=>{
                	if(err){
                		cb(1)
                        return ;
                	};
                	cb(0)
                	console.log('已经更改')
                	db.close();
                })
               
                db.close();
                               
            }else{
                //先去为此用户创建一个购物车的信息
               console.log('先去为此用户创建一个购物车的信息')
               
                collection.insertMany([{
                    username:params.username,
                    goods:[{goodid:params.goodid,num}]
                }], function(err, result) {
                	
                	console.log(result)
                    if(result.insertedCount==1){
                        cb(0)
                    }else{
                        cb(1)
                    }
                    db.close();
                }); 
            }
        }); 
       
      });
}

module.exports = add
