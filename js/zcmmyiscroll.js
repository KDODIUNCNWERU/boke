

define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    require("../src/js/iscroll");
    var myiscroll,
	pullDownEl, pullDownOffset,_maxScrollY,
	pullUpEl, pullUpOffset,refresh=0,loadmore=0;
	var oul = document.getElementById("thelist");	
	
	
	var P={
		_init:function () {
			 P.loaded();
             P.getGoodsData();
             document.addEventListener("touchmove",function(e){e.preventDefault()},!1);
             document.addEventListener("DOMContentLoaded",P.loaded,!1);
        },
       getGoodsData:function (){
//			console.log(11);
			$.ajax({
				type:"get",
				url:"http://fpf666.applinzi.com/json/remen.json",
				success:function(data){
//					console.log(data);		
					if(localStorage.getItem("zcmFlag")){
						if(localStorage.getItem("zcmFlag")=="false"){
							for(var i=0;i<10;i++){
							var thisData=data.resultList;
							var imgUrl=thisData[i].imageurl;
							var goodsName=thisData[i].title;
							var title=thisData[i].description;
							var clickCount=thisData[i].click_count;
							var date=thisData[i].str_date;
							var makingTime=thisData[i].makingTime;
							var share_count=thisData[i].share_count;
							var id=thisData[i].recipe_id;
							var oLi=$("<li><dl><dt><img class='active' ID="+id+" src="+imgUrl+" /></dt><dd><h2>"+goodsName+"</h2><p>"+title+"</p><span class='icon iconfont icon-xihuan clearfix'></span><span class='icon iconfont icon-chakan clearfix'></span><span class='num clearfix'>"+clickCount+"</span></dd></dl></li>");
							$("#thelist1").prepend(oLi);
							$(".active").on("click",function(){
								var $id=$(this).attr("ID");
								window.location.href="food_detail.html?id="+$id;
							})
							}
						}else{
							for(var i=0;i<10;i++){
							var thisData=data.resultList;
							var imgUrl=thisData[i].imageurl;
							var goodsName=thisData[i].title;
							var title=thisData[i].description;
							var clickCount=thisData[i].click_count;
							var date=thisData[i].str_date;
							var makingTime=thisData[i].makingTime;
							var share_count=thisData[i].share_count;
							var id=thisData[i].recipe_id;
							var oLi=$("<li><img class='active' ID="+id+" src="+imgUrl+" /><span class='calendar'><span class='icon iconfont icon-rili clearfix'></span><span class='date clearfix'>"+date+"</span></span><h2>"+goodsName+"</h2><p>"+title+"</p><div class='operation'><div class='time com'><span class='icon iconfont icon-vip'></span><span class='timedata data'>"+makingTime+"</span></div><div class='views com'><span class='icon iconfont icon-chakan'></span><span class='viewstimes data'>"+clickCount+"</span></div><div class='share com'><span class='icon iconfont icon-fenxiang1'></span><span class='sharetimes data'>"+share_count+"</span></div></div></li>");
							$("#thelist").prepend(oLi);
							$(".active").on("click",function(){
								var $id=$(this).attr("ID");
								window.location.href="food_detail.html?id="+$id;
							})
						}
						}
							
					}else{
						localStorage.setItem("zcmFlag","ture");
						for(var i=0;i<10;i++){
							var thisData=data.resultList;
							var imgUrl=thisData[i].imageurl;
							var goodsName=thisData[i].title;
							var title=thisData[i].description;
							var clickCount=thisData[i].click_count;
							var date=thisData[i].str_date;
							var makingTime=thisData[i].makingTime;
							var share_count=thisData[i].share_count;
							var id=thisData[i].recipe_id;
							var oLi=$("<li><img class='active' ID="+id+" src="+imgUrl+" /><span class='calendar'><span class='icon iconfont icon-rili clearfix'></span><span class='date clearfix'>"+date+"</span></span><h2>"+goodsName+"</h2><p>"+title+"</p><div class='operation'><div class='time com'><span class='icon iconfont icon-vip'></span><span class='timedata data'>"+makingTime+"</span></div><div class='views com'><span class='icon iconfont icon-chakan'></span><span class='viewstimes data'>"+clickCount+"</span></div><div class='share com'><span class='icon iconfont icon-fenxiang1'></span><span class='sharetimes data'>"+share_count+"</span></div></div></li>");
							$("#thelist").prepend(oLi);
							$(".active").on("click",function(){
								var $id=$(this).attr("ID");
								window.location.href="food_detail.html?id="+$id;
							})
						}
						
						
		       	}

						
					myiscroll.refresh();				
				}
			});
		},
		
		// 上拉刷新请求ajax的回调函数
		pullUpAction:function (){
			setTimeout(function(){
				P.getGoodsData()   				
					},1500);
		},
		// 下拉加载更多请求ajax的回调函数
		pullDownAction:function (){
			setTimeout(function(){
				$("#thelist").html("");
				$("#thelist1").html("");
				P.getGoodsData();   				
					},1500);	
		},
		loaded:function (){
			pullDownEl = document.getElementById('pullDown');
			pullDownOffset = pullDownEl.offsetHeight;  
			pullUpEl = document.getElementById('pullUp');
			pullUpOffset = pullUpEl.offsetHeight; 
			myiscroll =  new iScroll("wrapper",{
				vScroll:true,      //false禁用垂直方向滚动条
				vScrollbar:false,   //隐藏滚动条
				hideScrollbar:true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
				fadeScrollbar:true,
				bounce:true,   //是否有反弹效果
				lockDirection:true, //当某一方向滚动时，会锁住另一方向的滚动
				useTransition:true,  //是否使用css3过渡效果
				topOffset:pullDownOffset,    //已经滚动的基准值
				
				//表示滚动条重新 刷新  每次改变滚动区域的dom结构后必须重新刷新你的iscroll
				onRefresh: function () {
		            _maxScrollY = this.maxScrollY = this.maxScrollY + pullUpOffset;
		     
					if (pullDownEl.className.match('loading')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
					} else if (pullUpEl.className.match('loading')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
					}
				},
				//表示滚动条开始滑动
				onScrollMove: function () {
				// this.y  滚动条滚动的值,滚动区域滚动大大小;
				// this.maxScrollY  滚动条滚动到底部可走的最大距离  负数
				// this.minScrollY  滚动条滚动到顶部可走的最大距离  负数
		//		console.log(this.maxScrollY);
		//		console.log(this.y);
					if (this.y > 5 && !pullDownEl.className.match('flip')) {
						pullDownEl.className = 'flip';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...';  //松开刷新
						this.minScrollY = 0;    //加载中可见
						
					} else if (this.y < 5 && pullDownEl.className.match('flip')) {
						pullDownEl.className = '';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
						console.log(this.minScrollY);
						this.minScrollY = -pullDownOffset;   //自动回到初始位置
					} else if (this.y <= (_maxScrollY - pullUpOffset) && !pullUpEl.className.match('flip')) {
						pullUpEl.className = 'flip';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
		                this.maxScrollY = this.maxScrollY - pullUpOffset;
					} else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
						pullUpEl.className = '';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
		                this.maxScrollY = this.maxScrollY + pullUpOffset;
					}
				},
				//表示滚动条滑动结束时候
				onScrollEnd: function () {
					if (pullDownEl.className.match('flip')) {
						pullDownEl.className = 'loading';
						pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
						P.pullDownAction();	// ajax调用
					} else if (pullUpEl.className.match('flip')) {
						pullUpEl.className = 'loading';
						pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
						P.pullUpAction();	// ajax调用
					}
				}
			});
		}
	};
    module.exports = {
        init:P._init,
    }



});



