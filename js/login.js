define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    require("../src/js/flexible");
 	 require("../src/js/layer");
    var P={
        _init:function () {
            P.init();
            P.exit();
        },
		init:function () {
		    $("#log-btn").on("click",function () {
		    	var username=$(".username").val();
		    	var psw=$(".psw1").val();
		        if(username==""){
		        	layer.open({
	                    content: '抱歉，用户名不能为空',
	                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
	                    time: 2,
		             });
		             return false;
		        }
    			if(psw==""){
    				layer.open({
	                    content: '抱歉，密码不能为空',
	                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
	                    time: 2,
		             });
		             return false;
    			}
		        
		    	
		    	var param = {
			        status:"login",
				    userID:username,
			        password:psw
		    	};
		    	$.ajax({
		        url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		        type:"get",
		        //dataType:"jsonp",   //jsonp，返回数据为json
		        data:param,
		//		timeout:30000,
		        success:function(data){
		            console.log(data);
		            if(data==2){
		                layer.open({
		                    content: '抱歉，用户名与密码不一致',
		                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
		                    time: 2,
		                });
		         //  P.clean();
		            }else if(data==0){
		                layer.open({
		                    content: '抱歉，用户名不存在',
		                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
		                    time: 2,
		                });
		        //    P.clean();
		            }else{
		            	var username=$(".username").val();
		                layer.open({
		                    content: '登录成功，欧也~',
		                    style: 'background:url(../img/ok.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
		                    time: 2,
		                });
		               		               		               			               
		                function setStatu() {
		                    var reg=/info$/;
		                    for(var i=0;i<localStorage.length;i++){
		                        var thiskey=localStorage.key(i);
		                        //console.log(thiskey);
		                        //console.log(reg.test(thiskey));
		                        if(reg.test(thiskey)){
		                            localStorage.setItem(thiskey,"offline");
		                        }
		                    }
		                }
		                console.log(username);
		                var key=username+"info";
		                localStorage.setItem(key,"login");
		                //setStatu() ;
		                setTimeout(function(){
		               		window.location.href="my.html";
		               	},1500)
		                
		            }
		        }
		    })
		})
		},
        exit:function(){
        	$(".icon-cha").on("click",function(){
        		window.location.href="my.html";
        	})
        }
    };

    module.exports = {
        init:P._init,
    }

})

