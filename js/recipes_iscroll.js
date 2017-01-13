define(function(require, exports, module) {
	require("../src/js/jquery-1.12.4");
	require("../src/js/iscroll");
	var myiscroll,
		pullDownEl, pullDownOffset, _maxScrollY,
		pullUpEl, pullUpOffset, refresh = 0,
		loadmore = 0;
		
	function pullDownAction() {
		myiscroll.refresh();
	}
	function pullUpAction() {
		myiscroll.refresh();
	}
	function init(){
		var _url=location.href;
		var ID=_url.split("=")[1];
		if(!ID){
			ID="jiachangcai";
		}
		$.ajax({
			type:"get",
			url:"../json/"+ID+".json",
			async:true,
			dataType:"json",
			success:function(data){
				jiazai(data);
				myiscroll.refresh();
			}
			
		});
	}
	function jiazai(data){
		for(var i=0;i<data.length;i++){
			var $dl=$("<dl ID='"+data[i].id+"'><dt><img src='"+data[i].imageUrl+"'/></dt><dd class='mz'>"+data[i].name+"</dd><dd class='js'>"+data[i].description+"</dd><dd class='others'><i class='iconfont'>&#xe62a</i><em class='iconfont'>&#xe63f</em><span>"+data[i].clickCount+"</span></dd></dl>");
			$dl.appendTo($(".food_display"));
		}
		$(".food_display").on("click","dl",function(){
			var $id=$(this).attr("ID");
			location.href="food_detail.html?id="+$id;
		});
	}
	var P = {
		_init: function() {
			P.loaded();
		},
		loaded: function() {
				init();
				pullDownEl = document.getElementById('pullDown');
				pullDownOffset = pullDownEl.offsetHeight;
				pullUpEl = document.getElementById('pullUp');
				pullUpOffset = pullUpEl.offsetHeight;
				myiscroll = new iScroll("wrapper", {
					vScroll: true, //false禁用垂直方向滚动条
					vScrollbar: true, //隐藏滚动条
					hideScrollbar: true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
					fadeScrollbar: true,
					bounce: true, //是否有反弹效果
					lockDirection: true, //当某一方向滚动时，会锁住另一方向的滚动
					useTransition: true, //是否使用css3过渡效果
					topOffset: pullDownOffset, //已经滚动的基准值

					//表示滚动条重新 刷新  每次改变滚动区域的dom结构后必须重新刷新你的iscroll
					onRefresh: function() {
						_maxScrollY = this.maxScrollY = this.maxScrollY + pullUpOffset;

						if(pullDownEl.className.match('loading')) {
							pullDownEl.className = '';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
						} else if(pullUpEl.className.match('loading')) {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
						}
					},
					//表示滚动条开始滑动
					onScrollMove: function() {
						// this.y  滚动条滚动的值,滚动区域滚动大大小;
						// this.maxScrollY  滚动条滚动到底部可走的最大距离  负数
						// this.minScrollY  滚动条滚动到顶部可走的最大距离  负数
						if(this.y > 5 && !pullDownEl.className.match('flip')) {
							pullDownEl.className = 'flip';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...'; //松开刷新
							this.minScrollY = 0; //加载中可见

						} else if(this.y < 5 && pullDownEl.className.match('flip')) {
							pullDownEl.className = '';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
							this.minScrollY = -pullDownOffset; //自动回到初始位置
						} else if(this.y <= (_maxScrollY - pullUpOffset) && !pullUpEl.className.match('flip')) {
							pullUpEl.className = 'flip';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
							this.maxScrollY = this.maxScrollY - pullUpOffset;
						} else if(this.y > (_maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
							pullUpEl.className = '';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
							this.maxScrollY = this.maxScrollY + pullUpOffset;
						}
					},
					//表示滚动条滑动结束时候
					onScrollEnd: function() {
						if(pullDownEl.className.match('flip')) {
							pullDownEl.className = 'loading';
							pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
							pullDownAction(); // ajax调用
						} else if(pullUpEl.className.match('flip')) {
							pullUpEl.className = 'loading';
							pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
							pullUpAction(); // ajax调用
						}
					}
				});
			}
		}
	module.exports = {
		init: P._init,
	}
});