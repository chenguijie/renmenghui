var express = require('express');
var router = express.Router();
const getbanner = require('../modules/getbanner');
const getGoods = require('../modules/getGoods');
/* GET home page. */
//当进入到这里的时候，path为/的时候
router.get('/', function(req, res, next) {
	//将index.ejs模板渲染成html，返回给前端

   	getbanner((banners)=>{
	      getGoods({pageNum:1,pageSize:4},(goods)=>{
		   		res.render('index', { title: '淘狗网' ,banners,goods});	 
		   	})  	   
	})
   	
   	
});

//列表页路由
router.get('/list', function(req, res, next) {
	//
	getGoods({pageNum:1,pageSize:4},(goods)=>{
   		res.render('list', { title: '淘狗网',goods});	 
   	})  
 	
});

//详情页路由
router.get('/detail', function(req, res, next) {
	//渲染页面
	let goodid = req.query.goodid
	getGoods(goodid,(goods)=>{
		console.log(goods)
		
   		res.render('detail', { title: '淘狗网',goods});	 
   	})  
 	
});

const  getCar = require('../modules/getCar')
//购物车路由
router.get('/car', function(req, res, next) {
	//前端在发送请求时请求头里会包含cookie，用户信息储存在cookie里
	
	let cookies = req.cookies
	//有用户信息输出username，没有登录为空
	let username = cookies.user_info?JSON.parse(cookies.user_info).username:''
	//console.log(username)
	
	
	getCar(username,(cars)=>{	
   		res.render('car', { title: '淘狗网',cars}); 
   	})  
 	
});
module.exports = router;
