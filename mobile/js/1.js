/*
1. JQ不支持css3动画，如transform，但是ZP支持
2. ZQ提供一些移动端支持常用事件：tap/singleTap/doubleTap/longTap/swiswipeLeft/swipeRight/swipeUp/swipeDown/pinchIn/pinchOut...
移动端常用事件库：ZE、fastclick(解决300ms延迟问题)、hammer.js(国际通用事件库)；

移动端键盘事件库和pc端区别：移动端是虚拟键盘，所以对于keydown、keyup、keypress兼容性差，需要用input事件实现需求
*/

$(document.body).on("tap", function (event) {
    console.log(212121)

});

document.documentElement.addEventListener('touchstart',function (ev) {
    let point = ev.touches[0];
    this.startX = point.clientX;
    this.startY = point.clientY;
    this.isMove = false;
    console.log(this.startX)
})

document.documentElement.addEventListener('touchmove',function (ev) {
    let point = ev.touches[0];
    changeX = point.clientX - this.startX;
    changeY = point.clientY - this.startY;
    if ( Math.abs(changeX >= 30) || Math.abs(changeY >= 30) ) {
        this.isMove = true;
    }
    console.log(changeX)
})

document.documentElement.addEventListener('touchend',function (ev) {
    if (this.isMove) {
        console.log('这是移动操作')
        return
    }
    console.log('这是点击操作')
})