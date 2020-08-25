function queryData() {
    let xhr = new XMLHttpRequest;
    xhr.open('get','./json/data.json',false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = JSON.parse(xhr.response)
        }       
    }
    xhr.send()
}
queryData()
function render() {
    let oUls =Array.from(document.querySelectorAll('ul')); 
    for (let i = 0; i < data.length; i++) {
        let li = document.createElement('li');
        let Img = document.createElement('img');
        Img.setAttribute('trueImg',data[i].pic);
        let h = Math.ceil(Math.random()*200 + 100);
        Img.style.height = h + 'px';
        li.appendChild(Img);
        let p = document.createElement('p');
        let txt = document.createTextNode(data[i].title);
        p.appendChild(txt);
        li.appendChild(p);
        oUls.sort((a,b)=>{
            return a.scrollHeight - b.scrollHeight;
        })
        oUls[0].appendChild(li)
    }
}
render();
function delayImg() {
    let imgs = document.querySelectorAll('img');
    let tt = 0;
    for (let i = tt; i < imgs.length; i++) {
        imgs[i].index = i;
        delay(imgs[i])
    }
}
function delay(imgs) {
    let winH = window.innerHeight;
    let winT = window.pageYOffset;
    let boxT = imgs.offsetTop;
    if(imgs.isload) return;
    let trueImg = imgs.getAttribute('trueImg');
    let Img = new Image;
    Img.src = trueImg;
    Img.onload = function () {
        imgs.src = trueImg; 
        imgs.isload = true;
        tt = imgs[i].index + 1;
    }
}
delayImg()
onscroll = function () {
    delayImg()
    let container = document.querySelector('.container');
    let winH = window.innerHeight;
    let winT = window.pageYOffset;
    let boxT = container.scrollHeight - 1/2 * winH;
    if (winH + winT > boxT) {
        render() 
    }
}