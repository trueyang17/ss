class Drag{
    constructor(curEle,box){
        this.curEle = curEle;
        this.box = box;
        curEle.onmousedown = this.down.bind(this);
    };
    down(ev){
        console.log(this)
        this.clientX = ev.clientX;
        this.clientY = ev.clientY;
        this.boxL = this.box.offsetLeft;
        this.boxT = this.box.offsetTop;
        document.onmousemove = this.move.bind(this);
        document.onmouseup = this.up
    }
    move(ev){
        let clientX = ev.clientX;
        let clientY = ev.clientY;
        console.log(this.clientX,clientX)
        let l = clientX + this.boxL - this.clientX;
        let t = clientY + this.boxT - this.clientY; 
        this.box.style.left = l + 'px';
        this.box.style.top = t + 'px';
    };
    up(){
        this.onmousemove = null;
        this.onmouseup = null;
    }
}
let a1 = document.getElementById('a1');
let box = a1.querySelector('h2');
console.log(new Drag(box,a1))