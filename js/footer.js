/**
 * Created by 诗宝宝 on 2016/12/17.
 */
define(function (require,exports,module) {
    require("../src/js/jquery-1.12.4");
    var P={
        _init:function () {
            P.getUrlFromLocal();
        },
        getUrlFromLocal:function () {
            $(".footer-wrap").on("touchstart","li",function () {
                P.findUrl($(this).index());
                console.log($(this).index());
            });
        },
        findUrl:function (oIndex) {
            var reg=/^htmlHash_/;
            for(var i=0;i<localStorage.length;i++){
                var thiskey=localStorage.key(i);
                console.log(thiskey);
                if(reg.test(thiskey)){
                    var thisIndex=thiskey.split("_")[1];
                    if(thisIndex==oIndex){
                        var thishash="htmlHash_"+oIndex;
                        var url=localStorage.getItem(thishash);
                        console.log(url);
                        window.location.href=url;
                    }
                }
            }
        }
    }
    module.exports = {
        init:P._init,
    }
})