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
	
	//链接侧边栏
	$("#aside").load("http://localhost/fruitday/html/common.html aside");
	//链接脚部
	$("#footer").load("http://localhost/fruitday/html/common.html footer");
	
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
			if( this.top > 310 ){				
				$("aside").css({display:"block"})
				.find(".return").on("click",function(){
					this.top = 0;
				})				
			}else{
				$("aside").css({display:"none"});
			}		
		}
	}
	
	//获取购物信息
	class goods{
		constructor(){
			this.howMany()	
		}
		load(){
			//加载数据;
			var that = this;
			$.ajax({
				url:"../data/goods.json",
				dataType:"json"
			})
			.then(function(res){
				//成功请求到数据了;
				console.log(res);
				// 一定变成json;
				//res = typeof res == "object" ? res : JSON.parse(res);
				that.res = res;
				
				that.add();
			},function(a,b){
				//请求数据失败;
				console.warn(b);
			}) //加载数据成功之后调用初始化方法;
		}
		add(){//有cookie增加商品
			var that = this;
			if($.cookie("goods")){				
				var aCookie = JSON.parse($.cookie("goods"));
				console.log(aCookie);
				var str="";
				var html = "";
				for(var i = 0 ; i < aCookie.length ; i++){
					console.log(that.res[aCookie[i].id-1].name)
					html += `
							<li class="clearfix">
								<div class="cartorder-select"></div>
								<div class="cart-img">
									<a href="##" target="_blank">
										<img src="${that.res[aCookie[i].id-1].img}" alt="">                           
									</a>
								</div>
								<div class="cart-name">
									<a href="##" target="_blank">${that.res[aCookie[i].id-1].name}</a>
								</div>
								<div class="spec-num">
									<p>一盒</p>
								</div>
								<div class="price-singular">
									<p class='new_price'>${that.res[aCookie[i].id-1].price1}</p>
								</div>
								<div class="num_sel_lage clearfix" id="num_sel_lage">
									<span class="jian">-</span>
									<input class="pull-left" type="tel" class ="input" value="${aCookie[i].num}">
									<span class="jia">+</span>
								</div>
								<div class="sum">
									<s>804.0</s>
								</div>
								<div class="delect">
									<p class="delect1">删除</p>
								</div>
							</li>
						`
					str+=`
					
							<li>
								<a href="##" target="_blank">
                                    <img src="${that.res[aCookie[i].id-1].img}">
                                    <p class="history-name">${that.res[aCookie[i].id-1].name}</p>
									<p class="history-price">${that.res[aCookie[i].id-1].price1}</p>
								</a>
							</li>
						`
				}
				$(".new_history").append(str);
				$(".list-unstyle1").append(html);
				that.number();
				that.delect();
			}	
		}
		number(){//改变商品数量	
			var that = this;
			$(".jian").click(function(){
				var val = $(this).next().val();
				if(val == 0){
					val=0;					
				}else{
					val--;
				}	
				$(this).next().val(val);
				that.howMany();
			})
			$(".jia").click(function(){
				var val = $(this).prev().val();				
				val++;					
				$(this).prev().val(val);
				that.howMany();
			});
			that.howMany();
		}
		delect(){
			$(".delect1").click(function(){
				$(this).parent().parent().remove();
				console.log($(this).index());
				
			})
		}
		howMany(){
			var that = this;
			var num_sel_lage = document.getElementsByClassName("num_sel_lage");
			//console.log(num_sel_lage);
			var val = 0;
			var price = 0;
			for(var i = 0 ; i < num_sel_lage.length ; i++){
				var Ainput = $(num_sel_lage).eq(i).children(1);
				val += parseInt($(Ainput).eq(1).val());
				price += parseInt($(".new_price").eq(i).html()*val)
				
				//console.log(price);
				//console.log($(".new_price").eq(i).html());
				//console.log(val);
				//console.log($(num_sel_lage).eq(i).children(1));
				$("#num").html(val);
				$(".all-order").html(''+price);
			}
		}
	}
	
	new goods().load();
	
	//点击切换评论区
	$(".look-history-menu").on("click","li",function(){
		var index = $(this).index();
		$(this).parent().find(".adds").animate({
			left:$(this).index()*165
		})
		$(".fra").eq(index).fadeIn();
		$(".fra").eq(1-index).fadeOut();
	})
	
})(jQuery)