define(function(require,exports,module){
	require("../src/js/jquery-1.12.4.js");
	require("../src/js/flexible");
	require("../src/js/iscroll");
	var arr=new Array();
	var P = {
		_init:function(){
			P.loaded();
		},
		loaded:function(){
			$(".choose").on("click","li",function(){
				var $index=$(this).index();
				$(this).toggleClass("active").siblings().removeClass("active");
				$(".choose_list dl").eq($index).toggleClass("active").siblings().removeClass("active");
				P.selects($index);
			});
		},
		selects:function(str){
				$.ajax({
				type:"get",
				url:"../json/select0"+str+".json",
				async:true,
				dataType:"json",
				success:function(data){
					jiazai(data);
					_click();
					var _top=$(".choose_list").position().top+$(".choose_list").innerHeight();
					$("#wrapper").css({top:_top});
				}
			});
		}	
	}
	function jiazai(data){
		for(var i=0;i<data.length;i++){
			$("<span>"+data[i].name+"</span>").appendTo($(".choose_list .active dd"));
		}
	}
	function _click(){
		$(".choose_list dl span").bind("click",function(){
			$(".choose .active").html($(this).html()+"<b></b>");
			$(".choose li").removeClass("active");
			$(".choose_list .active").find("span").removeClass("active");
			$(".choose_list dl").removeClass("active");
			var _top=$(".choose_list").position().top+$(".choose_list").innerHeight();
			$("#wrapper").css({top:_top});
			$(this).addClass("active");
			
		});
	}
	module.exports = {
		init:P._init,    
	}
})
