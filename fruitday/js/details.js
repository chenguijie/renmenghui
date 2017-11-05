;(function($){
	//链接头部导航栏
	$(".nav").load("http://localhost/fruitday/html/common.html nav",function(){
		$(".li1").on("mouseenter",function(){		
			$(this).css({"background":"#fff"}).find("div").fadeIn(200);
		})
		$(".li1").on("mouseleave",function(){
			$(this).css({"background":"#eee"}).find("div").fadeOut(200);
		})
	});
	//链接头部内容区
	$(".section").load("http://localhost/fruitday/html/common.html section",function(){
		$(".content_left").find(".active").remove();
		$(".search").focusin(function(){
			$(this).find("ul").fadeIn()
		})
		$(".search").focusout(function(){
			$(this).find("ul").fadeOut()
		})
		$(".active").css({left:"127px"})
	});
	
	//链接侧边栏
	$("#aside").load("http://localhost/fruitday/html/common.html aside");
	//链接脚部
	$("#footer").load("http://localhost/fruitday/html/common.html footer");
	
	//接受cookie，记载信息
	var id = getCookie("id");
	console.log(id);
	$.ajax({
		url:"http://localhost/fruitday/data/list.json",
		type:"GET",
	})
	.then(function(res){
		console.log(res);	
		$(".small").find("span:first img").attr("src",(res[id-46].img));
		$(".small").find("span").eq(1).find("img").attr("src",(res[id-46].img1));
		$(".small").find("span:last img").attr("src",(res[id-46].img2));
		
		$(".big").find("img").attr("src",(res[id-46].img));
		$("#all_box").find("img").attr("src",(res[id-46].img))	
		
		document.name=res[id-46].name;
		$("#name").html(res[id-46].name)
		$(".name").find("h3").html(res[id-46].name);
		$(".price_left").find("span").html(res[id-46].price);
		
		var html = "";
		html+=  `<li class="small_good"><a href="">
					<div class="small-pic">
						<img src="${res[id-46].img}"/>
					</div>
					<div class="small-mesg">
						<h5 class="name">${res[id-46].name}</h5>
						<p>328.00/盒</p>
						<s class="price">${res[id-46].price}</s>
					</div>
					</a></li>`
			
		$("#small").append(html);
	})
	
	//点击切换评论
	$(".top").find("p").on("click",function(){
		for(var i=0; i<$(".top").find("p").length; i++){
			$(".top p").eq(i).css({background:"#f1f1f1"})
		}
		$(this).css({background:"#fff"})
		$(".active1").css({
			left:$(this).position().left
		})
		//console.log($(this).index())
		var index = $(this).index()
		$(".node").eq(index).css({"display":"block"});
		$(".node").eq(1-index).css({"display":"none"});
	})
	
	//滚动滚动条固定悬浮窗
	//滚动滚动条触发事件
	window.onscroll = function(){
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		new returnTop(scrolltop).init();
	}	
	//回到顶部
	class returnTop{
		constructor(top){
			this.top=top;
		}
		init(){
			//console.log(this.top)
			if( this.top > 610 ){				
				$("aside").css({display:"block"})
				.find(".return").on("click",function(){
					this.top = 0;
				})				
			}else{
				$("aside").css({display:"none"});
			}
			if(this.top >870&&this.top<1900){
				$(".top").css({
					"position":"fixed",
					"top":0,
					"width":802
				})
			}else{
				$(".top").css({
				    "width": "100%",
				    "position": "relative"
				})
			}
		}
	}
	
	//
	class car{
		constructor(){
			this.howMany()
		}
		init(){
			var that = this;
			$(".click").on("click",function(){//加入购物车
				console.log($(this).index())
				// 弹出窗效果
				$("#gdialog").fadeIn();
				$("#mask").fadeIn();
				
				$(".cha").click(function(){
					$("#gdialog").fadeOut();
					$("#mask").fadeOut();					
				})		
				that.storage(id,$(".price_left").find("span").html());
				that.howMany()
			})
		}
		storage(id,price){			
			console.log(id,price);
			//分成两种情况;
				//1.没有cookie的情况下; => 建立数据结构;
				//2.有cookie 的情况下; => 向结构中插入数据;
			if(!$.cookie("goods")){
				//不存在;
				$.cookie("goods",'[{"id":'+id+',"num":1,"price":'+ price+'}]');
			}else{
				//存在;
				//变成数组 => 操作cookie;
				var cookie = $.cookie("goods");
				var cookieArr = JSON.parse(cookie);
				var same = false;
				for(var i = 0 ; i < cookieArr.length ; i++){
					if(cookieArr[i].id == id){ //存在当前的商品;
						cookieArr[i].num++;
						same = true;
						break;
					}
				}
				if(same == false){
					var obj = {
						id:id,
						num:1,
						price:price
					};
					cookieArr.push(obj);
				}
				//变成字符串 => 存进cookie;
				cookie = JSON.stringify(cookieArr);
				$.cookie("goods",cookie);
			}
			//console.log($.cookie("goods"))
		}
		howMany(){
			var that = this;
			if($.cookie("goods")){
				var aCookie = JSON.parse($.cookie("goods"));
				console.log(aCookie)
				var res = 0;				
				var price=0;
				for(var i = 0 ; i < aCookie.length ; i++){	
					res += aCookie[i].num;
					price+=parseInt(aCookie[i].price*aCookie[i].num);
					console.log(aCookie[i].price)
				}
				
				$("#sum").html(res);
				$(".cartcount").html(res);	
				$(".cartprice").html('' + price + "元");	
				return res;
			}
		}
	}
	
	new car().init()
	
	//点击按钮商品数量改变
	$(".change .left").on("click",function(){
		var num1 = $(".change").find("span").html();
		if(num1 == 0){
			num1=0;
		}else{
			num1--;
		}
		$(".change").find("span").html(num1);
	})
	$(".change .right").on("click",function(){
		var num2 = $(".change").find("span").html();
		num2++;
		$(".change").find("span").html(num2);
	})
	
	//选择产地
	$(".send").on("mouseenter",function(){
		//console.log(1)
		$(".hide").fadeIn()
		.find("#no").on("click",function(){$(".hide").fadeOut()});
	})
	
	//商品详情轮播
	class banner{
		constructor(){
			
		}
		init(){//初始化
			
			$(".small li").on("mouseenter",function(){
				//console.log($(this).find("img").attr("src"))
				var src = $(this).find("img").attr("src")
				$(".big li").find("img").attr("src",src);
				$("#all_box").find("img").attr("src",src);
				
				$(this).find("p").show()				
			})
			$(".small li").on("mouseleave",function(){
				$(this).find("p").hide()	
			})
		}
	}
	new banner().init();
	
	//放大镜
	class Zoom{
		constructor(){
			
		}
		init(){//移入出现小灰框和大图
			var that =this;
			$(".big").mouseenter(function(){
				//大图出现效果
				$(".position_box").fadeIn();
				$("#b_box").fadeIn(200).css({width:0,height:0})
				.animate({width:"500px",height:"500px"});
				$(".big").mousemove(function(event){
					var evt = event || window.event;
					that.move(evt);
				})
			})
			$(".big").mouseleave(function(){
				//大图隐藏效果
				$(".position_box").fadeOut();
				$("#b_box").css({width:"500px",height:"500px"})
				.animate({width:"0",height:"0"});
			})
		}
		move(evt){
			var left = evt.offsetX - $(".position_box").width()/2;
			var top = evt.offsetY - $(".position_box").height()/2;
			//console.log(left,top)
			
			//边界判断
			if(left<=0){
				left = 0;
			}
			if(left>$(".big").width() - $(".position_box").width()){
				left = $(".big").width() - $(".position_box").width();
			}
			if(top<=0){
				top = 0;
			}
			if(top>$(".big").height() - $(".position_box").height()){
				top = $(".big").height() - $(".position_box").height();
			}
			
			//小灰框定位
			$(".position_box").css({
				left:left,
				top:top
			})
			
			//计算比例
			var sWall = $(".big").width() - $(".position_box").width();
			var sHall = $(".big").height() - $(".position_box").height();
		
			var propX = left/sWall;
			var propY = top/sHall;
			//console.log(left,top,propX,propY)
			//大图定位
			$("#all_box").css({
				left:-propX*($("#all_box").width() - $("#b_box").width()),
				top:-propY*($("#all_box").height() - $("#b_box").height())
			})
			
		}
	}
	new Zoom().init();
	
	
	//商品评价分页
	class Pagination{
			constructor(num){//构造函数
				num = num? num:4
				this.showNum = num;
				console.log(1)
				//单例模式
				if(!Pagination.res){//如果没有json数据就加载
					this.load()
				}else{//如果已经请求过数据，就直接开始进行分页操作
					this.init()
				}
			}
			load(){
				//获取数据
				var that = this;
				//加载数据--相同域名-不跨域
				$.ajax("http://localhost/fruitday/data/list.json")
				.then(function(res){
					//成功
					//console.log(res);
					Pagination.res = res;//成功请求的json
					that.init();
				},function(){
					//失败					
				})				
			}
			init(){
				var that = this;
				//调用分页插件
				$(".pagination").pagination(Pagination.res.length,{
					items_per_page:this.showNum,
					num_display_entries:5,
					num_edge_entries:1,
					callback:function(index){
						that.index = index;
						that.rendringPag();
					}
				})
				$(".pagination").find("a").attr("href","##");
			}
			rendringPag(){
				//console.log(this.index);
				//拼接字符串
				var html = "";
				for(var i=this.index*this.showNum; i<(this.index + 1)*this.showNum;i++){
					if(i < Pagination.res.length){
						html+=	`<div class="mode1 clearfix">
									<div class="mode_left">
										<img src="${Pagination.res[i].img}"/>
										<p>138********</p>										
									</div>
									<div class="mode_right">
										<ul>
											<li class="clearfix">
												<p class="cont">评分</p>
												<p class="start">
													<span class="star"></span>
													<span class="star"></span>
													<span class="star"></span>
													<span class="star"></span>
													<span class="star"></span>
												</p>
											</li>
											<li class="clearfix">
												<p class="cont">内容</p>
												<p>${Pagination.res[i].name}</p>
											</li>
											<li class="clearfix">
												<p class="cont">晒图</p>
												<img src="${Pagination.res[i].img1}">
											</li>
											<li class="clearfix">
												<span class="gray">2017-09-24 11:55:05</span>
											</li>
										</ul>
									</div>
								</div>`
	               }
				}
				$(".mode").html(html);
			}
		}
		
		new Pagination();
	
	function getCookie(name){//获取cookie值
		var sCookie = document.cookie;
		var aCookie = sCookie.split("; ");//以分号加空格分割字符串为数组
		for (var i=0; i<aCookie.length; i++) {
			var aCookieItem = aCookie[i].split("=");
			if(aCookieItem[0] == name){
				return aCookieItem[1];
			}
		}	
	return "";	
	}
})(jQuery)