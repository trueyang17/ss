let xhr = new XMLHttpRequest;
xhr.open('get','json/product.json',false);
xhr.onreadystatechange = function () {   
     res = JSON.parse(xhr.response)
}
xhr.send();    

function render() {
    let list = document.getElementById('list');
    let str = ``;
    res.forEach(item => {
        let {title,img,time,hot,price} = item;
        str += `<li>
            <img src=${img} alt="">
            <span>${title}</span>
            <span>${time}</span>
            <span>热度：${hot}</span>
            <span>价格：${price}</span>
        </li>`
    });
    list.innerHTML = str;      
}
function handle() {
    let header = document.querySelector('.header');
    let Alist = header.querySelectorAll('a');
    let prev = Alist[0];
    [].forEach.call(Alist,item=>{
        item.flag = -1;
        item.onclick = function () {
            [].forEach.call(Alist,item=>{
                if (item !== this) {
                    item.flag = -1;
                }
            })
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
            let kk = this.dataset.kk;
            res.sort((a,b)=>{
                a = String(a[kk]).replace(/-/g,'');
                b = String(b[kk]).replace(/-/g,'');
                return (a-b)*this.flag
            })
            prev = this;
            render()
        }
    })
}
function search() {
    let txt = document.querySelector('#txt');
    let sele = document.querySelector('#sele');
    let search =  document.querySelector('#search');
    let search2 =  document.querySelector('#search2');
    search.onclick = function () {
        let v = txt.value.trim();
        let re = new RegExp('^(华|为|hw|hua|huawei)$','i')
        let d = res.filter(e=>{
            if (sele.value === 'price') {
                if (v.includes('-')) {//返回''-''格式的价格
                    let arr = v.split('-');
                    return e[sele.value] >= arr[0] && e[sele.value] <= arr[1];
                } else{
                    return new RegExp(v,'i').test( (''+ e[sele.value]))
                }
            }
            if (re.test(v)) {//对输入的内容再进行筛选
                return  e[sele.value].includes('HUAWEI');    
            }
            return new RegExp(v,'i').test( (''+ e[sele.value]))//模糊匹配只要含有搜索的字符就返回
        })
        console.log(d)
        let str = ``;
        d.forEach(item => {
            let {title,img,time,hot,price} = item;
            str += `<li>
                <img src=${img} alt="">
                <span>${title}</span>
                <span>${time}</span>
                <span>热度：${hot}</span>
                <span>价格：${price}</span>
            </li>`
        });
        list.innerHTML = str;   
    }
    search2.onclick = function () {
        render()
    }
}

render();
handle();
search()