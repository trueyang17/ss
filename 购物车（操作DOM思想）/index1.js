let list = document.querySelector('.list');
let btns = list.querySelectorAll('i');//控制增加或者减少商品数量
let countInps = list.querySelectorAll('em');//单个商品总数动态变化显示
let strong = list.querySelectorAll('strong');//包括单价和小计
let priceArr = [];//商品单价
let subtotalArr = [];//最终单个商品总价
for (let i = 0; i < strong.length; i++) {
    let cur = strong[i]
    if (i%2 === 0) {//偶数放的是商品单价
        priceArr.push(cur)
    }
    if (i%2 !== 0) {//奇数放的是每样商品价格小计
        subtotalArr.push(cur)
    }
}    
let ems = document.querySelectorAll('.info em')
let totalQuantity = ems[0];//总量
let totalPrice = ems[1];//总价
let maxPrice = ems[2];//最高单价
for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function () { 
        let parent = this.parentNode;
        let num = parent.querySelector('em');
        let strongs = parent.querySelectorAll('strong');
        if (this.dataset.btn === 'minus') {
            num.innerHTML--;
            if (num.innerHTML <= 0) {
                num.innerHTML = 0
            }  
        }
        if (this.dataset.btn === 'plus') {
            num.innerHTML++;
        }
        strongs[1].innerHTML = num.innerHTML * parseFloat(strongs[0].innerHTML) + '元'
        let piece = 0;
        let arr = [];
        for (let i = 0; i < countInps.length; i++) {
            let cur = parseFloat(countInps[i].innerHTML);
            piece += cur;
            if (cur > 0) {
                arr.push(parseFloat(priceArr[i].innerHTML));
            }
            console.log(priceArr[i].innerHTML)
        }
        console.log(arr)
        totalQuantity.innerHTML = piece;
        maxPrice.innerHTML = Math.max.apply(null,arr);
        
    }     
}  
