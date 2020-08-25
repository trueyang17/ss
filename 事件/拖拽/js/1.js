let a1 = document.getElementById('a1');
let box = a1.querySelector('h2')
box.onmousedown = function (ev) {
    this.X = ev.clientX;
    this.Y = ev.clientY;
    this.boxL = a1.offsetLeft;
    this.boxT = a1.offsetTop;
    document.onmousemove = move.bind(this);
    document.onmouseup = up;
}

function move(ev) {
    let winW = window.innerWidth;
    let winH = window.innerHeight;
    let a1W = a1.offsetWidth;
    let a1H = a1.offsetHeight;
    let clientX = ev.clientX;
    let clientY = ev.clientY;
    let l = this.boxL + clientX - this.X;
    let t = this.boxT + clientY - this.Y;
    if (l <= 0) {
        l = 0
    }
    if (l >= winW - a1W) {
        l = winW - a1W
    }
    if (t <= 0) {
        t = 0
    }
    if (t >= winH - a1H) {
        t = winH - a1H
    }
    a1.style.left = l + 'px';
    a1.style.top = t + 'px';           
}

function up() {
    this.onmousemove = null;
    this.onmouseup = null;
}
