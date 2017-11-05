var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	//直接返回一个字符串
  res.send('respond with a resource');
});

//引入登录模块
const login = require("../modules/login")

router.get('/login', function(req, res, next) {
	//直接返回一个字符串
  	res.render("login");
});

router.get('/login.do', function(req, res, next) {
	//直接返回一个字符串
	//前端传回的数据，get方法
  	let params = req.query;
  	
  	login(params,(info)=>{
  		res.send({nickname:info.nickname,username:info.username})
  	},()=>{
  		res.send("1")
  	})
  	
});

//引入注册模块
const register = require("../modules/register")

router.get('/register', function(req, res, next) {
	//直接返回一个字符串
  res.render("register");
});

router.post('/register.do', function(req, res, next) {
  //直接返回一个字符串
  // post 数据怎么接收 req.body
  console.log(req.body)
  register(req.body,()=>{
      res.send("0")
  },()=>{res.send("1")})
});

module.exports = router;
