;(function($){
	document.title = "天天果园-水果网购首选品牌,只为一份极致的新鲜!"
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
		$(".search").focusin(function(){
			$(this).find("ul").fadeIn()
		})	
		$(".search").focusout(function(){
			$(this).find("ul").fadeOut()
		})
	});
	
	//链接脚部
	$("#footer").load("http://localhost/fruitday/html/common.html footer");
	//链接侧边栏
	$("#aside").load("http://localhost/fruitday/html/common.html aside");
	
	//轮播图插件链接
	$("#banner").banner({
		imgs:$("#banner .slideshow li"),
		items:$("#banner .slide").children(),
		left:$('#left'),
		right:$("#right")
	})
	
	//滚动滚动条触发事件
	window.onscroll = function(){
		var scrolltop = document.documentElement.scrollTop || document.body.scrollTop;
		new floatShow(scrolltop).show();
		new returnTop(scrolltop).init();
	}	
	
	//滑入广告效果
	$(".show>ul>li").on("mouseenter",function(){
		$(this).find(".misk").animate({
			top:76,
			"opacity":1
		})
	})
	$(".show>ul>li").on("mouseleave",function(){
		$(this).find(".misk").animate({
			top:126,
			"opacity":0
		})
	})

	//悬浮窗隐藏
	class floatShow{
		constructor(top){
			this.top = top;
		}
		show(){
			if( this.top > 610 ){
				$(".float").css({display:"block"})
			}else{
				$(".float").css({display:"none"});
			}
		}
	}
	
	//楼梯效果
	$(".lift_list>li").click(function(){
		//获取下标
		//console.log($(this).index());
		//要跳转的楼层
		var $div = $(".fruit-kinds").eq($(this).index());
		console.log( $(".fruit-kinds").eq(0))
		console.log( $div.offset().top)
		//动画效果
		$("html,body").animate({
			scrollTop:$div.offset().top
		})
	})
	
	//楼梯跟随效果
	$(window).scroll(function(){
		var scrTop = document.documentElement.scrollTop || document.body.scrollTop;
		var div = $(".fruit-kinds");
		//li的高度
		var liHeight = $(".lift_list li").height();
		//console.log(liHeight)
		div.each(function(e){
			if(scrTop >= div.eq(e).offset().top - 189-(liHeight * e)){
				 $('.lift_list li').removeClass('lift_item_on')
                $('.lift_list li').eq(e).addClass('lift_item_on')
			}
		})
		
		//淡入淡出
		if($(window).scrollTop() > 200){
			 $('.lift_list').fadeIn();
			 
		}else{
			$('.lift_list').fadeOut()
		}
	})
	
	//回到顶部
	class returnTop{
		constructor(top){
			this.top=top;
		}
		init(){
			if( this.top > 610 ){
				$("aside").css({display:"block"})
				.find(".return").on("click",function(){
					this.top = 0;
				})				
			}else{
				$("aside").css({display:"none"});
			}
		}
	}
	
	//加载商品列表
	class goodList{
		constructor(index){
			this.index = index;//记录数据
			//console.log(this.index)
			this.howMany();	
		}
		load(){//获取数据
			var that = this;
			$.ajax({
				url: "http://localhost/fruitday/data/good_list.php",
				type: "GET",
				datatype:"json",
				jsonp: "callback"
			})
			.then(function(res) {
					var All = eval(res);
					//console.log(All)；
					var list = [];
					var arr = [];
					var imgHtml = ["","","",""];
					for(let i =0;i<All.length;i++){
						//console.log(All[i])
						list[i] = All[i];
						
						for(var j=0;j < list[i].length;j++){	
							//console.log(i,j);
							//console.log(list[i][j])
							arr.push(list[i][j]);
							imgHtml[i]+=   `<li>
												<div class="img">
													<a href="#"><img src="${list[i][j].img}"/></a>
												</div>
												<div class="intro"><!--简介-->
													<div class="good_name"> ${list[i][j].name}</div>
													<div class="good_price">${list[i][j].price}</div>
													<div class="s-che" dataId="${list[i][j].dataId}" data="${list[i][j].price1}"><a href="##"></a></div>
												</div>
											</li>`
					}
					//console.log(arr);
					that.res = arr;
					$('#good-list1').find("ul").html(imgHtml[0]);
					$('#good-list2').find("ul").html(imgHtml[1]);
					$('#good-list3').find("ul").html(imgHtml[2]);
					$('#good-list4').find("ul").html(imgHtml[3]);
				}
				that.init()
			},function(a,b){
				//请求数据失败;
				console.warn(b);
			})
		}
		init(){
			//绑定事件;
			var that = this;

			$(".good-list>ul").on("click",".s-che",function(){
				
				$(this).animate({
					backgroundPositionX:"-514px",
					backgroundPositionY:"-291px"
				})	
				// 弹出窗效果
				$("#gdialog").fadeIn();
				$("#mask").fadeIn();
				
				$(".cha").click(function(){
					$("#gdialog").fadeOut();
					$("#mask").fadeOut();
					$(".s-che").animate({
						backgroundPositionX:"-517px",
						backgroundPositionY:"-243px"
					})
				})
				that.storage($(this).attr("dataId"),$(this).attr("data"));
				that.howMany()
						
			})
			$(".shoping").on("click",function(){
				$(this).css({
					background:"orange"
				})
				$(".carts-order").fadeIn();
				that.showCar();	
				var timer = null;
				timer = setInterval(function(){
					$(".carts-order").fadeOut();
					$(".shoping").css({
						background:"#64a131"
					})
				},3000)
			})
			
		}
		storage(id,price){
			var that = this;
			//console.log(id,price);
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
			that.howMany()
			//console.log($.cookie("goods"))
		}
		
		showCar(){
			var that = this;
			//console.log(this.res)
			if($.cookie("goods")){
				var aCookie = JSON.parse($.cookie("goods"));
				console.log(aCookie);
				var html = "";
				for(var i = 0 ; i < aCookie.length ; i++){
					console.log(that.res[aCookie[i].id].name);
					html += `
							<li>
								<a href="#">
									<img src="${that.res[aCookie[i].id].img}"/>
									<div class="p-minicart-info">
										<h5>${that.res[aCookie[i].id].name}</h5>
										<h5>${this.res[aCookie[i].id].price1} </h5>
									</div>
								</a>
								<div class="jia_jian clearfix">
									<span class="jian">-</span>
									<input type="text" value="0" readonly="true" class="num2">
									<span class="jia">+</span>
								</div>
								<span class="shanchu">删除</span>
							</li>
						`
				}
				//console.log($(".goods—list"))
				$(".list_goods").append(html);
			}		
		}
		howMany(){
			var that = this;
			if($.cookie("goods")){
				var aCookie = JSON.parse($.cookie("goods"));
				//console.log(aCookie)
				var res = 0;				
				var price=0;
				for(var i = 0 ; i < aCookie.length ; i++){
					res += aCookie[i].num;
					price+=parseInt(aCookie[i].price*aCookie[i].num);
				}
				$("#num").html(res);
				$(".num3").html(res);
				$(".fs-3").html('' + price + "元");
				$(".cartcount").html(res);	
				$(".cartprice").html('' + price + "元");	
				return res;
			}
		}
	}	
	new goodList().load();
	
	
	//倒计时部分
	function clock(){
		var d = new Date();
		var end = new Date("2017/9/30");			
		var newHours = parseInt((end.getTime()-d.getTime())/1000/3600);
		var newMinute = parseInt((end.getTime()-d.getTime())/1000/60-newHours*60);
		var newSecond = parseInt((end.getTime()-d.getTime())/1000-newHours*3600-newMinute*60);
		var oDate = document.getElementById("date");
		
		//判断是否补零
		if(newHours<10){
			newHours = "0" + newHours;
		}else{
			newHours = "" + newHours;
		}
	
		if(newMinute<10){
			newMinute = "0" + newMinute;
		}else{
			newMinute = "" + newMinute;
		}
	
		if(newSecond<10){
			newSecond = "0" + newSecond;
		}else{
			newSecond = "" + newSecond;
		}
		
		
		var date =	`<li>${newHours[0]}</li>
					 <li>${newHours[1]}</li>
					 <span>:</span>
					 <li>${newMinute[0]}</li>
					 <li>${newMinute[1]}</li>
					 <span>:</span>
					 <li>${newSecond[0]}</li>
					 <li>${newSecond[1]}</li>`	
					 
		oDate.innerHTML = date;
	}
	
	clock();
	
	var timer2 = null;
	thimer2 = setInterval(function(){
		clearInterval(timer2);
		clock();
	},1000)

	//秒杀加载json
	class timer{
		constructor(){
			
		}		
		init(){
			var that = this;
			$.ajax({
				url:"http://localhost/fruitday/data/list.json",
				type:"POST",
			})
			.then(function(res){
				//console.log(res);
				var html="";
				for (var i=0; i<res.length; i++) {
					html += `<li>
								<img src="${res[i].img}"/>
								<span class="border_bottom"></span>
								<h3>${res[i].name}</h3>
								<p class="price">
									<span class="present">${res[i].price}</span>
									<span class="original">208.0</span>
								</p>
							</li>`
				}
				$("#seckill_left").html(html)
				that.show()
			})			
		}
		show(){			
			var li = $("#seckill_right").find("li");
			var ball = $("#seckill_right_ball").find("li")
			//console.log(li.length)
			var timer=null;
			var index=0;
			var zindex=1;
			timer=setInterval(function(){
				if(index==li.length-1){
					index=0;
				}else{
					index++;
				}
				//console.log(index)
				$(li).eq(index).css({zIndex:zindex++})
				$(ball).eq(index).css({background:"red"})
				$(ball).eq(1-index).css({background:"#000"})
			},2000)
		}
	}
	new timer().init();
	
	//秒杀部分轮播效果
	class banner{
		constructor(){
			
		}
		init(){
			var that = this;
			$(".seckill_left").on("mouseenter",function(){
				$(this).find("button").fadeIn();
				that.click();
				that.show()
			})
			$(".seckill_left").on("mouseleave",function(){
				$(this).find("button").fadeOut();
			})

		}
		click(){
			var that = this;	
			var seckill_left = document.getElementById("seckill_left");
			var seckill = seckill_left.parentNode;
			var aseckill_left_li = seckill_left.children;
			
			var num = Math.ceil(aseckill_left_li.length/5);
			var index = num;	
			$("#btn1").on("click",function(){
				if(index == 0){				
					index = num-1;	
				}else{
					index--;
				}			
					$(seckill_left).animate({
						left:-$(seckill).width()*(index)
					})
					
			})
			$("#btn2").on("click",function(){
				if(index == num){
					index = 1;
					$(seckill_left).css({
						left:-$(seckill).width()*index
					})
				}else{
					index++;
					
				}
				$(seckill_left).animate({
					left:-$(seckill).width()*(index-1)
				})	
			})			
		}
		show(){
			$(".seckill_left ul li").find("img").on("mouseenter",function(){
				$(this).stop().animate({marginLeft:"0px"})
			})
			$(".seckill_left ul li").find("img").on("mouseleave",function(){
				$(this).stop().animate({marginLeft:"15px"})
			})
			
		}
		
	}
	new banner().init();

})(jQuery)
	

