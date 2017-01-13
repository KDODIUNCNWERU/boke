/**
 * Created by 诗宝宝 on 2016/12/17.
 */
define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");

    var P={
        _init:function (oIndex) {
            P.footInit(oIndex);
        },
        footInit:function (oIndex) {
            $(".footer-wrap li").eq(oIndex).addClass("active").siblings().removeClass("active");
            console.log(oIndex);
            P.setLocalFromUrl(oIndex);
        },
        setLocalFromUrl:function (oIndex) {
            var urlArr=window.location.href.split("/");
            for(var i=0;i<urlArr.length;i++){
                if(urlArr[i].indexOf(".html")){
                    var thishash="htmlHash_"+oIndex;
                    localStorage.setItem(thishash,urlArr[i]);
                }
            }
        }
    }
    module.exports = {
        init:P._init,
    }
})
