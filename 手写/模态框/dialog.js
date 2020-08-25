/*
写好的方法放置到alert上
*/

window.alert = (function () { 

    class Dialog {
        constructor(content,options){
            this.content = content;
            this.options = options;
            //初始化
            this.init()
        }
        //创建元素
        create(type,cssText){
            let element = document.createElement(type);
            element.style.cssText = cssText;
            return element;
        }
        createElement(){
            this.$DIALOG = this.create('div',`
                margin:0;
                padding:0;
                position:fixed;
                top:0;
                left:0;
                z-index:9998;
                width:100%;
                height:100%;
                background:rgba(0,0,0, .8);
                user-select:none;
                opacity:0;
                transition: opacity .3s
            `);
            this.$MAIN = this.create('div',`
                position:absolute;
                top:100px;
                left:50%;
                margin-left:-200px;
                z-index:9999;
                width:400px;
                background:#fff;
                border-radius:3px;
                overflow:hidden;
                transform:translateY(-1000px);
                transition: transform .3s
            `);
            this.$HEADER = this.create('div',`
                position: relative;
                box-sizing: border-box;
                padding: 0 10px;
                height: 40px;
                line-height: 40px;
                background: #2299EE;
                cursor: move;
            `);
            this.$TITLE = this.create('h3',`
                font-size: 18px;
                font-weight: normal;
                color: #fff;
            `);
            this.$CLOSE = this.create('i',`
                position: absolute;
                right: 10px;
                top:50%;
                transform: translateY(-50%);
                font-size: 24px;
                font-style: normal;
                color: #fff;
                font-family: 'Courier New', Courier, monospace;
                cursor: pointer;
            `);
            this.$BODY = this.create('div',`
                padding: 30px 10px;
                line-height: 30px;
                font-size: 16px;
            `);
            this.$FOOTER = this.create('div',`
                text-align: right;
                padding: 10px 10px;
                border-top: 1px solid #EEE;
            `);
            this.$CONFIRM = this.create('button',`
                margin: 0 5px;
                padding: 0 15px;
                height: 28px;
                line-height: 28px;
                border: none;
                font-size: 14px;
                cursor: pointer;
                color: #fff;
                background: #2299EE;
            `);
            this.$CANCEL = this.create('button',`
                margin: 0 5px;
                padding: 0 15px;
                height: 28px;
                line-height: 28px;
                border: none;
                font-size: 14px;
                cursor: pointer;
                color: #000;
                background: #DDD;
            `);
            //把创建元素按层级合成
            let {
                title,
                confirm        
            } = this.options;
            this.$TITLE.innerHTML = title;
            this.$CLOSE.innerHTML = 'x';
            this.$HEADER.appendChild(this.$TITLE);
            this.$HEADER.appendChild(this.$CLOSE);
            this.$BODY.innerHTML = this.content;
            this.$MAIN.appendChild(this.$HEADER);
            this.$MAIN.appendChild(this.$BODY);

            if (confirm) {
                //显示底部确定和取消按钮
                this.$CONFIRM.innerHTML = '确认';
                this.$CANCEL.innerHTML = '取消';
                this.$FOOTER.appendChild(this.$CONFIRM);
                this.$FOOTER.appendChild(this.$CANCEL);
                this.$MAIN.appendChild(this.$FOOTER)
            }
            this.$DIALOG.appendChild(this.$MAIN);
            document.body.appendChild(this.$DIALOG)
        };
        //显示模态框
        show(){
            this.$DIALOG.style.opacity = 1;
            this.$MAIN.style.transform = 'translateY(0)';           
            if (!this.options.confirm) {
                this.$timer = setTimeout(() => {
                    this.hide();
                    clearTimeout(this.$timer)
                }, 3000);
            }
        };
        //隐藏模态框
        hide(type = 'CONFIRM'){
            this.$DIALOG.style.opacity = 0;
            this.$MAIN.style.transform = 'translateY(-1000px)';
            if (typeof this.options.handled === 'function') {
                this.options.handled.call(this,type);
                //把hide函数中的参数传入到handle函数中
            } 
            let fn = () =>{
                document.body.removeChild(this.$DIALOG);//清除dialog结构           
                this.$DIALOG.removeEventListener('transitioned',fn) //去除transitioned事件绑定
            }
            this.$DIALOG.addEventListener('transitioned',fn)
        };

        down(ev){
            this.startL = this.$MAIN.offsetLeft;
            this.startT = this.$MAIN.offsetTop;
            this.startX = ev.clientX;
            this.startY = ev.clientY;
            this._move = this.move.bind(this);
            this._up = this.up.bind(this);
            document.addEventListener('mousemove',this._move);
            document.addEventListener('mouseup',this._up);
        }
        move(ev){
            let winW = this.$DIALOG.offsetWidth;
            let winH = this.$DIALOG.offsetHeight;
            let boxW = this.$MAIN.offsetWidth;
            let boxH = this.$MAIN.offsetHeight;
            this.$MAIN.style.left = ev.clientX - this.startX + this.startL + 'px';
            this.$MAIN.style.top = ev.clientY - this.startY + this.startT + 'px';
            this.$MAIN.style.marginLeft = 0;
            if (this.$MAIN.offsetLeft <= 0) {
                this.$MAIN.style.left = 0;
            }
            if (this.$MAIN.offsetLeft >= winW - boxW) {
                this.$MAIN.style.left = winW - boxW + 'px';
            };
            if (this.$MAIN.offsetTop <= 0) {
                this.$MAIN.style.top = 0;
            }
            if (this.$MAIN.offsetTop >= winH - boxH) {
                this.$MAIN.style.top = winH - boxH + 'px';
            }
        }
        up(){
            document.removeEventListener('mousemove',this._move);
            document.removeEventListener('mouseup',this._up)
        }
        //执行init可以创建元素，让其显示，并实现对应逻辑操作
        init(){
            
            this.createElement();
            this.$DIALOG.offsetWidth;//阻断渲染，显示渲染动画效果
            this.show();//不点击执行show函数
            //给整个dialog遮罩绑定点击事件，当事件源是button和i的时候消失
            this.$DIALOG.addEventListener('click',ev => {
                let target = ev.target ;
                if (/^(BUTTON|I)$/i.test(target.tagName)) {
                    clearTimeout(this.$timer);
                    this.hide(target.innerHTML === '确定' ? 'CONFIRM' : 'CANCEL' );//点击执行hide函数
                }
            });
            //拖到header区域实现整体拖拽效果
            this.$HEADER.addEventListener('mousedown',this.down.bind(this))
            
            
        }

    }

    return function proxy(content,options = {}) { 
        if (typeof content === 'undefined') {
            throw new Error('错误，必须传递内容');
        }
        if (options === null || typeof options !== 'object') {
            throw new Error('错误，参数必须是一个对象')
        }
        options = Object.assign({
            title:'系统温馨提示',
            confirm:false,
            handled:null
        },options)
        return new Dialog(content,options);
    }

})()

