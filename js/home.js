/**
 * Created by 诗宝宝 on 2016/12/15.
 */
define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    require("../src/js/flexible");
    require("../src/js/swiper-3.3.1.min");
    var footer=require("../js/footer");
    var loadf=require("../js/loadfooter");
    var urlArr=["home.html","recipes.html","faxian.html","my.html"];
    var hType="htmlHash_";
    var P={
        _init:function () {
            P.init();
            P.getSwiperData();
            P.getIscroll();
            P.getSecIscroll();
            P.getBottomItem();
            //判断是否首次进入
            if(localStorage.pcount){
                //不是第一次
                localStorage.pcount++;

            }else{
                localStorage.pcount=1;
                for(var i in urlArr){
                    var type=hType+i;
                    localStorage.setItem(type,urlArr[i]);
                }
            }
            $('.recipe').on("click",function () {
                window.location.href="../html/recipes_list.html"
            })
        },
        init:function () {
            $("header").load("../html/common.html .header-wrap",function () {
                $(".h-icon").hide();
            });
            $("footer").load("../html/common.html .footer-wrap",function () {
                loadf.init(0);
                footer.init();

            });

        },
        swiperInit:function () {
            var myswiper=new Swiper("#index-banner",{
                resistanceRatio:0,
                loop:true,
                autoplay:3000,
                speed:2000,
                pagination:'.swiper-pagination',
                paginationClickable:true,
                /*onInit:function(swiper){ //Swiper2.x的初始化是onFirstInit
                 sw.swiperAnimateCache(swiper); //隐藏动画元素
                 sw.swiperAnimate(swiper); //初始化完成开始动画
                 }*/
            });
        },
        getSwiperData:function () {
            var url=['../img/banner1.png','../img/banner2.png','../img/banner3.png','../img/banner4.png','../img/banner5.png','../img/banner6.png','../img/banner7.png']
            $.ajax({
                type:"get",
                url:"http://fpf666.applinzi.com/json/zaocan.json",
                success:function(data){
                    //console.log(data.length);
                    for(var i=0;i<7;i++){
                        var imgurl = url[i];
                        var imgtitle=data[i].title;
                        var idnum=data[i].id;
                        var slide = $("<div class='swiper-slide' ID="+idnum+"><img src="+imgurl+" title="+imgtitle+" /></div>");
                        //var slide=$("<div class='swiper-slide' ID="+idnum+"></div>").append($(".slide-pic").find(i));
                        $("#addslide").append(slide);
                         /*$(".swiper-slide").attr("ID",'idnum');*/
                    }
                    P.swiperInit();   //当swiper渲染成功后才会进行初始化swiper
                    $(".swiper-slide").on("touchmove",function(){
                        var $id=$(this).attr("ID");
                        location.href="food_detail.html?id="+$id;
                    });
                }
            })
        },
        getIscroll:function () {
            $.ajax({
                type:"get",
                url:"http://fpf666.applinzi.com/json/remen.json",
                success:function(data){
                    var thisData=data.resultList;
                    for(var i=0;i<10;i++){
                        var imgUrl=thisData[i].imageurl;
                        var goodsName=thisData[i].title;
                        var title=thisData[i].description;
                        var id=thisData[i].recipe_id;
                        var clickCount=thisData[i].click_count;
                        var oLi=$("<li class='hot-item' ID="+id+"><div class='pic'><img src="+imgUrl+"></div><div class='hot-info'><h4>"+goodsName+"</h4><p>"+title+"</p><div class='info'><i class='iconfont like'>&#xe62a;</i><i class='iconfont watched'>&#xe63f;</i><em>"+clickCount+"</em></div></div></li>");
                        $("#firstis").find("ul").prepend(oLi);
                    }
                    $(".hot-cont").on("click","li",function(){
                        var $id=$(this).attr("ID");
                        location.href="food_detail.html?id="+$id;
                    });

                }
            })
        },
        getSecIscroll:function () {
            $.ajax({
                type:"get",
                url:"http://fpf666.applinzi.com/json/roulei.json",
                success:function(data){
                    var thisData=data;
                    for(var i=0;i<10;i++){
                        var imgUrl=thisData[i].imageUrl;
                        var goodsName=thisData[i].title;
                        var title=thisData[i].description;
                        var id=thisData[i].id;
                        var clickCount=thisData[i].clickCount;
                        var oLi=$("<li class='hot-item' ID="+id+"><div class='pic'><img src="+imgUrl+"></div><div class='hot-info'><h4>"+goodsName+"</h4><p>"+title+"</p><div class='info'><i class='iconfont like'>&#xe62a;</i><i class='iconfont watched'>&#xe63f;</i><em>"+clickCount+"</em></div></div></li>");
                        $("#secondis").find("ul").prepend(oLi);
                    }
                    $(".hot-cont").on("click","li",function(){
                        var $id=$(this).attr("ID");
                        location.href="food_detail.html?id="+$id;
                    });

                }
            })
        },
        getBottomItem:function () {
            $.ajax({
                type:"get",
                url:"http://fpf666.applinzi.com/json/faxian.json",
                success:function(data){
                    var thisData=data;
                    for(var i=0;i<15;i++){
                        var imgUrl=thisData[i].imageUrl;
                        var title=thisData[i].title;
                        var discribe=thisData[i].scribe;
                        var id=thisData[i].id;
                        var oDiv=$("<div class='stra-item' ID="+id+"><img src="+imgUrl+" /><div class='mask'></div><p>"+title+"</p><h5>"+discribe+"</h5></div>");
                        $(".strategy").prepend(oDiv);
                    }
                    $(".stra-item").on("click",function(){
                        var $id=$(this).attr("ID");
                        location.href="food_detail.html?id="+$id;
                    });

                }
            })
        }

    };
    
    module.exports = {
        init:P._init,
    }

})

