define(function(require,exports,module){
	require("../src/js/flexible");
	require("../src/js/jquery-1.12.4");
	require("../src/js/iscroll");
	var footer=require("../js/footer");
	var loadf=require("../js/loadfooter");

	var S=require("./zcmmyiscroll");
	var P = {
		_init:function(){
//			plus.key.addEventListener("backbutton",function(){
//			});
		},
		header:function(){
			$("#header").load("common.html .header-wrap",function(){
				$('.header-cont h1').html("食谱");
				$("#icon-btn").on("click",function(){
					if(localStorage.getItem("zcmFlag")=="true"){
						localStorage.setItem("zcmFlag",false);
						$("#icon-btn").html("&#xe63b;");
						S.init();
						$("#thelist").html("");						
					}else{
						localStorage.setItem("zcmFlag",true);
						$("#icon-btn").html("&#xe60b;");
						S.init();
						$("#thelist1").html("");
					}					
				})
			});
		},
		footer:function(){
			$("#footer").load("common.html .footer-wrap",function(){
				loadf.init(1);
				footer.init();
			});
		}
	}
	//导出某个接口
	//	export.dosomething = ...
	
	//模块导出  整个接口
	module.exports = {
		init:P._init,
		header:P.header,
		footer:P.footer
	}
})