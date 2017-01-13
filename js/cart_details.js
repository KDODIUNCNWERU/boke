define(function(require,exports,module){
	require("../src/js/flexible");
	require("../src/js/jquery-1.12.4");
	require("../src/js/swiper-3.3.1.min");
	var P = {
		_init:function(){
			function swiperInit(){
				var swiper=new Swiper("#banner",{
					loop:true,
					direction:'horizontal',
					speed:1500,
					autoplay:3000,
					paginationClickable:true,				//分页器点击是否有效
					autoplayDisableOnInteraction : false,		//操作后让其自动轮播
					pagination:".swiper-pagination",
//					onInit:function(swiper){
//						sw.swiperAnimateCache(swiper);
//						sw.swiperAnimate(swiper);
//					}
				});
			}
			
			getSwiperData();
			function getSwiperData(){
				
				var param = {
					status:"login",
					userID:"zuozuo88",
					password:"zzz1111"
				}
				$.ajax({
					url:"http://datainfo.duapp.com/shopdata/getBanner.php",
					type:"get",
					dataType:"jsonp",   //jsonp，返回数据为json
					data:"param",
			//		timeout:30000,
					success:function(data){
		//				console.log(data.length);
						 for(var i=0;i<data.length;i++){
						 	var imgTitle = data[i].goodsName;	
						 	var myurl = JSON.parse(data[i].goodsBenUrl);   //字符串转换为json格式
		//				 	console.log(myurl[0]);
						 	var slide = $("<div class='swiper-slide'><img src="+myurl[0]+" alt='' title="+imgTitle+" /></div>");
						 	$(".swiper-wrapper").append(slide);
						 }
						 swiperInit();   //当swiper渲染成功后才会进行初始化swiper
					}
				})
			}
			
			$(".addcart").on("click",function(){
				buy();
			});
			$(".buynow").on("click",function(){
				buy();
			});
			function buy(){
				$(".buy").css({display:"block"});
				$(".icon-cha").on("click",function(){
					$(".buy").css({display:"none"});
				})
			}
			$(".icon-gouwuche").on("click",function(){
				window.location.href="cart.html";
			})
			
			$(".reduce").on("click",function(){
				var num=$(".num").html()*1;
				if(num>1){
					num=num-1;
				}else{
					num=1;
				}
				$(".num").html(num);
			})
			$(".increse").on("click",function(){
				var num=$(".num").html()*1;
				num=num+1;
				$(".num").html(num);
			})
			$(".certain").on("click",function(){
				$(".buy").css({display:"none"});
				//layer 显示加入购物车成功
			})
		}
		
	}
	//导出某个接口
	//	export.dosomething = ...
	
	//模块导出  整个接口
	module.exports = {
		init:P._init
		
	}
})