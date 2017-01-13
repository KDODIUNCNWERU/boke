<<<<<<< HEAD
//var $ = require("./jquery-1.12.4.js");
//var thisIscroll = require("./iscroll.js");
=======
/**
 * Created by 诗宝宝 on 2016/12/8.
 */
>>>>>>> a73c2741e867682d3ff9a1ce86c1ca6696102a32
var myiscroll,
    pullDownEl, pullDownOffset,_maxScrollY,
    pullUpEl, pullUpOffset,refresh=0,loadmore=0;
var oul = document.getElementById("thelist");

getGoodsData(true);
function getGoodsData(init,classID,goodsID,linenumber,pageCode,flag){
    var classID=classID?classID:0;
    var goodsID=goodsID?goodsID:0;
    var pageCode=pageCode?pageCode:0;
    var linenumber=linenumber?linenumber:6;
    $.ajax({
        type:"get",
        url:"http://datainfo.duapp.com/shopdata/getGoods.php",
        dataType:"jsonp",
        data:{
            classID:classID,
            goodsID:goodsID,
            pageCode:pageCode,
            linenumber:linenumber
        },
        success:function(data){
			console.log(data);
/*            var thisData=data;
            for(var i=0;i<thisData.length;i++){
                var price=thisData[i].price;
                var discount=thisData[i].discount;
                var goodsName=thisData[i].goodsName;
                var imgUrl=thisData[i].goodsListImg;
                var newPrice=parseInt(price*discount/10);
                var goodsId=thisData[i].goodsID
                //var oLi=$("<dl class='list1'><dt class='pic'><img src="+imgUrl+" /></dt><dd class='d1'><span class='title'>"+goodsName+"</span><span class='real-price'>￥"+newPrice+"</span><span class='original-price'>￥"+price+"</span><span class='discount'>"+discount+"折</span><span class='addcart icon iconfont icon-gouwuche'></span></dd></dl>");
                var oLi=("<li class='dia-list'><dl><dt><img src="+imgUrl+"></dt><dd><h5>"+goodsName+"</h5><div class='info'><div class='price'><span>￥"+newPrice+"</span><em>￥"+price+"</em><i>"+discount+"折</i></div><div class='addcart' data-id="+goodsId+"><i class='iconfont'>&#xe64b;</i></div></div></dd></dl></li>");
                if(flag){
                    $("#thelist").append(oLi);
                }else{
                    $("#thelist").prepend(oLi);
                }

            }*/
            if(init){
                return false;
            }else{
                myiscroll.refresh();
            }

        }
    });
}

// 上拉刷新请求ajax的回调函数
/*function pullUpAction(){
    setTimeout(function(){
        getGoodsData(false,0,0,3,0,true)
    },1500);
}*/
// 下拉加载更多请求ajax的回调函数
function pullDownAction(){
    setTimeout(function(){
        getGoodsData(false,0,0,3,0,false);
    },1500);
}

function loaded(){
    pullDownEl = document.getElementById('pullDown');
    pullDownOffset = pullDownEl.offsetHeight;
    myiscroll =  new iScroll("wrapper",{
        vScroll:true,      //false禁用垂直方向滚动条
        vScrollbar:true,   //隐藏滚动条
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
        },
        //表示滚动条开始滑动
        onScrollMove: function () {
            // this.y  滚动条滚动的值,滚动区域滚动大大小;
            // this.maxScrollY  滚动条滚动到底部可走的最大距离  负数
            // this.minScrollY  滚动条滚动到顶部可走的最大距离  负数
            //console.log(this.maxScrollY);
            //console.log(this.y);
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
        },
        //表示滚动条滑动结束时候
        onScrollEnd: function () {
            if (pullDownEl.className.match('flip')) {
                pullDownEl.className = 'loading';
                pullDownEl.querySelector('.pullDownLabel').innerHTML = '加载中...';
                pullDownAction();	// ajax调用
            }
        }
    });
}
document.addEventListener("touchmove",function(e){e.preventDefault()},!1);
document.addEventListener("DOMContentLoaded",loaded,!1);