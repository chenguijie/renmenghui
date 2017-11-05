
init()

function init(){
    check_login()
    initSwiper()
}

function check_login(isNull){
    let _isNull= isNull || true
    var user_info = $.cookie("user_info")
    if(user_info&&_isNull){
//  	console.log(user_info)
//  	console.log(typeof user_info)
//  	console.log(JSON.parse(user_info).nickname)
        $(".user-info").removeClass("hidden").find(".nickname").text(JSON.parse(user_info).nickname)
        $(".control-btn").addClass("hidden")   
    }else{
        $(".user-info").addClass("hidden")
        $(".control-btn").removeClass("hidden")   
    }
}


function exit(){
    $.cookie('user_info',null)
    check_login(false)
}


function initSwiper(){
    var mySwiper = new Swiper ('.swiper-container', {
        loop: true,                
        // 如果需要分页器
        pagination: '.swiper-pagination',                
        // 如果需要前进后退按钮
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
    })      
     
}

//点击加入购物车事件
$(".goods-box").on("click",".buy-btn",function(){
	//console.log("向后台发送数据")
	let user_info = JSON.parse($.cookie("user_info"))
	if(!user_info){
		alert("请登录后加入")
		return ;
	}
	let username = user_info.username;
	let goodid = $(this).data("id")
	//点击发送请求
	$.ajax({
		url:"/goods/add.do",
		type:"post",
		data:{
			username:username,
			goodid:goodid
		},
		success:function(results){
			if(results == 1){
				alert('加入失败')
			}else{
				alert('加入成功')
			}
		}
	})
})



