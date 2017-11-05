

//选种商品
const select = (params,cb)=>{
	var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
    	
    	let num = params.num?parseFloat(params.num):1
    	
    	//console.log(num)
        if(err) throw err; 
        //查找此用户的select表
        var collection = db.collection('select');
		//查找有没有这个用户的购物车信息
        collection.find({username:params.username}).toArray(function(err, docs) {
        	if(docs.length){
        		//有select数据，直接操作
        		console.log('有选中操作',params.price)
        		//用户的购物信息
        		
                let _goods = docs[0].goods;
                //标识变量
                let isHas = false;
                //遍历此用户的cars表中的每一个商品信息
                
                for(var i=0;i<_goods.length;i++){
                	if(_goods[i].goodid == params.goodid){
                		console.log('有')
                		_goods[i].num=num;
                		
                		console.log(_goods[i].num)
                		//标记已经有了这个商品
                		isHas = true;
                		break;
                	}
                	
                }
                //如果没有商品，则新添加一条商品信息
                if(!isHas){
                	console.log('没有')
                	_goods.push({goodid:params.goodid,num,price:params.price})
                }
                //对数据collection的数据进行更新
                collection.update({username:params.username},{$set:{goods:_goods}},(err,results)=>{
                	if(err){
                		cb(1)
                        return ;
                	};
                	cb(0)
                	console.log('选中信息已经更改')
                	db.close();
                })
                
                //遍历更新后的select表中的每一个商品信息
               	console.log(docs[0].goods,1)
               	let allSelectNum = 0;
               	let allSelectMoney = 0
               	
               	let selectGoods = docs[0].goods;
               	for(var i=0; i<selectGoods.length; i++){
               		allSelectMoney += selectGoods[i].num*selectGoods[i].price
               		allSelectNum += selectGoods[i].num;
               	
                	console.log(allSelectNum,allSelectMoney)               	
               	}
               	cb(allSelectNum)
                db.close();
        	}else{
        		//先为此用户创建一个select表
        		console.log('先创建一个选中信息')
        		collection.insertMany([{
                    username:params.username,
                    goods:[{goodid:params.goodid,num,price:params.price}]
                }], function(err, result) {
                	
                	console.log(result)
                    if(result.insertedCount==1){
                        cb(num)
                    }else{
                        cb(1)
                    }
                    db.close();
                }); 
        	}
        }); 
       
      });
}

module.exports = select