define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    require("../src/js/iscroll");
    var myiscroll,fiscroll,seciscroll,
        pullDownEl, pullDownOffset,_maxScrollY,
        pullUpEl, pullUpOffset,refresh=0,loadmore=0;
    var oul = document.getElementById("thelist");


    var P={
        _init:function () {
            P.loaded();
            myiscroll.refresh();
            document.addEventListener("touchmove",function(e){e.preventDefault()},!1);
            document.addEventListener("DOMContentLoaded",P.loaded,!1);
        },

        // 上拉刷新请求ajax的回调函数
        pullUpAction:function (){
            myiscroll.refresh();
            /*setTimeout(function(){
             P.getGoodsData(0,0,3,0,true);
             },1500);*/
        },
        // 下拉加载更多请求ajax的回调函数
        pullDownAction:function (){
            myiscroll.refresh();
            /*setTimeout(function(){
             P.getGoodsData(0,0,3,0,false);
             },1500);*/
        },
        loaded:function (){
            pullDownEl = document.getElementById('pullDown');
            pullDownOffset = pullDownEl.offsetHeight;
            pullUpEl = document.getElementById('pullUp');
            pullUpOffset = pullUpEl.offsetHeight;
            myiscroll =  new iScroll("wrapper",{
                vScroll:true,      //false禁用垂直方向滚动条
                vScrollbar:false,   //隐藏滚动条
                hideScrollbar:true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
                fadeScrollbar:true,
                bounce:true,   //是否有反弹效果
                lockDirection:true, //当某一方向滚动时，会锁住另一方向的滚动
                useTransition:true,  //是否使用css3过渡效果
                topOffset:pullDownOffset,    //已经滚动的基准值

                //表示滚动条重新 刷新  每次改变滚动区域的dom结构后必须重新刷新你的iscroll
                onRefresh: function () {
                    _maxScrollY = this.maxScrollY = this.maxScrollY + pullUpOffset;

                    if (pullDownEl.className.match('loading')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                    }
                    else if (pullUpEl.className.match('loading')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
                    }
                },
                //表示滚动条开始滑动
                onScrollMove: function () {
                    // this.y  滚动条滚动的值,滚动区域滚动大大小;
                    // this.maxScrollY  滚动条滚动到底部可走的最大距离  负数
                    // this.minScrollY  滚动条滚动到顶部可走的最大距离  负数
                    //		console.log(this.maxScrollY);
                    //		console.log(this.y);
                    if (this.y > 5 && !pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'flip';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '松开刷新...';  //松开刷新
                        this.minScrollY = 0;    //加载中可见

                    } else if (this.y < 5 && pullDownEl.className.match('flip')) {
                        pullDownEl.className = '';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '下拉刷新...';
                        console.log(this.minScrollY);
                        this.minScrollY = -pullDownOffset;   //自动回到初始位置
                    }
                    else if (this.y <= (_maxScrollY - pullUpOffset) && !pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'flip';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '松开加载...';
                        this.maxScrollY = this.maxScrollY - pullUpOffset;
                    } else if (this.y > (_maxScrollY - pullUpOffset) && pullUpEl.className.match('flip')) {
                        pullUpEl.className = '';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
                        this.maxScrollY = this.maxScrollY + pullUpOffset;
                    }
                },
                //表示滚动条滑动结束时候
                onScrollEnd: function () {
                    if (pullDownEl.className.match('flip')) {
                        pullDownEl.className = 'loading';
                        pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                        P.pullDownAction();	// ajax调用
                    }
                    else if (pullUpEl.className.match('flip')) {
                        pullUpEl.className = 'loading';
                        pullUpEl.querySelector('.pullUpLabel').innerHTML = '加载更多...';
                        P.pullUpAction();	// ajax调用
                    }
                }
            });
            fiscroll=new iScroll("firstis",{
            	vScroll:false,      //false禁用垂直方向滚动条
                vScrollbar:false,
                hScroll:true,      //false禁用垂直方向滚动条
                hScrollbar:false,
                hideScrollbar:true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
                fadeScrollbar:true,
            });
            seciscroll=new iScroll("secondis",{
            	vScroll:false,      //false禁用垂直方向滚动条
                vScrollbar:false,
                hScroll:true,      //false禁用垂直方向滚动条
                hScrollbar:false,
                hideScrollbar:true, //用户没有操作时候默认(true)隐藏滚动条 false不隐藏
                fadeScrollbar:true,
            });
        }
    };
    module.exports = {
        init:P._init,
    }



});


