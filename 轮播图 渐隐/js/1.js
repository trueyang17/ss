let container = document.getElementById('container');
let wrapper = container.getElementsByClassName('wrapper');
let slides = container.getElementsByClassName('slide');
let pagination = container.getElementsByTagName('ul');
let oLis = pagination[0].getElementsByTagName('li');
let changeLeft = container.getElementsByClassName('changeLeft')[0];
let changeRight = container.getElementsByClassName('changeRight')[0];
let _index = 0;
let _lastIndex = 0;
let timer = null;
let autoPlay = function () {
    _index++;
    if (_index >= 4) {
        _index = 0
    }
    slides[_index].style.zIndex = 1;
    slides[_lastIndex].style.zIndex = 0;
    slides[_index].style.opacity = 1;
    slides[_lastIndex].style.opacity = 0; 
    slides[_index].style.transition = 'all 2s';
    autoFocus();
    _lastIndex = _index;
    
}
let autoFocus = function () { 
   oLis[_index].className = 'active';
   oLis[_lastIndex].className = oLis[_lastIndex].className.replace('active','');
}
let handleFocus = function () {
    for (let i = 0; i < oLis.length; i++) {
        let item = oLis[i];
        item.n = i;
        item.onclick = function () {
            if(_index === this.n){
                return
            }
            _index = this.n;
            slides[_index].style.zIndex = 1;
            slides[_lastIndex].style.zIndex = 0;
            slides[_index].style.opacity = 1;
            slides[_lastIndex].style.opacity = 0; 
            slides[_index].style.transition = 'all 2s';
            autoFocus();
            _lastIndex = _index;
        }
    }
}
let handleLeft = function () {
    changeLeft.onclick = function () {
        _index--;
        if (_index < 0) {
            _index = 3;
        }
        slides[_index].style.zIndex = 1;
        slides[_lastIndex].style.zIndex = 0;
        slides[_index].style.opacity = 1;
        slides[_lastIndex].style.opacity = 0; 
        slides[_index].style.transition = 'all 2s';
        autoFocus();
        _lastIndex = _index;
    } 
}
let handleRight = function () {
    changeRight.onclick = function () {
        autoPlay()    
    }   
}
let moveEnter = function () {
    container.onmouseover = function () {
        clearInterval(timer)
    }
}
let moveLeave = function () {
    container.onmouseout = function () {
        timer = setInterval(autoPlay, 3000);
    }
}
timer = setInterval(autoPlay, 3000);
handleFocus()
handleLeft()
handleRight()
moveEnter()
moveLeave()