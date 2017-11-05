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
	
	//验证登录
		//判断不为空
		$("#user").on("blur",function(){
			//两位汉字
			var reg = /^[\u4e00-\u9fa5]{2,}$/g;
			if($("#user").val()!="" && reg.test($("#user").val())){
				$(this).parent().find("span:last").fadeIn().attr("class","true");
			}else{
				$(this).parent().find("span:last").fadeIn().attr("class","error");
			}
		})
		//密码输入框		
		$("#password").on("blur",function(){
			//6-20位数字密码
			var reg = /^\w{6,20}$/g;
			if($("#password").val()!="" && reg.test($("#password").val())){
				$(this).parent().find("span:last").fadeIn().attr("class","true");
			}else{
				$(this).parent().find("span:last").fadeIn().attr("class","error");
			}
		})
	//点击登录跳转
		$(".close").on("click",function(){
			$("#gdialog").fadeOut();
			$("#mask").fadeOut();
		})
		$("#register").on("click",function(){
			var user = $("#active1").attr("class");
			var password = $("#active2").attr("class");
			console.log(user,password)
			//ajax请求数据
			if(user == "true" && password == "true" && $("#password").val()!="" &&$("#user").val()!=""){
				console.log("请求数据");
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/userinfo.php",
					type:"POST",
					data:{
						status:"login",
						userID:user,
						password:password					
					},
					success:function(res){
						//登录成功之后
						switch("res"){
							case 0:	
								$("#mask").fadeIn();
								$("#gdialog").fadeIn().find(".hint").html("用户名不存在,请注册");
							break;
							case 2:
								$("#mask").fadeIn();
								$("#gdialog").fadeIn().find(".hint").html("用户名和密码不符，请重新登录");
							break;
							default:
								$("#mask").fadeIn();
								$("#gdialog").fadeIn().find(".hint").html("登陆成功,我们稍微将为您跳转到购物页面");
								setTimeout(function(){
									window.location.href = "http://localhost/fruitday/index.html"
								},2000)
								console.log($("input:checked"))
								if($("input:checked")){//选中多选框，设置cookie
									console.log(1)
									setCookie("user",$("#user").val(),1);
									setCookie("password",$("#password").val(),1);
								}
						}						
					},
					error:function(res){
						alert("服务器用坏了! 请稍等!")						
					},					
				})
				return 0;
			}else{
				console.log("错误信息")
				$("#mask").fadeIn();
				$("#gdialog").fadeIn().find(".hint").html("请完整填写信息");
				$("#active1").fadeIn().attr("class","error");
				$("#active2").fadeIn().attr("class","error");
			}
		})
		
		//刷新页面，如果有就自动填入
		if(getCookie("user")){
			$("#user").val(getCookie("user"));
		}
		if(getCookie("password")){
			$("#password").val(getCookie("password"));
		}
		
		//设置cookie
		function setCookie(name,value,day,path){
			var d = new Date();
			d.setDate(d.getDate()+day);
			document.cookie = name + "=" + value + ";path=" + path + ";expires=" + d;		
		}
		//删除cookie
		function removeCookie(name,path){
			setCookie(name,null,-1,path)
		}

		//获取cookie
		function getCookie(name){
			var scookie = document.cookie;
			console.log(scookie);
			var acookie = scookie.split("; ")
			for (var i=0; i<acookie.length; i++) {
				var aCookieItem = acookie[i].split("=");
				console.log(aCookieItem);
				if(aCookieItem[0] == name){
					return aCookieItem[1]
				}
			}
			return ""
		}
	
})