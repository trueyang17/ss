let $container = $('.container');
let $wrapper = $container.children('.wrapper');
let time = 0;
let step = 0;

function autoPlay() {
    step++;
    console.log(step)
    if (step>=5) {
        $wrapper.css('left',0),
        step = 0
    }
    $wrapper.stop().animate({
        left:-step*1200
    },500,'linear')
  
}
//setInterval(autoPlay,2000);