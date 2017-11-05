$(function(){
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
	//链接脚部
	$("#footer").load("http://localhost/fruitday/html/common.html footer");
	//链接侧边栏
	$("#aside").load("http://localhost/fruitday/html/common.html aside");
	

	//表单验证
	var aRoute = [false,false,false,false,false,false,false];
	
	//用户名输入框
		$("#user").on("blur",function(){
			//两位汉字
			var reg = /^[\u4e00-\u9fa5]{2,}$/g;
			if(reg.test($("#user").val())){
				$(this).parent().find("#active").removeClass().fadeIn().addClass("true");
				aRoute[0]=true;
			}else{
				$(this).parent().find("#active").removeClass().fadeIn().addClass("error");
				aRoute[0]=false;
			}
		})
	
	//手机输入框
		$("#phone").on("blur",function(){
			//11位数字
			var reg = /^\d{11}$/g;
			if(reg.test($("#phone").val())){
				$(this).parent().find("#active").removeClass().fadeIn().addClass("true");
				aRoute[1]=true;
			}else{
				$(this).parent().find("#active").removeClass().fadeIn().addClass("error");
				aRoute[1]=false;
			}
		})
	
	//密码输入框		
		$("#password").on("blur",function(){
			//6-20位数字密码
			var reg = /^\w{6,20}$/g;
			//console.log($("#password").val());
			if(reg.test($("#password").val())){
				$(this).parent().find("#active").removeClass().fadeIn().addClass("true");
				aRoute[2]=true;
			}else{
				$(this).parent().find("#active").removeClass().fadeIn().addClass("error");
				aRoute[2]=false;
			}
		})
			
	//重复密码输入框		
		$("#repeat").on("blur",function(){
			//重复登陆密码：两次输入一致	
			var reg = /^\w{6,20}$/g;
			if(reg.test($("#password").val())){
				if($("#repeat").val() == $("#password").val()){
					$(this).parent().find("#active")
					.removeClass().fadeIn().addClass("true");
					aRoute[3]=true;
				}else{
					$(this).parent().find("#active")
					.removeClass().fadeIn().addClass("error");
					aRoute[3]=false;
				}
			}else{
				$(this).parent().find("#active").removeClass().fadeIn().addClass("error");
				aRoute[3]=false;
			}
						
		})
	
	//随机验证码
		//随机数字
		function validate(){
			var num =""
			for (var i=0; i<4; i++) {
				var num = num + Math.round(Math.random()*9)
			}
			//console.log(num);	
			$(".validate").html(num);
		}
		validate()	
		$(".logo").on("click",function(){			
			validate();								
		})
		
		//验证码输入框
		$("#num").on("blur",function(){
			//和随机数比对
			if($("#num").val()!=""){
				if($("#num").val() == $(".validate").html()){
					$(".li4").find("#active").removeClass().fadeIn().addClass("true");
					aRoute[4]=true;
				}else{
					$(".li4").find("#active").removeClass().fadeIn().addClass("error");
					aRoute[4]=false;
				}
			}else{
				$(".li4").find("#active").removeClass().fadeIn().addClass("error");
				aRoute[4]=false;
			}
		})
		
	//手机验证码
		//随机验证码
		$(".btn").on("click",function(){
			var str = "ABCDEFGHIGKLMNabcdefghigjlmn";
			var html = "";
			for (var i=0; i<4; i++) {
				html+=str[Math.round(Math.random()*(str.length-1))];				
			}
			$(this).val(html);	
			aRoute[5]=true;
		})
		$("#telephone").on("blur",function(){
			
			if($("#telephone").val() == $(".btn").val()){
				$(".li5").find("#active").removeClass().fadeIn().addClass("true");
				aRoute[6]=true;
			}else{
				$(".li5").find("#active").removeClass().fadeIn().addClass("error");
				aRoute[6]=false;
			}
			
		})
		
	
	
	//点击注册检查信息填写
		function isBigEnough(element, index, array) {
		  return (element == true);
		}
		$(".close").on("click",function(){
			$("#gdialog").fadeOut();
			$("#mask").fadeOut();
		})
		$("#register").on("click",function(){												
			var passed = aRoute.every(isBigEnough);
			console.log(passed);
			var user = $("#user").val();
			var password = $("#password").val();
			if(passed==true){
				console.log("全对")
				$.ajax({					
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					type:"POST",
					data:{
						status:"register",
						userID:user,
						password:"password"
					},
					success:function(res){
						res = Number(res)
						console.log(res);
						switch(res){							
							case 0: 
							$("#mask").fadeIn();
							$("#gdialog").fadeIn().find(".hint").html("用户名注册过了，请重新输入")
							break;
							case 1: 
							$("#mask").fadeIn();
							$("#gdialog").fadeIn().find(".hint").html("注册成功，即将进入登录，请稍后")
								setTimeout(function(){
									window.location.href = "http://localhost/fruitday/html/login.html"
								},3000)
							break
							case 2:
							$("#mask").fadeIn();
							$("#gdialog").fadeIn().find(".hint").html("数据库出问题了，请稍后");
							break;
						}
					},
					error:function(){
						alert("服务器出错，请稍后")
					}
				
				})	
			}else{
				$("#mask").fadeIn();
				$("#gdialog").fadeIn().find(".hint").html("请完整填写信息");
			}
				
			
			
		})
	
	
})