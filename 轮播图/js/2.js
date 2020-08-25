let bannerModule = (function () {
    let $container = $('.container');
    let $wrapper = $container.children('.wrapper');
    let $pagination = $container.children('.pagination');
    let $oLis = $pagination.find('li')
    let $changeLeft = $container.children('.changeLeft');
    let $changeRight = $container.children('.changeRight');
    let time = 0;
    let step = 0;
    let autoTimer = null;
 
    let bounce = function (func,wait,immediate) {
        let timeout = null;
        let result = null;
        return function (...args) {
            let context = this;
            let cur = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) result = func(context,...args)
            }, wait);
            if (cur) result = func(context,...args)
        }
    }

    let autoPlay = function () { 
        step++;
        if (step >= 5) {
            $wrapper.css('left',0);
            step = 1;
        }
        $wrapper.stop().animate({
            left:-step * 1200
        },300,'linear')
        autoFocus()
    }

    let autoFocus = function () { 
        let temp = step;
        temp === 4 ? temp = 0 : null;
        $oLis.each((index,item)=>{
            let $item = $(item);
            if (temp === index) {
                $item.addClass('active');
                return
            }
            $item.removeClass('active')
        })
    }
   
    let handleFocus = function () {
        $oLis.on('click',function () {
            let n = $(this).index();
            step = n;
            $wrapper.stop().animate({
                left:-step * 1200
            },300,'linear')
            autoFocus()
        })
    }

    let handleLeft = bounce(function () {
        $changeLeft.click(function () {
            console.log(step)
            step--;
            if (step < 0) {
                $wrapper.css('left',-4800);
                step = 3;
            }
            $wrapper.stop().animate({
                left:-step * 1200
            },300,'linear');
            autoFocus();
        })
    },500,true)

    let handleRight = bounce(function () {
        $changeRight.click(function () {
            autoPlay();
        })
    },500,true)

    let moveEnter = function () {
        $container.on('mouseenter',function () {
            clearInterval(autoTimer)
        })
    }

    let moveLeave = function () {
        $container.on('mouseleave',function () {
            autoTimer = setInterval(autoPlay, 1000);
        })
    }

    return{
        init(){
            autoTimer = setInterval(autoPlay, 1000);
            handleFocus();
            handleLeft();
            handleRight();
            moveEnter();
            moveLeave()
        }
    }
})()
bannerModule.init()