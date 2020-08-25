let banner = (function anonymous() {
    let queryData = function (callback) {
        $.ajax({
            url:'./js/data.json',
            success:result=>{
                callback && callback(result)
            }
        })
    }
    let $container = $('.container');
    let $wrapper = $container.find('.wrapper');
    let $oLis = $container.find('.pagination li');
    let $changeLeft = $container.find('.changeLeft');
    let $changeRight = $container.find('.changeRight');
    let timer = null;
    let activeIndex = 0;
    let count = 0;
    let bindHtml = function (data) {
        let str = ``;
        data.forEach(item => {
            str += `<div class="slide"><img src=${item.img} alt=""></div>`;
        });
        $wrapper.html(str)
        $slides = $wrapper.find('.slide'); 
    }
    let change = function () {
        let $active = $slides.eq(activeIndex);
        let $siblings = $active.siblings();
        $active.css('transition','opacity 0.3s');
        $siblings.css('transition','opacity 0s');
        $active.css('zIndex',1);
        $siblings.css('zIndex',0);
        $active.css('opacity',1).on('transitionend',function () { 
            $siblings.css('opacity',0);
        });
        autoFocus();
    }
    let autoPlay = function () {
        activeIndex++;
        if (activeIndex >= count) {
            activeIndex = 0;
        }
        change()
    }
    let autoFocus = function () {
        $oLis.each((index,item)=>{
            $item = $(item);
            if (index === activeIndex) {
                $item.addClass('active')
                return
            }
            $item.removeClass('active')
        })
    }
    let handleFocus = function () {
        $oLis.click(function () {
            activeIndex = $(this).index();
            $oLis.each((index,item)=>{
                $item = $(item);
                if (index === activeIndex) {
                    $item.addClass('active')
                    return
                }
                $item.removeClass('active')
            })
            change()
        })
    }
    let handleButton = function () {
        $changeRight.click(function () {
            autoPlay()    
        })     
        $changeLeft.click(function () {
            activeIndex--;
            if (activeIndex < 0) {
                activeIndex = 3;
            }
            change()  
        })     
    }
    return {
        init(){
            queryData(function (data) {
                bindHtml(data);
                count = data.length;
                timer = setInterval(autoPlay, 1000);
                handleFocus();
                handleButton();    
            });
            
            $container.mouseover(()=>{
                clearInterval(timer)
            }).mouseout(()=>{
                timer = setInterval(autoPlay, 1000);
            })
        }
    }
})()
banner.init()