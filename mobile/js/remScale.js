;(function(){

    function computedFont(){
        var winW = document.documentElement.clientWidth;

        // 最大宽度是750；
        if(winW > 750){
            winW = 750;
        }

        winW.style.fontSize = winW/750*100 + "px";
    }

    computedFont();

    window.addEventListener("resize", computedFont);

})();