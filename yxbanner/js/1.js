/**轮播图中自定义属性既是jQuery中的元素index值，
 * siblings()元素的筛选则代替了原生的循环遍历 
 * 
 * */
let container = document.getElementsByClassName('container')[0];
let wrapper = container.getElementsByClassName('wrapper')[0];
let sliders = wrapper.getElementsByClassName('slide');
let pagination = container.getElementsByClassName('pagination')[0];
let oLis = pagination.getElementsByTagName('li');
let changeLeft = container.getElementsByClassName('changeLeft')[0];
let changeRight = container.getElementsByClassName('changeRight')[0];
let timer = null;
let _index = 0;
let change = function () {
    sliders[_index].style.transition = 'opacity 1s';
    sliders[_index].style.zIndex = 1;
    for (let i = 0; i < sliders.length; i++) {
        if (i !== _index) {
            sliders[i].style.zIndex = 0;    
        }  
    }
    sliders[_index].style.opacity = 1;
    sliders[_index].ontransitionend = ()=>{
        for (let i = 0; i < sliders.length; i++) {
            if (i !== _index) {
                sliders[i].style.opacity = 0;    
            }  
        }    
    };
    autoFocus()
}
let autoMove = function () {
    _index++;
    if (_index >= 4) {
        _index = 0;
    }
    change()
}
let autoFocus = function () {
    oLis[_index].classList.add('active');
    for (let i = 0; i < oLis.length; i++) {
        if (i !== _index) {
            oLis[i].classList.remove('active');
        }
    }
}
let handleFocus = function () {
    for (let i = 0; i < oLis.length; i++) {
        oLis[i].n = i;
        oLis[i].onmouseover = function () {
            _index = this.n;
            change()
        }   
    }
}
let handleButton = function () {
    changeLeft.onclick = function () {
        console.log(22)
        _index--;
        if (_index < 0) {
            _index = 3
        }
        change()
    }
    changeRight.onclick = function () {
        autoMove()
    }
}
timer = setInterval(autoMove, 2000);
handleFocus()
handleButton()
container.onmouseover = function () {
    clearInterval(timer)
}
container.onmouseout = function () {
    timer = setInterval(autoMove, 2000);
}
