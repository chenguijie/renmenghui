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
	
	//加载商品列表
	class goodList{
		constructor(){
			
		}
		init(){//获取数据
			var that = this;
			$.ajax({
				url:"http://localhost/fruitday/data/list.json",
				type:"GET",
			})
			.then(function(res){
				//console.log(res);	
				that.res = res;
				console.log(res)
				that.load()
			})
		}
		load(){
			var that = this;
			//字符串拼接--获取数据
			var html = "";
			for (var i=0; i<this.res.length; i++) {
				html+=	`<li dataId = "${that.res[i].id}">
						<a href="http://localhost/fruitday/html/details.html" dataId="${that.res[i].dataId}" target="_blank"><img class="img"  src="${that.res[i].img}"/></a>
						<i style="margin-right:80px;margin-bottom:10px;">${that.res[i].name}</i><span>${that.res[i].price}</span>
						<div class="amount">
							<span>一盒</span>
							<div class="s-che" dataId="${that.res[i].dataId}" data="${that.res[i].price}"><a href="##"></a></div>
							</div>
						</div>
						<div class="mask"></div>
						</li>`
			}
			$(".good_list").find("ul").html(html);
			that.change()
		}
		change(){
			//绑定事件;
			var that = this;
			$(".good_list ul").on("mouseenter","li",function(){
				//console.log($(this));
				$(this).css({
					boxShadow:"0 0 10px #ccc"
				})
			})
			$(".good_list ul").on("mouseleave","li",function(){
				//console.log($(this));
				$(this).css({
					boxShadow:"none"
				})
			})
			$(".good_list ul").on("click","a",function(){
				console.log($(this).attr("dataId"))
				setCookie("id",$(this).attr("dataId"));//点击商品设置cookie
				that.src = $(this).find("img").attr("src");
				that.name = $(this).next("i").html();
				//console.log(that.src);
				console.log(that.name);
				that.pop()
			})
			$(".good_list ul").on("click",".s-che",function(){//加入购物车
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
		}
		pop(){
			var html = "";
			html+=  `<li class="small_good"><a href="">
						<div class="small-pic">
							<img src="${this.src}"/>
						</div>
						<div class="small-mesg">
							<h5 class="name">${this.name}</h5>
							<p>328.00/盒</p>
							<s class="price">328.00</s>
						</div>
						</a></li>`
				
			$("#small").append(html);

		}
		storage(id,price){			
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
			console.log($.cookie("goods"))
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
				}
				$("#sum").html(res);
				$(".cartcount").html(res);	
				$(".cartprice").html('' + price + "元");	
				return res;
			}
		}
		
	}	
	new goodList().init();
	
	//手风琴效果
	$(".accordion").on("click",".li",function(){
		$(this).find(".unfold").html("-")
		$(this).stop().animate({
			height:170
		})		
	})
	$(".accordion").on("mouseleave",".li",function(){
		$(this).find(".unfold").html("+")
		$(this).stop().animate({
			height:24
		})		
	})
	
	
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
	
	
	
	function setCookie(name,value,day,path){//设置cookie
		var d = new Date();
		d.setDate(d.getDate()+day);
		document.cookie = name + "=" + value + ";path=" + path + ";expires=" + d;
	}
	
	function removeCookie(name,path){//删除cookie
		setCookie(name,null,-1,path);
	}
	
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