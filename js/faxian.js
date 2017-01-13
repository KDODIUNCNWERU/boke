
define(function(require,exports,module){
	require("../src/js/swiper-3.3.1.min");
	require("../src/js/jquery-1.12.4");
	var footer=require("../js/footer");
	var loadf=require("../js/loadfooter");
	
//	require("../src/js/flexible");

	var P = {
		_init:function(){
			P.getSwiperData();
			P.init();
			P.echartInit();
		},
		init:function () {
            $("header").load("../html/common.html .header-wrap",function () {
                $(".h-icon").hide();
                $('.header-cont h1').html("发现");
            });
            $("footer").load("../html/common.html .footer-wrap",function () {
				loadf.init(2);
                footer.init();

            });
            
        },
        
        	
       
		swiperInit:function(){
			var myswiper=new Swiper("#index-banner",{
                resistanceRatio:0,
                loop:true,
                speed:2000,
                autoplay:true,
                pagination:'.swiper-pagination',
                paginationClickable:true,
            });
		},
		 getSwiperData:function () {
            P.swiperInit();
            
         },
		echartInit:function(){
			$(".swiper-slide").click(function(){
            	location.href="faxian2.html";
            })
		}
	}
	//导出某个接口
	//	export.dosomething = ...
	
	//模块导出  整个接口
	module.exports = {
		init:P._init,    
	}
})

