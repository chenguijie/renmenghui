var express = require('express');
var router = express.Router();
const goods_util = require("../modules/goods");

router.get("/",function(req,res,next){
	//直接返回一个字符串
})

//加入购物车
router.post("/add.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.add(params,(results)=>{
		
		res.send(results+'')
	})
})


//减数量
router.post("/reduce.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.reduce(params,(results)=>{
		
		res.send(results+'')
	})
})

//删除购物车
router.post("/remove.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.remove(params,(results)=>{
		
		res.send(results+'')
	})
})

//清空购物车
router.post("/clear.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.clear(params,(results)=>{
		
		res.send(results+'')
	})
})

//选中商品
router.post("/select.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.select(params,(results)=>{
		
		res.send(results+'')
	})
})

//撤销选中商品
router.post("/not_select.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.not_select(params,(results)=>{
		
		res.send(results)
	})
})

//清空select
router.post("/clear_select.do",function(req,res,next){
	//接受post发送的数据
	let params = req.body
	goods_util.clear_select(params,(results)=>{
		
		res.send(results+'')
	})
})

//列表页
const getGoods = require("../modules/getGoods");
//列表页获取商品数据
router.get("/getGoods",function(req,res,next){
	//接受get发送的数据
	let params = req.query
	getGoods(params,(result)=>{
		console.log(result)
		res.send(result)
	})
	
})
module.exports = router;