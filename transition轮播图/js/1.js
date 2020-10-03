let container = document.getElementsByClassName('container')[0];
let wrapper = container.getElementsByClassName('wrapper')[0];
let slides = wrapper.getElementsByClassName('slide');
let pagination = container.getElementsByClassName('pagination')[0];
let oLis = pagination.getElementsByTagName('li');
let changeLeft = container.getElementsByClassName('changeLeft')[0];
let changeRight = container.getElementsByClassName('changeRight')[0];
let timer = null;
let index = 0;
let change = function () {
    wrapper.style.transition = '0.5s'
    wrapper.style.transform = `translateX(${-index*1200}px)`;
    autoFocus()
}
let autoMove = function () {
    index++;  
    if (index >= 5) {
        wrapper.style.transition = 'none';
        wrapper.style.transform = `translateX(0)`;
        let l = container.offsetLeft;
        index = 1;
        wrapper.style.transition = '0.5s'
    }
    change()
}
let autoFocus = function () {
    let temp = index;
    for (let i = 0; i < oLis.length; i++) {
        oLis[i].classList.remove('active');
    }
    if (temp >= 4) {
        temp = 0;
    }
    oLis[temp].classList.add('active')
}
let handleFocus = function () {
    for (let i = 0; i < oLis.length; i++) {
        oLis[i].n = i;
        oLis[i].onclick = function () {
            index = this.n
            change()
        }
    }
} 
let handleButton = function () {
    changeLeft.onclick = function () {
        index--;
        if (index < 0) {
            wrapper.style.transition = 'none';
            wrapper.style.transform = `translateX(-4800px)`;
            let l = container.offsetLeft;
            index = 3;
            wrapper.style.transition = '0.5s'
        }
        change()
    }
    changeRight.onclick = function () {
        autoMove()
    }
}
timer = setInterval(autoMove, 3000);
handleFocus();
container.onmouseover = function () {
    clearInterval(timer)
}
container.onmouseout = function () {
    timer = setInterval(autoMove, 3000);
}
handleButton()