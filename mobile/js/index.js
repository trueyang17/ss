/*在移动端处理滑屏事件时，我们要把文档的滑动默认行为禁止*/
$(document.body).on('touchstart touchmove touchend',function (ev) {
    ev.preventDefault();
})
let cubeModule = (function () {
    let $cubeBox = $('.cubeBox'),
        $cube = $cubeBox.find('.cube');
    function down(ev) {
        console.log(ev)
        let point = ev.changedTouches[0];
        this.startX = point.clientX;
        this.startY = point.clientY;
        if (!this.rotateX && !this.rotateY) {
            this.rotateX = -40;
            this.rotateY = 45;
        }
        this.isMove = false;
    }

    function move(ev) {
        let point = ev.changedTouches[0];
        this.changeX = point.clientX - this.startX;
        this.changeY = point.clientY - this.startY;
        if ( Math.abs(this.changeX) >10 || Math.abs(this.changeY) >10) {
            this.isMove = true;
        }
    }

    function up(ev) {
        let point = ev.changedTouches[0];
        let $this = $(this);
        this.rotateX = this.rotateX - this.changeY/2;
        this.rotateY = this.rotateY + this.changeX/2;
        if(!this.isMove) return;
        // this.style.transform = `rotateX(${this.rotateY}deg) rotateY(${this.rotateX}deg)`;
        $this.css('transform',`rotateX(${this.rotateY}deg) rotateY(${this.rotateX}deg)`)
    }
    return {
        init(isInit){
            $cubeBox.css('display','block');
            if(isInit) return
            $cube.on('touchstart',down)
                .on('touchmove',move)
                .on('touchend',up);
            $cube.children('li').tap(function () {
                $cubeBox.css('display','none');
                swiperModule.init($(this).index() + 1);
            })
        }
    }
})() 
cubeModule.init()
/**
 * 向左滑动图片1、2、3、4、5、6、1
 *             1  2  3  4  5  6  7
 * 向右滑动图片6、1、2、3、4、5、6
 *             0、1  2  3  4  5  6  
 * swiper的图片实际排列是6、1、2、3、4、5、6、1
 *                       0、1、2、3、4、5、6、7
 */
let swiperModule = (function () {
    let $swiperBox = $('.swiperBox');
    let $returnBox = $('.returnBox');
    let mySwiper = null;
    let $baseInfo = null; 
    function pageMove() {
        $baseInfo = $('.baseInfo');//注意第一张和最后一张问题事件触发时获取
        let activeIndex = this.activeIndex;
        let slides = this.slides;
        if (activeIndex === 1 || activeIndex === 7) {
            $baseInfo.makisu({
                selector: 'dd',
                overlap: 0.6,
                speed: 0.8
            });
            $baseInfo.makisu( 'open' )
        } else {
            $baseInfo.makisu({
                selector: 'dd',
                overlap: 0,
                speed: 0
            });
            $baseInfo.makisu('close');    
        }
        //给当前页面设置ID，让其内容有动画效果
        [].forEach.call(slides,(item,index)=>{
            if (activeIndex === index) {
                activeIndex === 0 ? activeIndex = 6 : null; 
                activeIndex === 7 ? activeIndex = 1 : null; 
                item.id = 'page' + activeIndex;
                return;
            }
            item.id = null
        })
    }
    return {   
        init(init = 1){
            $swiperBox.css('display','block');
            if (mySwiper) {
                mySwiper.slideTo(init,0);
                return
            }
            mySwiper = new Swiper('.swiper-container',{
                direction:'horizontal',//滑动切换的方向垂直和水平horizontal | vertical
                loop : true,//循环
                effect:'coverflow',//切换方式
                on:{//swiper中的事件
                    init:pageMove,//初始加载触发
                    transitionEnd:pageMove,//过渡结束触发事件
                }
            })
            mySwiper.slideTo(init,0);
            $returnBox.tap(function () {
                $swiperBox.css('display','none');
                cubeModule.init(true)
            })
        }
    }
})()
function handMusic() {
    $musicAudio = $('.musicAudio');
    musicAudio = $musicAudio[0];
    $musicIcon = $('.musicIcon');
    $musicIcon.css('display','block');   
    $musicIcon.tap(function () {
        if (musicAudio.paused) {
            player();
            $musicIcon.addClass('move');
            return;
        }
        $musicIcon.removeClass('move');
        musicAudio.pause()   
    })
    function player() {
        musicAudio.play()
    }
}
setTimeout(handMusic, 1000);
