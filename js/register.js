define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    require("../src/js/flexible");
 	require("../src/js/layer");
    var P={
        _init:function () {
            P.init();
            P.icon();
        },
		init:function () {
		   $("#reg-btn").on("click",function () {
		   	if($("#gou").css("display")=="block"){
		   		
		   	}else{
		   		layer.open({
	                content: '请同意日日煮协议',
	                style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
	                time: 2,
	            });
	            return false;
		   	}
			    var username=$(".username").val();
			    var psw=$(".pwd").val();
			    var pswa=$(".paw-again").val();
			
			    var re = /^[a-zA-Z0-9_]{5,12}$/;
			    var patrn = /^(\w){8,18}$/;
			    if(username!=""&&psw!=""&&pswa!=""){
			        if(!re.exec(username)){
			            layer.open({
			                content: '用户名应为5到12位数字和字母',
			                style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
			                time: 2,
			            });
			            P.clean();
			
			        }else if(!patrn.exec(psw)){
			            layer.open({
			                content: '密码应为8到18位数字和字母',
			                style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
			                time: 2,
			            });
			            P.clean();
			        }else{
			            if(pswa!=psw){
			                layer.open({
			                    content: '密码应输入一致',
			                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
			                    time: 2,
			                });
			               P.clean();
			            }else{
			
			
			                	P.saveInfo(username,psw);
			
			            }
			        }
			
			   	 	}else{
				        layer.open({
				            content: '用户名和密码不能为空',
				            style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
				            time: 2,
				            /* content: 'hello layer'
				             , style: 'width:300px;height:100px;background:url(../img/ok.png) no-repeat 10px 10px #09C1FF; color:#fff; border:none;font-size:30px'
				             ,skin: 'msg'
				             ,time: 2 //2秒后自动关闭*/
				        });
				        P.clean();
				    }
				
				})
		},
		clean:function(){
		    $(".username").val('');
		    $(".pwd").val('');
		    $(".paw-again").val('');
		},
		saveInfo:function(username,psw) {
			var username=$(".username").val();
		    var param = {
		        status:"register",
		        userID:username,
		        password:psw
		    };
		    $.ajax({
		        url:"http://datainfo.duapp.com/shopdata/userinfo.php",
		        type:"get",
		       // dataType:"jsonp",   //jsonp，返回数据为json
		        data:param,
		//		timeout:30000,
		        success:function(data){
		            if(data==1){
		                layer.open({
		                    content: '登录成功，欧也~',
		                    style: 'background:url(../img/ok.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
		                    time: 2,
		                });
		                setTimeout(function(){
		                	window.location.href="login.html";
		                },1000)
		            }else if(data==0){
		                layer.open({
		                    content: '抱歉，用户名已被注册',
		                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
		                    time: 2,
		                });
		                P.clean();
		            }else{
		                layer.open({
		                    content: '呜呜呜，数据库出错啦',
		                    style: 'background:url(../img/false.png) no-repeat 20px 20px #09C1FF; color:#fff; border:none;font-size:30px',
		                    time: 2,
		                });
		                P.clean();
		            }
		        }
		    })
		},
		icon:function(){
			$("#gou").on("click",function(){
				$("#gou").hide();
				$("#gou2").show();
			})
			$("#gou2").on("click",function(){
				$("#gou2").hide();
				$("#gou").show();
			})
			$(".jump_login").on("click",function(){
				window.location.href="login.html";
			})
		},
       
    };

    module.exports = {
        init:P._init,
    }

})

