
var pageNum = 0;
var pageSize = 4;
//ajax获取商品列表
_init()

function _init(){
	getGoods(true,renderGoods)
}

function getGoods(type,callback){
	pageNum+= type?1:-1
	console.log(pageNum)
	
	$.ajax({
		url:'/goods/getGoods',
		data:{
            pageNum:pageNum,
            pageSize:pageSize
        },
		success:function(results){
			console.log(results)
			if(!results.length){
				pageNum+=type?-1:1
				console.log(pageNum)
				
			}else{
				callback(results)
			}
			 $("#pageNum").html(pageNum)
		}
	})
}

function renderGoods(goods){
    let str ='';
    goods.forEach(function(good,index){
        str += `
            <div class="col-xs-12 col-md-6 col-lg-3">
                <div class="thumbnail">
                    <img class="good-img" tite="${good.title}" src="${good.imgurl}" alt="...">
                    <div class="caption">
                        <h3><a href="/detail?goodid=${good.goodid}">${good.title}</a></h3>
                        <p>${good.description}</p>
                        <p class="clearfix">
                            <button class="btn btn-danger pull-left" role="button">￥：${good.price}</button>
                            <button data-id="${good.goodid}" class="btn btn-primary pull-right buy-btn" role="button">加入购物车</button>
                        </p>
                    </div>
                </div>
            </div>
        `
    })
    
    $(".good-row").html(str)
    
}

function changePage(type){
	getGoods(type,renderGoods)
}


//点击加入购物车事件
$(".goods-box").on("click",".buy-btn",function(){
	console.log("向后台发送数据")
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

