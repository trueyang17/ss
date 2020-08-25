let box = document.querySelector('.box');
let data = [{
    id:1,
    count:0,
    price:11.22
},{
    id:2,
    count:0,
    price:8.72
},{
    id:3,
    count:0,
    price:21.43
},{
    id:4,
    count:0,
    price:14.56
},{
    id:5,
    count:0,
    price:17.97
}]
function render() {
    let counts = 0;
    let total = 0;
    let priceArr = [0];
    let str = `<ul class="list">`;
    data.forEach(item => {
        let {
            id,
            count,
            price
        } = item;
        counts += count;
        total += count * price;
        count > 0 ? priceArr.push(price) : null; 
        str += `<li>
            <i data-btn='minus' data-id=${id}></i>
            <em>${count}</em>
            <i data-btn='plus' data-id=${id}></i>
            <span>
                单价：<strong>${price} </strong> 
                小计：<strong>${(count * price).toFixed(2)}元</strong>
            </span>
        </li>`
    });
    str += `</ul>
    <div class="info">
        <span>商品公合计：<em>${counts}</em>件</span>
        <span>共花费了：<em>${total.toFixed(2)}</em>元</span>
        <br />
        <br />
        <span>其中最贵的商品单价是：<em>${Math.max(...priceArr)}</em>元</span>
    </div>`
    box.innerHTML = str;
   handle()
}

function handle() {
    let btns = document.querySelectorAll('i');
    for (let i = 0; i < btns.length; i++) {
        btns[i].onclick = function () { 
            data.map(cur => {
                if (parseFloat(this.dataset.id) === cur.id ) {
                    if (this.dataset.btn === 'minus') {
                        cur.count--;
                        cur.count < 0 ? cur.count = 0 : null;
                    } else {
                        cur.count++
                    }
                }
                return cur
            })
            render()
        }
    }
}
render()
