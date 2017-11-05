
//验证登录信息模块
module.exports = (params,success,faile)=>{
	//链接数据库
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/web_server';
    MongoClient.connect(url, function(err, db) {
        if(err) throw err; 
        //找到user集合
        var collection = db.collection('user');
        collection.find({username:params.username,password:params.password}).toArray(function(err, docs) {
        	
            if(docs.length){
            	success(docs[0])
            }else{
            	faile()
            }
        }); 
        db.close();
      });
}












