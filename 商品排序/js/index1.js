
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
        str += `<li data-price=${price} data-hot=${hot} data-time=${time}>
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
    let linkList = header.getElementsByTagName('a');
    let list = document.getElementById('list')
    let oLis = list.getElementsByTagName('li');
    let oLisAry = Array.from(oLis);
    [].forEach.call(linkList,(item,index)=>{
        item.flag = -1;
        item.index = index;
        item.onclick = function () {
            this.flag *= -1;
            [].forEach.call(linkList,item=>{
                let oIs = item.getElementsByTagName('i');
                [].forEach.call(oIs,item=>{
                    item.classList.remove('active');
                })
            })
            let oIs = this.getElementsByTagName('i');
            if (this.flag === 1) {
                oIs[0].classList.add('active');
                oIs[1].classList.remove('active');
            } else {
                oIs[0].classList.remove('active');
                oIs[1].classList.add('active');
            }
            oLisAry.sort((a,b)=>{
                let aAttr,bAttr; 
                if(this.index === 0){
                    console.log(11)
                    aAttr = a.dataset.time.replace(/-/g,'');
                    bAttr = b.dataset.time.replace(/-/g,'');
                }else if(this.index === 1){
                    console.log(22)
                    aAttr = a.dataset.hot;
                    bAttr = b.dataset.hot;
                }else{
                    console.log(33)
                    aAttr = a.dataset.price;
                    bAttr = b.dataset.price;
                }
                return (aAttr - bAttr) * this.flag;
            })
            for (let i = 0; i < oLisAry.length; i++) {
                list.appendChild(oLisAry[i])
            }
        }
    })
    
}


queryData();
render();
handle()