refresh()
function refresh(){
	alert("刷新！");
	//刷新页面清空select表
	console.log('清空select表')
	
	//查找此用户信息
	let user_info = JSON.parse($.cookie('user_info'))
	//如果没有，则先登录
	if(!user_info){
		alert("请登录后操作")
		return ;
	}
	//查找此用户信息
	let username = user_info.username
	
	let that = this
	$.ajax({
		url:'/goods/clear_select.do',
		type:'post',
		data:{
			username:username
		},
		success:function(results){
			console.log(results)
		
			switch(results){
				case '0':
				
					console.log('清除成功');
					
					break;
				case '1':
					alert('清除失败，请重试');
					break;
			}			
		}
	})
}

_init()

function _init(){
	renderAllinfo()
}

//计算总价钱并渲染
function renderAllinfo(){
	let all_money = 0;
	let all_num = 0;
	
	$(".good-money").each(function(){
		all_money+=parseFloat($(this).html())
	})
	$(".good-num").each(function(){
		all_num+=parseFloat($(this).val())
	})
	$(".all_money").html(all_money)
	$(".all_num").html(all_num)
}

//防止在ajax请求过程中再次请求
let isAjax = false;

//加数量
$(".good-row").on('click',".add-btn",function(){
	//如果已经请求，则不处理
	if(isAjax){return ;}
	isAjax = true;
	//查找此用户信息
	let user_info = JSON.parse($.cookie('user_info'))
	//如果没有，则先登录
	if(!user_info){
		alert("请登录后操作")
		return ;
	}
	//查找此用户信息
	let username = user_info.username
	let goodid = $(this).data('id')
	let that = this
	
	$.ajax({
		url:'/goods/add.do',
		type:'post',
		data:{
			username:username,
			goodid:goodid
		},
		success:function(results){
			console.log(results)
			if(results == 1){
				alert("加数量失败，请重试")
			}else{
				//更改页面显示
				//alert('加入成功')
		let price = parseFloat($(that).parents('.good-item').find('.good-price').html());
		let now_num = parseFloat($(that).parents('.good-item').find('.good-num').val())+1;
				//console.log(price,now_num)
				$(that).siblings('.good-num').val(now_num)
				$(that).parents('.good-item').find('.good-money').html(now_num*price)
				
				//重新计算总价钱
				renderAllinfo()
				
				isAjax = false
			}
		}
	})
})

//减数量
$(".good-row").on('click',".reduce-btn",function(){
	if(isAjax){return ;}
	isAjax = true;
	//查找此用户信息
	let user_info = JSON.parse($.cookie('user_info'))
	//如果没有，则先登录
	if(!user_info){
		alert("请登录后操作")
		return ;
	}
	//查找此用户信息
	let username = user_info.username
	let goodid = $(this).data('id')
	let that = this
	
	$.ajax({
		url:'/goods/reduce.do',
		type:'post',
		data:{
			username:username,
			goodid:goodid
		},
		success:function(results){
			console.log(results)
			isAjax = false
			switch(results){
				case '1': alert('减数量失败，请重试');break;
				case '0': 
	let price = parseFloat($(that).parents('.good-item').find('.good-price').html());
	let now_num = parseFloat($(that).parents('.good-item').find('.good-num').val())-1;
				//console.log(price,now_num)
				$(that).siblings('.good-num').val(now_num)
				$(that).parents('.good-item').find('.good-money').html(now_num*price)
				
				//重新计算总价钱
				renderAllinfo()
				break;
				case '2': 
					$(that).parents('.good-item').remove();
					
					//重新计算总价钱
					renderAllinfo()
				break;
				
			}
		}
	})
})



//删除
$(".good-row").on('click',".remove-btn",function(){
	console.log('删除')
	if(isAjax){return ;}
	isAjax = true;
	//查找此用户信息
	let user_info = JSON.parse($.cookie('user_info'))
	//如果没有，则先登录
	if(!user_info){
		alert("请登录后操作")
		return ;
	}
	//查找此用户信息
	let username = user_info.username
	let goodid = $(this).data('id')
	
	let that = this
	
	$.ajax({
		url:'/goods/remove.do',
		type:'post',
		data:{
			username:username,
			goodid:goodid
		},
		success:function(results){
			console.log(results)
			isAjax = false
		
			switch(results){
				case '0':
				
					$(that).parents('.good-item').remove()
					renderAllinfo();
					break;
				case '1':
					alert('删除失败，请重试');
					break;
			}			
		}
	})
})

//清空购物车
$(".good-row").on('click',".clear-btn",function(){
	console.log('清空')
	if(isAjax){return ;}
	isAjax = true;
	//查找此用户信息
	let user_info = JSON.parse($.cookie('user_info'))
	//如果没有，则先登录
	if(!user_info){
		alert("请登录后操作")
		return ;
	}
	//查找此用户信息
	let username = user_info.username
	let goodid = $(this).data('id')
	
	let that = this
	$.ajax({
		url:'/goods/clear.do',
		type:'post',
		data:{
			username:username
		},
		success:function(results){
			console.log(results)
			isAjax = false
		
			switch(results){
				case '0':
				
					$(".good-row").html('<img class="center-block" src="/images/cars.jpg" alt="">')
					
					break;
				case '1':
					alert('清除失败，请重试');
					break;
			}			
		}
	})
})

//选中框
$(".good-row").on('click',".select",function(){
	let that = this;
	if(isAjax){return ;}
	isAjax = true;
	//查找此用户信息
	let user_info = JSON.parse($.cookie('user_info'))
	
	let username = user_info.username
	let goodid = $(that).data('id')
	
	if($(this).prop("checked")){
		console.log('选中')
		let price=parseFloat($(that).parents('.good-item').find('.good-price').html())
		console.log(price)
		$.ajax({
			url:'/goods/select.do',
			type:'post',
			data:{
				username:username,
				goodid:goodid,
				num:$(that).parents('.good-item').find('.good-num').prop('value'),
				price:price
			},
			success:function(results){
				console.log(results)
				isAjax = false
				$('.select_num').html(results)
				let num = $('.good-num').val()
				let price = $('.good-price').html()
				$('.select_money').html(num*price)
				if(results == "1"){
					console.log('选中失败')
				}else{
					console.log('选中成功')
					
					
				}
			}
		});
		
	}else{
		console.log('撤销')
		$.ajax({
			url:'/goods/not_select.do',
			type:'post',
			data:{
				username:username,
				goodid:goodid,
				num:$(that).parents('.good-item').find('.good-num').prop('value')
			},
			success:function(results){
				console.log(results)
				$('.select_num').html(results)
				isAjax = false
			
				if(results == "1"){
					console.log('撤销失败')
				}else{
					console.log('撤销成功')
					
					
				}		
			}
		});
	}
	
})

//计算选中的总价、总数

