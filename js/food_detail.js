define(function(require,exports,module){
	require("../src/js/jquery-1.12.4.js");
	require("../src/js/flexible");
	require("../src/js/iscroll");
	var P = {
		_init:function(){
			P.loaded();
			
		},
		loaded:function(){
			var _url=location.href;
			var ID=_url.split("=")[1];
			$.ajax({
				type:"get",
				url:"../json/detail/"+ID+".json",
				async:true,
				dataType:"json",
				success:function(data){
					jiazai(data);
					$("h4").on("click",function(){
					console.log(11)
					var reg=/info$/;
	                for(var i=0;i<localStorage.length;i++){
	                    var thiskey=localStorage.key(i); 
	                    console.log(11)
	                    if(reg.test(thiskey)){
	                    	if(localStorage.getItem(thiskey)=="login"){
	                    		window.location.href="cart_details.html";
	                    	}else{
	                    		window.location.href="login.html";
	                    	}
	//                      localStorage.setItem(thiskey,"offline");
							
							console.log(11)
	                    }else{
	                    	window.location.href="login.html";
	                    }
	                }				
				})
				}
			});
		}
	}
	function jiazai(data){
		if(data.detailsUrl){
			var $object=$("<div class='object'><video  src='"+data.detailsUrl+"'></video><img src='"+data.imageUrl+"'/><a href='javascript:;' class='icon iconfont'>&#xe63a</a></div>");
			$object.appendTo($("section"));
			var flag=0;
			$(".object .icon").click(function(ev){
				var ev=ev||window.event;
				 event.stopPropagation();
				$(this).toggleClass("icon1");
				$(".object img").toggleClass("img1");
				$(".object video")[0].load();
				$(".object video")[0].play();
			});
			$(".object").click(function(){
				$(".object .icon").removeClass("icon1");
				$(".object img").removeClass("img1");
				$(".object video")[0].pause();
			});
		}else{
			var $object=$("<div class='object'><img src='"+data.imageUrl+"'/></div>");
			$object.appendTo($("section"));
		}
		$("header h2").html(data.title);
		var $introduce=$("<dl class='introduce'><dt><h3>"+data.title+"</h3><span><i class='iconfont'>&#xe63f</i>"+data.clickCount+"</span></dt><dd>"+data.description+"</dd></dl>");
		$introduce.appendTo($("section"));
		var $h4=$("<h4>一键选购视频中的商品<i class='iconfont'>&#xe639</i></h4>");
		$h4.appendTo($("section"));
		var $foodready=$("<ul class='foodready'><li class='con'><i class='iconfont'>&#xe62b</i><span>烹饪时间 <em>"+data.maketime+"</em></span></li><li class='con'><i class='iconfont'>&#xe6f3</i><span>食材</span><</i><span>烹饪时间 <em>"+data.maketime+"</em></span></li><li class='con'><i class='iconfont'>&#xe6f3</i><sp/li><li class='ingrediengs'><h5>一般材料</h5></li><li class='con'><i class='iconfont'>&#xe645</i><span>烹饪步骤</span></li></ul>");
		$foodready.appendTo($("section"));
		for(var i=0;i<data.ingredients.length;i++){
			 var $p=$("<p><span class='s01'>"+data.ingredients[i].name+"</span>/<span class='s02'>"+data.ingredients[i].cnt+"</span><span class='s03'>"+data.ingredients[i].unit+"</span></p>");
			$p.appendTo($(".ingrediengs"));
		}
		
		for(var j=0;j<data.steps.length;j++){
			var $steps=$("<div class='steps'><p class='cookstep'>烹饪步骤<span class='count'>"+data.steps[j].stepNo+"</span>/<span class='total'>6</span></p><p class='img'><img src='"+data.steps[j].imageUrl+"'/></p><p class='cooktem'>"+data.steps[j].content+"</p></div>");
			$steps.appendTo($("section"));
		}
		var $comment=$("<div class='comment'><h2>评论<i class='iconfont'>&#xe63c</i></h2><dl><dt><img src='../img/icon1.png'/></dt><dd class='ID'>伙夫的心意</dd><dd class='pl'>伙夫的心意</dd><dd class='img'><img src='../img/pl.png'/></dd><dd class='others'><p><b><i class='iconfont'>&#xe613</i><em>0</em></b><b><i class='iconfont'>&#xe603</i><em>回复</em></b></p><span>2016/07/23&nbsp 20:12</span></dd><dd class='reply'><span>小煮</span><a href='javascript::'>：伙夫，你的心意到了就行</a></dd></dl><dl><dt><img src='../img/icon1.png'/></dt><dd class='ID'>伙夫的心意</dd><dd class='pl'>伙夫的心意</dd><dd class='img'><img src='../img/pl.png'/></dd><dd class='others'><p><b><i class='iconfont'>&#xe613</i><em>0</em></b><b><i class='iconfont'>&#xe603</i><em>回复</em></b></p><span>2016/07/23&nbsp 20:12</span></dd><dd class='reply'><span>小煮</span><a href='javascript::'>：伙夫，你的心意到了就行</a></dd></dl></div>");
		$comment.appendTo($("section"));
		
	}
	//导出某个接口
	//	export.dosomething = ...
	
	//模块导出  整个接口
	module.exports = {
		init:P._init,    
	}
})
