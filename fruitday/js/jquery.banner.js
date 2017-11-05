jQuery.fn.banner = function(options){
	"user stric"
	
	this.LOCAL = {//存放当前需要的数值
		iNow:0//当前显示页
	};
	
	options.imgs.css({//其他图片，让他显示在右边
		left:options.imgs.eq(0).width()
	}).eq(0).css({//找到第一张图片，让他显示在最前列
		left:0
	})
	
	var that = this;
	
	//是否存在items
		if(typeof options.items == "object" && options.items.length !=0){
			//存在items
			//console.log(options.items);
			
			//绑定事件
			options.items.on("click",function(){
				var direction = "";//运动方向
				var target = $(this).index();//当前操作页面
				//获取下标
				//console.log($(this).index())
				
				if(that.LOCAL.iNow == $(this).index()){
					//如果当前显示页跟点击的下标页相同，则没有效果
					return 0;
				}
				//判断向左运动还是向右运动
				if(that.LOCAL.iNow < $(this).index()){
					//向左运动
					direction = "left";
				}else{
					//向右运动
					direction = "right";
				}
				
				
				//运动
				//向左运动动画
				if(direction == "left"){
					that.LOCAL.move("left",target)					
				}
				
				//运动
				//向右运动动画
				if(direction == "right"){
					that.LOCAL.move("right",target)
				}
				
				
				//更改小图标样式
				options.items.removeClass("active").eq(target).addClass("active")
				
				that.LOCAL.iNow = $(this).index();			
				//console.log(that.LOCAL.iNow)
			})
		
		}else{
			console.warn("没有items")
		}
	
	this.LOCAL.move = function(direction,target){
		
		//运动
		if(direction == "left"){
			var movetarget = -options.imgs.eq(0).width();
			var movestart = options.imgs.eq(0).width();
		}else{
			var movetarget = options.imgs.eq(0).width()
			var movestart = -options.imgs.eq(0).width();
		}
			
		//当前显示图片出厂
		options.imgs.eq(that.LOCAL.iNow).stop().animate({
			left:movetarget			
		})
		//操作图片入场
		options.imgs.eq(target).css({
			left:movestart
		})
		options.imgs.eq(target).stop().animate({
			left:0
		})
	}
	
	//是否存在btn
	if(typeof options.left == "object" && options.left.length != 0 && typeof options.right == "object" && options.right.length != 0){
		//存在btn
		//console.log(options.left,options.right);
		var that = this;
		//左键效果
		options.left.on("click",function(){
			var iNext = 0;
			//判断终止条件
			//要显示的下标
			if(that.LOCAL.iNow == 0){
				that.LOCAL.iNow = options.imgs.length - 1;
			}else{
				that.LOCAL.iNow--;
			}
			
			//显示下标的下一张
			if(that.LOCAL.iNow == options.imgs.length - 1){
				iNext = 0
			}else{
				iNext = that.LOCAL.iNow +1;
			}		
			//console.log(that.LOCAL.iNow,iNext);
			
			//下一张的运动
			options.imgs.eq(iNext).animate({
				left:options.imgs.eq(0).width()
			})
			
			//要显示页的运动
			options.imgs.eq(that.LOCAL.iNow).css({
				left:-options.imgs.eq(0).width()
			})
			options.imgs.eq(that.LOCAL.iNow).animate({
				left:0
			})
			
			//小图标运动
			options.items.removeClass('active').eq(that.LOCAL.iNow).addClass('active');
			
		})
		
		//右键效果
		options.right.on("click",function(){
			var iNext = options.imgs.length-1;
			//判断终止条件
			if(that.LOCAL.iNow == options.imgs.length-1){
				that.LOCAL.iNow = 0;
			}else{
				that.LOCAL.iNow++;
			}
			//下页下标
			if(options.imgs.length-1 == 0){
				iNext = options.imgs.length-1
			}else{
				iNext = that.LOCAL.iNow -1;
			}
			//下页运动
			options.imgs.eq(iNext).animate({
				left:-options.imgs.eq(0).width()
			})
			
			//显示图片运动
			options.imgs.eq(that.LOCAL.iNow).css({
				left:options.imgs.eq(0).width()
			})
			options.imgs.eq(that.LOCAL.iNow).animate({
				left:0
			})
			//小图标运动
			options.items.removeClass("active").eq(that.LOCAL.iNow).addClass('active');
			
		})
		
		//自动轮播
		if(options.autoplay == undefined || options.autoplay == true){
			clearInterval(this.LOCAL.timer);
			this.LOCAL.timer = setInterval(function(){
				options.right.trigger("click");
			},3000)
			var that = this;
			
			//移入停止定时器
			options.imgs.eq(0).parents().parent().on("mouseenter",function(){
				options.left.fadeIn();
				options.right.fadeIn();
				clearInterval(that.LOCAL.timer);
			})
			//移出重新开始定时器
			options.imgs.eq(0).parents().parent().on("mouseleave",function(){
				options.left.fadeOut();
				options.right.fadeOut();
				clearInterval(that.LOCAL.timer);
				that.LOCAL.timer = setInterval(function(){
					options.right.trigger("click");
				},3000)
			})
		}
			
	}else{
		//不存在
		console.warn("没有left-right")
	}

}
