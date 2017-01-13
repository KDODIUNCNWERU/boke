define(function(require,exports,module){
	require("../src/js/swiper-3.3.1.min");
	require("../src/js/jquery-1.12.4");
	require("../src/js/iscroll");
	require("../src/js/angular.min");
	var P = {
		_init:function(){
			P.swiperInit();
		},
		swiperInit:function(){
			var myapp=angular.module("myapp",[]);
			myapp.controller("myCtrl",function($scope){
				var foodMaterial=[
					{name:"水",dosage:"60毫升"},
					{name:"香油",dosage:"10毫升"},
					{name:"黑胡椒",dosage:"2克"},
					{name:"白芝麻",dosage:"5克"},
					{name:"蒜瓣",dosage:"10瓣"},
					{name:"干辣椒",dosage:"8个"},
					{name:"大葱",dosage:"2根"},
					{name:"白醋",dosage:"200毫升"},
					{name:"去骨鸡腿肉",dosage:"1kg"},
					{name:"蒜泥",dosage:"2茶匙"},
					{name:"葱末",dosage:"1茶匙"},
					{name:"酱油",dosage:"15毫升"},
					{name:"姜泥",dosage:"1汤匙"},
					{name:"小米椒",dosage:"适量"},
					{name:"红椒",dosage:"2个"},
					{name:"青椒",dosage:"2个"},
					{name:"色拉油",dosage:"8毫升"},
					{name:"花椒",dosage:"5克"},
					{name:"八角",dosage:"5个"},
					{name:"桂皮",dosage:"10克"},
					{name:"淀粉",dosage:"15克"},
					{name:"糖浆",dosage:"30毫升"},
				];
				$scope.foodMaterial=foodMaterial;
				var employees = [{
					imgUrl: "http://fpf666.applinzi.com/img/f1.jpg",
					step: "STEP01",
					para: "把鸡腿肉切块状,放入姜泥,酱油及黑胡椒,拌匀静置20分"	
				}, {
					imgUrl: "http://fpf666.applinzi.com/img/f2.jpg",
					step: "STEP02",
					para: "加入蛋清及土豆淀粉用手拌匀"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f3.jpg",
					step: "STEP03",
					para:"把大葱切丝, 蒜瓣切1/2"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f4.jpg",
					step: "STEP04",
					para:"准备小锅,倒入油,加热,放入大蒜及葱丝炸金黄色, 捞起备用"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f5.jpg",
					step: "STEP05",
					para:"接着取用适量热油倒入辣椒面,降温后过滤辣椒面,保存辣油备用"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f6.jpg",
					step: "STEP06",
					para:"把鸡肉放入油锅内,不停翻拌油锅内的鸡肉,大约炸五分钟,捞起,熄火"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f7.jpg",
					step: "STEP07",
					para:"把红绿辣椒切丝备用"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f8.jpg",
					step: "STEP08",
					para:"准备小碗放入酱油,玉米糖浆,水,白醋及土豆淀粉拌匀备用"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f9.jpg",
					step: "STEP09",
					para:"取一个炒锅,放入自制辣油加热,放入红绿辣椒丝,洋葱丁,葱末,干辣椒,大火爆炒2~3分,加入拌好的酸甜酱汁熬煮20~30秒后熄火"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f10.jpg",
					step: "STEP10",
					para:"把炸过的鸡块再次回锅炸约3~5分钟直到浅棕色后捞起沥干"
				},{
					imgUrl: "http://fpf666.applinzi.com/img/f11.jpg",
					step: "STEP11",
					para:"把炸好的鸡块放入炒酸甜酱的锅内加热,使鸡块均匀裹上酱汁,放入炸过的葱丝,大蒜,香油及白芝麻,拌匀装盘"
				}
			]
			$scope.emp=employees;
			
			})
			
		},
		echartInit:function(){
			
		}
	}
	//导出某个接口
	//	export.dosomething = ...
	
	//模块导出  整个接口
	module.exports = {
		init:P._init,    
	}
})

