define(function(require,exports,module){
	require("../src/js/jquery-1.12.4.js");
	require("../src/js/flexible");
	require("../src/js/iscroll");
	var P = {
		_init:function(){
			P.loaded();
		},
		iscroll:function(){
			var $scroller = $("#scroller"); 
			var $subnavli=$(".subnav li");
			var $content=$scroller.children();
			myiscroll =  new iScroll("wrapper",{
				vScroll:true,      //false禁用垂直方向滚动条
				vScrollbar:false,   //隐藏滚动条
				hideScrollbar:true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
				fadeScrollbar:true,
				bounce:false,   //是否有反弹效果
				lockDirection:true, //当某一方向滚动时，会锁住另一方向的滚动
				useTransition:true,  //是否使用css3过渡效果
				topOffset:0,    //已经滚动的基准值
				onScrollEnd:function(){
					var $scrollertop=-$scroller.position().top;
					for(var i=0;i<$content.size();i++){
						if($scrollertop>=$content.eq(i).position().top&&$scrollertop<=($content.eq(i).position().top+$content.eq(i).innerHeight())){
							$subnavli.eq(i).addClass("active").siblings().removeClass("active");
						}
					}
				}
			});
			
		},
		loaded:function(){
			$.ajax({
				type:"get",
				url:"../json/recipes_list.json",
				async:true,
				dataType:"json",
				success:function(data){
					jiazai(data);
					P.iscroll();
				}
			});
			function jiazai(data){
				for(var i=0;i<data.length;i++){
					$("<li ID='"+data[i].id+"'><div><img src='../img/"+data[i].imgurl+"' /></div><span>"+data[i].name+"</span></li>").appendTo($("#scroller .list"))
				}
				$("#scroller .list").on("click","li",function(){
					var $id=$(this).attr("ID");
					location.href="recipes_search.html?id="+$id;
				});
			}
		}
	}
	//导出某个接口
	//	export.dosomething = ...
	
	//模块导出  整个接口
	module.exports = {
		init:P._init,    
	}
})
