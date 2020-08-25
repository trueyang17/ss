function queryData() {
    let xhr = new XMLHttpRequest;
    xhr.open('get','json/product.json',false);
    xhr.onreadystatechange = ()=>{
        if (xhr.readyState === 4 && /^(2|3)\d{2}$/.test(xhr.status)) {
            data = JSON.parse(xhr.response);
        }
    }
    xhr.send()
}
function render() {
    let str = ``;
    data.forEach(item => {
        let {title,
        price,
        time,
        hot,
        img} = item
        str += `<li>
            <img src=${img} alt="">
            <span>${title}</span>
            <span>发布时间：${time}</span>
            <span>热度：${hot}</span>
            <span>价格：${price}</span>
        </li>`    
    });
    list.innerHTML = str;
}
function handle() {
    let header = document.getElementById('header');
    let Alist = header.getElementsByTagName('a');
    let prev = Alist[0];
    [].forEach.call(Alist,item=>{
        item.flag = -1;
        item.onclick = function () {   
            [].forEach.call(Alist,item=>{
                if (item !== this) {
                    item.flag = -1;
                }
            });
            this.flag *= -1;   
            if (prev !== this) {
                prev.children[0].classList.remove('active');
                prev.children[1].classList.remove('active');
            }
            if (this.flag === 1) {
                this.children[0].classList.add('active');
                this.children[1].classList.remove('active');
            } else{
                this.children[0].classList.remove('active');
                this.children[1].classList.add('active');
            }         
            kk = this.dataset.kk;
            data.sort((a,b)=>{
                a = String(a[kk]).replace(/-/g,'');
                b = String(b[kk]).replace(/-/g,'');
                return (a - b) * this.flag;
            })
            prev = this;
            render()
        }
    })
}
queryData();
render();
handle()
