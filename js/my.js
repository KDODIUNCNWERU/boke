define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    require("../src/js/flexible");
 	 require("../src/js/layer");
	var footer=require("../js/footer");
	var loadf=require("../js/loadfooter");
 	 var username;
    var P={
        _init:function () {
            P.init();
            P.login();
        },
		init:function () {
			$("footer").load("../html/common.html .footer-wrap",function () {
				loadf.init(3);
				footer.init();

			});
			var reg=/info$/;
                for(var i=0;i<localStorage.length;i++){
                    var thiskey=localStorage.key(i);
                    //console.log(thiskey);
                    //console.log(reg.test(thiskey));
                    if(reg.test(thiskey)){
                    	var info=thiskey;
                    	var status=thisHash=localStorage.getItem(info);
                    	if(status=="login"){
                    		username=info.split("info")[0];
							$(".username").html(username);
							$(".exit").show();
                    	}else{
                    		$(".username").on("click",function(){
                    			window.location.href="login.html";
                    		})
                    	}
                        
                    }else{
                    	$(".username").on("click",function(){
                    			window.location.href="login.html";
                    	})
                    }
                }
			 	
			$(".exit").on("click",function(){
				P.quit();
			})	
				
			
			$(".collect li").on("click",function(){
				var status= localStorage.getItem(thiskey);
				if(status==="login"){
					window.location.href="login.html";
				}else{
				 layer.open({
	                    content: '请您先登录',
	                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
	                    time: 2,
	                });
				}
			});
		},
		quit:function(){
			var quitKey=username+"info";
			localStorage.setItem(quitKey,"offline");
			$(".username").html("登录/注册");
			$(".exit").hide();
		},
		login:function(){
			
			
			$(".sys").on("click",function(){
				window.location.href="saoyisao.html";
			})
		},
    };

    module.exports = {
        init:P._init,
    }

})

